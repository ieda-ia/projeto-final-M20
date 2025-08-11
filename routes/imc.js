const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CalculoIMCRequest:
 *       type: object
 *       required:
 *         - nomeUsuario
 *         - peso
 *         - altura
 *         - idade
 *       properties:
 *         nomeUsuario:
 *           type: string
 *           description: Nome do usuário (obrigatório)
 *           minLength: 2
 *           maxLength: 50
 *         peso:
 *           type: number
 *           description: Peso em quilogramas
 *           minimum: 20
 *           maximum: 300
 *         altura:
 *           type: number
 *           description: Altura em metros
 *           minimum: 0.5
 *           maximum: 3.0
 *         idade:
 *           type: number
 *           description: Idade em anos
 *           minimum: 10
 *           maximum: 100
 *         gerarTreino:
 *           type: boolean
 *           description: Se true, gera também um treino personalizado baseado no IMC
 *           default: false
 *     
 *     ResultadoIMC:
 *       type: object
 *       properties:
 *         imc:
 *           type: number
 *           description: Valor calculado do IMC
 *         classificacao:
 *           type: string
 *           description: Classificação do IMC
 *         status:
 *           type: string
 *           description: Status de saúde baseado no IMC
 *         recomendacoes:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de recomendações de exercícios
 *         exerciciosRecomendados:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *               exercicios:
 *                 type: array
 *                 items:
 *                   type: string
 *               intensidade:
 *                 type: string
 *               observacoes:
 *                 type: string
 *         treinoPersonalizado:
 *           type: object
 *           description: Treino gerado baseado no IMC (se solicitado)
 *           nullable: true
 */

/**
 * @swagger
 * /api/imc/calcular:
 *   post:
 *     summary: Calcula o IMC e fornece recomendações
 *     description: Calcula o Índice de Massa Corporal e fornece recomendações personalizadas de exercícios. Pode gerar treino personalizado baseado no resultado.
 *     tags: [IMC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalculoIMCRequest'
 *     responses:
 *       200:
 *         description: IMC calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 resultado:
 *                   $ref: '#/components/schemas/ResultadoIMC'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/calcular', (req, res) => {
  try {
    const { nomeUsuario, peso, altura, idade, gerarTreino = false } = req.body;

    // Validação dos parâmetros obrigatórios
    if (!nomeUsuario || !peso || !altura || !idade) {
      return res.status(400).json({
        error: '❌ Parâmetros obrigatórios',
        message: 'Nome do usuário, peso, altura e idade são obrigatórios'
      });
    }

    // Validação do nome do usuário
    if (typeof nomeUsuario !== 'string' || nomeUsuario.trim().length < 2 || nomeUsuario.trim().length > 50) {
      return res.status(400).json({
        error: '❌ Nome do usuário inválido',
        message: 'Nome deve ter entre 2 e 50 caracteres'
      });
    }

    if (peso < 20 || peso > 300) {
      return res.status(400).json({
        error: '❌ Peso inválido',
        message: 'Peso deve estar entre 20 e 300 kg'
      });
    }

    if (altura < 0.5 || altura > 3.0) {
      return res.status(400).json({
        error: '❌ Altura inválida',
        message: 'Altura deve estar entre 0.5 e 3.0 metros'
      });
    }

    if (idade < 10 || idade > 100) {
      return res.status(400).json({
        error: '❌ Idade inválida',
        message: 'Idade deve estar entre 10 e 100 anos'
      });
    }

    // Calcular IMC
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);
    const status = determinarStatus(imc, idade);
    const recomendacoes = gerarRecomendacoes(imc, idade);
    const exerciciosRecomendados = gerarExerciciosRecomendados(imc, idade);

    const resultado = {
      imc: Math.round(imc * 100) / 100,
      classificacao,
      status,
      recomendacoes,
      exerciciosRecomendados,
      treinoPersonalizado: null
    };

    // Gerar treino personalizado se solicitado
    if (gerarTreino) {
      const treino = gerarTreinoPorIMC(nomeUsuario.trim(), classificacao, idade);
      resultado.treinoPersonalizado = treino;
    }

    res.json({
      success: true,
      message: `📊 IMC calculado com sucesso para ${nomeUsuario.trim()}!`,
      resultado
    });

  } catch (error) {
    console.error('Erro ao calcular IMC:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível calcular o IMC'
    });
  }
});

/**
 * @swagger
 * /api/imc/classificacoes:
 *   get:
 *     summary: Retorna as classificações de IMC
 *     description: Lista todas as classificações possíveis de IMC com suas descrições
 *     tags: [IMC]
 *     responses:
 *       200:
 *         description: Classificações retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 classificacoes:
 *                   type: object
 */
router.get('/classificacoes', (req, res) => {
  try {
    const classificacoes = {
      'Abaixo do peso': {
        range: '< 18.5',
        descricao: 'Peso abaixo do recomendado para a altura',
        risco: 'Baixo',
        cor: '🔵',
        recomendacao: 'Foque em exercícios de força para ganhar massa muscular'
      },
      'Peso normal': {
        range: '18.5 - 24.9',
        descricao: 'Peso saudável para a altura',
        risco: 'Muito baixo',
        cor: '🟢',
        recomendacao: 'Mantenha uma rotina equilibrada de exercícios'
      },
      'Sobrepeso': {
        range: '25.0 - 29.9',
        descricao: 'Peso acima do recomendado para a altura',
        risco: 'Baixo',
        cor: '🟡',
        recomendacao: 'Comece com exercícios de baixo impacto e aumente gradualmente'
      },
      'Obesidade Grau I': {
        range: '30.0 - 34.9',
        descricao: 'Obesidade leve',
        risco: 'Moderado',
        cor: '🟠',
        recomendacao: 'Foque em exercícios de cardio e consulte um profissional'
      },
      'Obesidade Grau II': {
        range: '35.0 - 39.9',
        descricao: 'Obesidade moderada',
        risco: 'Alto',
        cor: '🔴',
        recomendacao: 'Exercícios de baixo impacto e orientação médica obrigatória'
      },
      'Obesidade Grau III': {
        range: '≥ 40.0',
        descricao: 'Obesidade grave',
        risco: 'Muito alto',
        cor: '⚫',
        recomendacao: 'Sempre consulte um médico antes de iniciar exercícios'
      }
    };

    res.json({
      success: true,
      message: '📋 Classificações de IMC',
      classificacoes
    });
  } catch (error) {
    console.error('Erro ao retornar classificações:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível retornar as classificações'
    });
  }
});

// Função para calcular IMC
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Função para classificar IMC
function classificarIMC(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade Grau I';
  if (imc < 40) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
}

// Função para determinar status de saúde
function determinarStatus(imc, idade) {
  if (imc < 18.5) {
    return idade < 18 ? 'Atenção: Consulte um profissional de saúde' : 'Considere ganhar peso de forma saudável';
  } else if (imc < 25) {
    return 'Excelente! Mantenha seus hábitos saudáveis';
  } else if (imc < 30) {
    return 'Atenção: Considere ajustar sua alimentação e aumentar a atividade física';
  } else {
    return 'Importante: Consulte um profissional de saúde para orientação personalizada';
  }
}

// Função para gerar recomendações gerais
function gerarRecomendacoes(imc, idade) {
  const recomendacoes = [];

  if (imc < 18.5) {
    recomendacoes.push(
      '💪 Foque em exercícios de força para ganhar massa muscular',
      '🥗 Aumente o consumo de proteínas e carboidratos complexos',
      '🏋️‍♂️ Considere treinos com pesos moderados',
      '📊 Monitore seu progresso semanalmente'
    );
  } else if (imc < 25) {
    recomendacoes.push(
      '🎯 Mantenha uma rotina equilibrada de exercícios',
      '🏃‍♂️ Combine cardio, força e flexibilidade',
      '🥗 Mantenha uma alimentação balanceada',
      '💧 Mantenha-se hidratado durante os treinos'
    );
  } else if (imc < 30) {
    recomendacoes.push(
      '🚶‍♂️ Comece com exercícios de baixo impacto',
      '⏰ Aumente gradualmente a duração dos treinos',
      '🥗 Foque em uma alimentação mais equilibrada',
      '📱 Use apps para monitorar sua atividade física'
    );
  } else {
    recomendacoes.push(
      '👨‍⚕️ Consulte um médico antes de iniciar exercícios',
      '🚶‍♂️ Comece com caminhadas leves',
      '🏊‍♂️ Considere exercícios na água (natação, hidroginástica)',
      '🥗 Busque orientação nutricional profissional'
    );
  }

  if (idade > 50) {
    recomendacoes.push(
      '🧘‍♂️ Inclua exercícios de equilíbrio e flexibilidade',
      '💪 Mantenha a massa muscular com exercícios de força',
      '🏥 Faça check-ups regulares com seu médico'
    );
  }

  return recomendacoes;
}

// Função para gerar exercícios recomendados
function gerarExerciciosRecomendados(imc, idade) {
  const exercicios = [];

  if (imc < 18.5) {
    exercicios.push({
      categoria: 'Força',
      exercicios: ['Agachamento', 'Flexão de braço', 'Prancha', 'Levantamento terra'],
      intensidade: 'Moderada a alta',
      observacoes: 'Foque em exercícios compostos para ganhar massa muscular'
    });
    exercicios.push({
      categoria: 'Cardio',
      exercicios: ['Caminhada', 'Ciclismo leve', 'Natação'],
      intensidade: 'Baixa a moderada',
      observacoes: 'Mantenha cardio leve para não queimar muitas calorias'
    });
  } else if (imc < 25) {
    exercicios.push({
      categoria: 'Força',
      exercicios: ['Agachamento', 'Flexão de braço', 'Prancha', 'Burpee'],
      intensidade: 'Moderada',
      observacoes: 'Mantenha um equilíbrio entre força e resistência'
    });
    exercicios.push({
      categoria: 'Cardio',
      exercicios: ['Corrida', 'Ciclismo', 'Polichinelo', 'Mountain climber'],
      intensidade: 'Moderada',
      observacoes: 'Varie entre diferentes tipos de cardio'
    });
  } else if (imc < 30) {
    exercicios.push({
      categoria: 'Força',
      exercicios: ['Agachamento com apoio', 'Flexão de joelhos', 'Prancha modificada'],
      intensidade: 'Baixa a moderada',
      observacoes: 'Comece com exercícios básicos e evolua gradualmente'
    });
    exercicios.push({
      categoria: 'Cardio',
      exercicios: ['Caminhada', 'Marcha no lugar', 'Ciclismo leve'],
      intensidade: 'Baixa',
      observacoes: 'Foque em exercícios de baixo impacto'
    });
  } else {
    exercicios.push({
      categoria: 'Mobilidade',
      exercicios: ['Alongamentos leves', 'Marcha no lugar', 'Exercícios sentado'],
      intensidade: 'Muito baixa',
      observacoes: 'Sempre consulte um profissional antes de iniciar'
    });
  }

  exercicios.push({
    categoria: 'Flexibilidade',
    exercicios: ['Alongamento de panturrilha', 'Alongamento de quadríceps', 'Alongamento de ombro'],
    intensidade: 'Baixa',
    observacoes: 'Importante para todas as faixas etárias e níveis de condicionamento'
  });

  return exercicios;
}

// Função para gerar treino baseado no IMC (importada do módulo de treinos)
function gerarTreinoPorIMC(nomeUsuario, classificacaoIMC, idade) {
  // Importar configurações necessárias
  const { configuracoesTreinoIMC, duracoesTreinoIMC, exercicios } = require('../data/exercicios');
  
  const config = configuracoesTreinoIMC[classificacaoIMC];
  const duracao = duracoesTreinoIMC[classificacaoIMC];
  
  const treino = {
    id: `treino_imc_${Date.now()}`,
    nomeUsuario,
    objetivo: config.objetivo,
    nivel: config.nivel,
    classificacaoIMC,
    duracaoTotal: duracao.cardio + duracao.forca + duracao.flexibilidade,
    exercicios: [],
    dataCriacao: new Date().toISOString(),
    observacao: `Treino personalizado baseado no IMC: ${classificacaoIMC}`
  };

  // Adicionar exercícios de cardio
  if (duracao.cardio > 0) {
    const numExerciciosCardio = Math.max(1, Math.floor(config.cardio * 3));
    const exerciciosCardio = selecionarExerciciosAleatorios('cardio', config.nivel, numExerciciosCardio);
    treino.exercicios.push({
      categoria: 'Cardio',
      duracao: duracao.cardio,
      exercicios: exerciciosCardio
    });
  }

  // Adicionar exercícios de força
  if (duracao.forca > 0) {
    const numExerciciosForca = Math.max(1, Math.floor(config.forca * 4));
    const exerciciosForca = selecionarExerciciosAleatorios('forca', config.nivel, numExerciciosForca);
    treino.exercicios.push({
      categoria: 'Força',
      duracao: duracao.forca,
      exercicios: exerciciosForca
    });
  }

  // Adicionar exercícios de flexibilidade
  const numExerciciosFlex = Math.max(1, Math.floor(config.flexibilidade * 2));
  const exerciciosFlex = selecionarExerciciosAleatorios('flexibilidade', config.nivel, numExerciciosFlex);
  treino.exercicios.push({
    categoria: 'Flexibilidade',
    duracao: duracao.flexibilidade,
    exercicios: exerciciosFlex
  });

  return treino;
}

// Função para selecionar exercícios aleatórios
function selecionarExerciciosAleatorios(categoria, nivel, quantidade) {
  const { exercicios } = require('../data/exercicios');
  const exerciciosDisponiveis = exercicios[categoria][nivel];
  const exerciciosSelecionados = [];
  
  // Embaralhar array de exercícios
  const exerciciosEmbaralhados = [...exerciciosDisponiveis].sort(() => Math.random() - 0.5);
  
  // Selecionar a quantidade solicitada
  for (let i = 0; i < Math.min(quantidade, exerciciosEmbaralhados.length); i++) {
    exerciciosSelecionados.push(exerciciosEmbaralhados[i]);
  }
  
  return exerciciosSelecionados;
}

module.exports = router; 
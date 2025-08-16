const express = require('express');
const router = express.Router();
const { exercicios, configuracoesTreino, configuracoesTreinoIMC, duracoesTreino, duracoesTreinoIMC } = require('../data/exercicios');

/**
 * @swagger
 * components:
 *   schemas:
 *     Treino:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do treino
 *         nomeUsuario:
 *           type: string
 *           description: Nome do usuário que solicitou o treino
 *         objetivo:
 *           type: string
 *           description: Objetivo do treino (emagrecer, ganharMassa, condicionamento)
 *         nivel:
 *           type: string
 *           description: Nível do usuário (iniciante, intermediario, avancado)
 *         duracaoTotal:
 *           type: number
 *           description: Duração total do treino em minutos
 *         exercicios:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *               exercicios:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Exercicio'
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do treino
 *     
 *     Exercicio:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         imagem:
 *           type: string
 *         instrucoes:
 *           type: string
 *         series:
 *           type: string
 *         repeticoes:
 *           type: string
 *         duracao:
 *           type: string
 *         calorias:
 *           type: string
 *     
 *     GerarTreinoRequest:
 *       type: object
 *       required:
 *         - nomeUsuario
 *         - objetivo
 *         - nivel
 *       properties:
 *         nomeUsuario:
 *           type: string
 *           description: Nome do usuário (obrigatório)
 *           minLength: 2
 *           maxLength: 50
 *         objetivo:
 *           type: string
 *           enum: [emagrecer, ganharMassa, condicionamento]
 *           description: Objetivo do treino
 *         nivel:
 *           type: string
 *           enum: [iniciante, intermediario, avancado]
 *           description: Nível do usuário
 *     
 *     GerarTreinoIMCRequest:
 *       type: object
 *       required:
 *         - peso
 *         - altura
 *         - idade
 *       properties:
 *         nomeUsuario:
 *           type: string
 *           description: Nome do usuário (opcional)
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
 */

/**
 * @swagger
 * /api/treinos/gerar:
 *   post:
 *     summary: Gera um treino personalizado
 *     description: Cria um treino personalizado baseado no nome do usuário, objetivo, nível e duração
 *     tags: [Treinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GerarTreinoRequest'
 *     responses:
 *       200:
 *         description: Treino gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treino'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/gerar', (req, res) => {
  try {
    const { nomeUsuario, objetivo, nivel, duracao } = req.body;

    // Validação dos parâmetros obrigatórios
    if (!nomeUsuario || !objetivo || !nivel) {
      return res.status(400).json({
        error: '❌ Parâmetros obrigatórios',
        message: 'Nome do usuário, objetivo e nível são obrigatórios'
      });
    }

    // Validação do nome do usuário
    if (typeof nomeUsuario !== 'string' || nomeUsuario.trim().length < 2 || nomeUsuario.trim().length > 50) {
      return res.status(400).json({
        error: '❌ Nome do usuário inválido',
        message: 'Nome deve ter entre 2 e 50 caracteres'
      });
    }

    if (!['emagrecer', 'ganharMassa', 'condicionamento'].includes(objetivo)) {
      return res.status(400).json({
        error: '❌ Objetivo inválido',
        message: 'Objetivo deve ser: emagrecer, ganharMassa ou condicionamento'
      });
    }

    if (!['iniciante', 'intermediario', 'avancado'].includes(nivel)) {
      return res.status(400).json({
        error: '❌ Nível inválido',
        message: 'Nível deve ser: iniciante, intermediario ou avancado'
      });
    }

    // Gerar treino personalizado
    const treino = gerarTreinoPersonalizado(nomeUsuario.trim(), objetivo, nivel, duracao);

    res.json({
      success: true,
      message: `🎯 Treino gerado com sucesso para ${nomeUsuario.trim()}!`,
      treino
    });

  } catch (error) {
    console.error('Erro ao gerar treino:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível gerar o treino'
    });
  }
});

/**
 * @swagger
 * /api/treinos/gerar-por-imc:
 *   post:
 *     summary: Gera um treino personalizado baseado no IMC
 *     description: Calcula o IMC e gera um treino personalizado baseado no resultado. O nome do usuário é opcional.
 *     tags: [Treinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GerarTreinoIMCRequest'
 *     responses:
 *       200:
 *         description: Treino baseado no IMC gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 resultadoIMC:
 *                   type: object
 *                 treino:
 *                   $ref: '#/components/schemas/Treino'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/gerar-por-imc', (req, res) => {
  const { nomeUsuario, peso, altura, idade } = req.body;

  // Só valida peso, altura e idade
  if (!peso || !altura || !idade) {
    return res.status(400).json({
      success: false,
      message: 'Peso, altura e idade são obrigatórios.'
    });
  }

  const body = {
    peso,
    altura,
    idade
  };
  if (nomeUsuario && nomeUsuario.trim().length > 0) {
    body.nomeUsuario = nomeUsuario.trim();
  }

  try {
    // Calcular IMC
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);
    const status = determinarStatus(imc, idade);
    const recomendacoes = gerarRecomendacoes(imc, idade);
    const exerciciosRecomendados = gerarExerciciosRecomendados(imc, idade);

    // Gerar treino baseado no IMC
    const treino = gerarTreinoPorIMC(nomeUsuario?.trim(), classificacao, idade);

    const resultadoIMC = {
      imc: Math.round(imc * 100) / 100,
      classificacao,
      status,
      recomendacoes,
      exerciciosRecomendados
    };

    res.json({
      success: true,
      message: nomeUsuario
        ? `🎯 Treino baseado no IMC gerado com sucesso para ${nomeUsuario.trim()}!`
        : `🎯 Treino baseado no IMC gerado com sucesso!`,
      resultadoIMC,
      treino
    });

  } catch (error) {
    console.error('Erro ao gerar treino por IMC:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível gerar o treino baseado no IMC'
    });
  }
});

/**
 * @swagger
 * /api/treinos/exercicios:
 *   get:
 *     summary: Lista todos os exercícios disponíveis
 *     description: Retorna todos os exercícios organizados por categoria e nível
 *     tags: [Treinos]
 *     responses:
 *       200:
 *         description: Lista de exercícios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 exercicios:
 *                   type: object
 */
router.get('/exercicios', (req, res) => {
  try {
    res.json({
      success: true,
      message: '📋 Exercícios disponíveis',
      exercicios
    });
  } catch (error) {
    console.error('Erro ao listar exercícios:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível listar os exercícios'
    });
  }
});

/**
 * @swagger
 * /api/treinos/configuracoes:
 *   get:
 *     summary: Retorna as configurações de treino
 *     description: Mostra as configurações de treino por objetivo e duração por nível
 *     tags: [Treinos]
 *     responses:
 *       200:
 *         description: Configurações retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 configuracoes:
 *                   type: object
 *                 duracoes:
 *                   type: object
 */
router.get('/configuracoes', (req, res) => {
  try {
    res.json({
      success: true,
      message: '⚙️ Configurações de treino',
      configuracoes: configuracoesTreino,
      configuracoesIMC: configuracoesTreinoIMC,
      duracoes: duracoesTreino,
      duracoesIMC: duracoesTreinoIMC
    });
  } catch (error) {
    console.error('Erro ao retornar configurações:', error);
    res.status(500).json({
      error: '❌ Erro interno do servidor',
      message: 'Não foi possível retornar as configurações'
    });
  }
});

// Função para gerar treino personalizado
function gerarTreinoPersonalizado(nomeUsuario, objetivo, nivel, duracaoParam) {
  const config = configuracoesTreino[objetivo];
  const duracao = duracaoParam || duracoesTreino[nivel];
  
  const treino = {
    id: `treino_${Date.now()}`,
    nomeUsuario,
    objetivo,
    nivel,
    duracaoTotal: duracao.cardio + duracao.forca + duracao.flexibilidade,
    exercicios: [],
    dataCriacao: new Date().toISOString()
  };

  // Adicionar exercícios de cardio
  const numExerciciosCardio = Math.max(1, Math.floor(config.cardio * 3));
  const exerciciosCardio = selecionarExerciciosAleatorios('cardio', nivel, numExerciciosCardio);
  treino.exercicios.push({
    categoria: 'Cardio',
    duracao: duracao.cardio,
    exercicios: exerciciosCardio
  });

  // Adicionar exercícios de força
  const numExerciciosForca = Math.max(1, Math.floor(config.forca * 4));
  const exerciciosForca = selecionarExerciciosAleatorios('forca', nivel, numExerciciosForca);
  treino.exercicios.push({
    categoria: 'Força',
    duracao: duracao.forca,
    exercicios: exerciciosForca
  });

  // Adicionar exercícios de flexibilidade
  const numExerciciosFlex = Math.max(1, Math.floor(config.flexibilidade * 2));
  const exerciciosFlex = selecionarExerciciosAleatorios('flexibilidade', nivel, numExerciciosFlex);
  treino.exercicios.push({
    categoria: 'Flexibilidade',
    duracao: duracao.flexibilidade,
    exercicios: exerciciosFlex
  });

  return treino;
}

// Função para gerar treino baseado no IMC
function gerarTreinoPorIMC(nomeUsuario, classificacaoIMC, idade) {
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

// Funções auxiliares para cálculo de IMC (importadas do módulo IMC)
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade Grau I';
  if (imc < 40) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
}

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

module.exports = router;
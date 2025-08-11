// Dados dos exercícios armazenados em memória
const exercicios = {
  cardio: {
    iniciante: [
      {
        id: 'c1',
        nome: 'Caminhada',
        descricao: 'Caminhada em ritmo moderado',
        duracao: '20-30 minutos',
        calorias: '150-200',
        imagem: '🚶‍♂️',
        instrucoes: 'Mantenha um ritmo constante e respire normalmente'
      },
      {
        id: 'c2',
        nome: 'Polichinelo',
        descricao: 'Exercício cardiovascular completo',
        duracao: '5-10 minutos',
        calorias: '80-120',
        imagem: '🦘',
        instrucoes: 'Pule abrindo e fechando as pernas enquanto levanta os braços'
      },
      {
        id: 'c3',
        nome: 'Marcha no lugar',
        descricao: 'Marcha elevando os joelhos',
        duracao: '15-20 minutos',
        calorias: '100-150',
        imagem: '🏃‍♂️',
        instrucoes: 'Marche no lugar elevando os joelhos na altura da cintura'
      }
    ],
    intermediario: [
      {
        id: 'c4',
        nome: 'Corrida leve',
        descricao: 'Corrida em ritmo moderado',
        duracao: '25-35 minutos',
        calorias: '250-350',
        imagem: '🏃‍♀️',
        instrucoes: 'Mantenha um ritmo que permita conversar'
      },
      {
        id: 'c5',
        nome: 'Burpee',
        descricao: 'Exercício funcional completo',
        duracao: '10-15 minutos',
        calorias: '150-200',
        imagem: '🦸‍♂️',
        instrucoes: 'Agache, coloque as mãos no chão, jogue as pernas para trás e volte'
      },
      {
        id: 'c6',
        nome: 'Mountain climber',
        descricao: 'Simulação de escalada',
        duracao: '15-20 minutos',
        calorias: '180-250',
        imagem: '🧗‍♂️',
        instrucoes: 'Em posição de prancha, alterne levando os joelhos ao peito'
      }
    ],
    avancado: [
      {
        id: 'c7',
        nome: 'HIIT',
        descricao: 'Treino intervalado de alta intensidade',
        duracao: '20-30 minutos',
        calorias: '400-600',
        imagem: '⚡',
        instrucoes: 'Alternar períodos de alta intensidade com descanso ativo'
      },
      {
        id: 'c8',
        nome: 'Corrida com sprints',
        descricao: 'Corrida com acelerações',
        duracao: '30-45 minutos',
        calorias: '450-650',
        imagem: '🏃‍♂️💨',
        instrucoes: 'Corra em ritmo constante e faça sprints de 30 segundos'
      }
    ]
  },
  
  forca: {
    iniciante: [
      {
        id: 'f1',
        nome: 'Flexão de braço (joelhos)',
        descricao: 'Flexão com joelhos apoiados no chão',
        series: '3',
        repeticoes: '8-12',
        imagem: '🤸‍♂️',
        instrucoes: 'Mantenha o corpo alinhado e desça até quase tocar o chão'
      },
      {
        id: 'f2',
        nome: 'Agachamento simples',
        descricao: 'Agachamento sem peso',
        series: '3',
        repeticoes: '12-15',
        imagem: '🦆',
        instrucoes: 'Pés na largura dos ombros, desça como se fosse sentar'
      },
      {
        id: 'f3',
        nome: 'Prancha',
        descricao: 'Prancha isométrica',
        series: '3',
        duracao: '20-30 segundos',
        imagem: '🧘‍♂️',
        instrucoes: 'Mantenha o corpo reto da cabeça aos pés'
      }
    ],
    intermediario: [
      {
        id: 'f4',
        nome: 'Flexão de braço tradicional',
        descricao: 'Flexão completa',
        series: '4',
        repeticoes: '12-15',
        imagem: '💪',
        instrucoes: 'Mantenha o corpo rígido e desça controladamente'
      },
      {
        id: 'f5',
        nome: 'Agachamento com salto',
        descricao: 'Agachamento explosivo',
        series: '3',
        repeticoes: '10-12',
        imagem: '🦘',
        instrucoes: 'Agache e salte explosivamente ao subir'
      },
      {
        id: 'f6',
        nome: 'Prancha com elevação de perna',
        descricao: 'Prancha com movimento',
        series: '3',
        duracao: '30-45 segundos',
        imagem: '🦵',
        instrucoes: 'Mantenha a prancha e eleve uma perna alternadamente'
      }
    ],
    avancado: [
      {
        id: 'f7',
        nome: 'Flexão com palma',
        descricao: 'Flexão com aplauso',
        series: '4',
        repeticoes: '8-12',
        imagem: '👏',
        instrucoes: 'Faça a flexão e bata palmas no ar ao subir'
      },
      {
        id: 'f8',
        nome: 'Pistol squat',
        descricao: 'Agachamento com uma perna',
        series: '3',
        repeticoes: '6-8 por perna',
        imagem: '🦵💪',
        instrucoes: 'Agache com uma perna estendida à frente'
      }
    ]
  },
  
  flexibilidade: {
    iniciante: [
      {
        id: 'fl1',
        nome: 'Alongamento de panturrilha',
        descricao: 'Alongamento básico da panturrilha',
        duracao: '30 segundos por perna',
        imagem: '🦵',
        instrucoes: 'Mantenha a perna estendida e incline o corpo à frente'
      },
      {
        id: 'fl2',
        nome: 'Alongamento de quadríceps',
        descricao: 'Alongamento da parte frontal da coxa',
        duracao: '30 segundos por perna',
        imagem: '🦵',
        instrucoes: 'Segure o pé atrás do corpo e mantenha os joelhos juntos'
      },
      {
        id: 'fl3',
        nome: 'Alongamento de ombro',
        descricao: 'Alongamento dos músculos do ombro',
        duracao: '30 segundos por braço',
        imagem: '🤲',
        instrucoes: 'Traga o braço sobre o peito e segure com o outro braço'
      }
    ],
    intermediario: [
      {
        id: 'fl4',
        nome: 'Alongamento de borboleta',
        descricao: 'Alongamento dos adutores',
        duracao: '45 segundos',
        imagem: '🦋',
        instrucoes: 'Sente-se com as solas dos pés juntas e pressione os joelhos para baixo'
      },
      {
        id: 'fl5',
        nome: 'Alongamento de gato-vaca',
        descricao: 'Mobilidade da coluna',
        duracao: '1 minuto',
        imagem: '🐱🐮',
        instrucoes: 'Alternar entre arqueamento e curvatura da coluna'
      }
    ],
    avancado: [
      {
        id: 'fl6',
        nome: 'Split',
        descricao: 'Alongamento avançado das pernas',
        duracao: '2-3 minutos',
        imagem: '🦵🦵',
        instrucoes: 'Deslize as pernas para os lados até sentir alongamento'
      }
    ]
  }
};

// Configurações de treino por objetivo
const configuracoesTreino = {
  emagrecer: {
    cardio: 0.5,      // 50% do treino
    forca: 0.3,       // 30% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  ganharMassa: {
    cardio: 0.2,      // 20% do treino
    forca: 0.6,       // 60% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  condicionamento: {
    cardio: 0.4,      // 40% do treino
    forca: 0.4,       // 40% do treino
    flexibilidade: 0.2 // 20% do treino
  }
};

// Configurações de treino baseadas no IMC
const configuracoesTreinoIMC = {
  'Abaixo do peso': {
    objetivo: 'ganharMassa',
    nivel: 'iniciante',
    cardio: 0.2,      // 20% do treino
    forca: 0.6,       // 60% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  'Peso normal': {
    objetivo: 'condicionamento',
    nivel: 'intermediario',
    cardio: 0.4,      // 40% do treino
    forca: 0.4,       // 40% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  'Sobrepeso': {
    objetivo: 'emagrecer',
    nivel: 'iniciante',
    cardio: 0.5,      // 50% do treino
    forca: 0.3,       // 30% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  'Obesidade Grau I': {
    objetivo: 'emagrecer',
    nivel: 'iniciante',
    cardio: 0.6,      // 60% do treino
    forca: 0.2,       // 20% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  'Obesidade Grau II': {
    objetivo: 'emagrecer',
    nivel: 'iniciante',
    cardio: 0.7,      // 70% do treino
    forca: 0.1,       // 10% do treino
    flexibilidade: 0.2 // 20% do treino
  },
  'Obesidade Grau III': {
    objetivo: 'emagrecer',
    nivel: 'iniciante',
    cardio: 0.8,      // 80% do treino
    forca: 0.0,       // 0% do treino
    flexibilidade: 0.2 // 20% do treino
  }
};

// Durações de treino por nível
const duracoesTreino = {
  iniciante: {
    cardio: 15,
    forca: 20,
    flexibilidade: 10
  },
  intermediario: {
    cardio: 25,
    forca: 30,
    flexibilidade: 15
  },
  avancado: {
    cardio: 35,
    forca: 40,
    flexibilidade: 20
  }
};

// Durações de treino baseadas no IMC (mais conservadoras)
const duracoesTreinoIMC = {
  'Abaixo do peso': {
    cardio: 10,
    forca: 25,
    flexibilidade: 10
  },
  'Peso normal': {
    cardio: 20,
    forca: 25,
    flexibilidade: 15
  },
  'Sobrepeso': {
    cardio: 20,
    forca: 15,
    flexibilidade: 10
  },
  'Obesidade Grau I': {
    cardio: 25,
    forca: 10,
    flexibilidade: 10
  },
  'Obesidade Grau II': {
    cardio: 30,
    forca: 5,
    flexibilidade: 10
  },
  'Obesidade Grau III': {
    cardio: 35,
    forca: 0,
    flexibilidade: 10
  }
};

module.exports = {
  exercicios,
  configuracoesTreino,
  configuracoesTreinoIMC,
  duracoesTreino,
  duracoesTreinoIMC
}; 
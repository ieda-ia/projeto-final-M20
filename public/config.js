/**
 * Configurações do Frontend - Gerador de Treinos Personalizados
 */

// Configuração da API
const CONFIG = {
    // URL base da API
    API_BASE_URL: 'http://localhost:3006/api',
    
    // Endpoints da API
    ENDPOINTS: {
        TREINOS: '/treinos/gerar',
        IMC: '/imc/calcular'
    },
    
    // Configurações de validação
    VALIDATION: {
        PESO: {
            MIN: 20,
            MAX: 300
        },
        ALTURA: {
            MIN: 0.5,
            MAX: 3.0
        },
        IDADE: {
            MIN: 10,
            MAX: 100
        },
        NOME: {
            MAX_LENGTH: 50
        }
    },
    
    // Configurações de UI
    UI: {
        ANIMATION_DURATION: 600, // ms
        ERROR_MESSAGE_TIMEOUT: 5000, // ms
        SCROLL_BEHAVIOR: 'smooth'
    },
    
    // Configurações de exercícios
    EXERCICIOS: {
        DEFAULT_IMAGE: '💪',
        CATEGORIAS: ['Cardio', 'Força', 'Flexibilidade']
    }
};

// Exportar configuração para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 
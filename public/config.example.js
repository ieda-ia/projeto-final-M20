/**
 * Exemplo de Configuração do Frontend - Gerador de Treinos Personalizados
 * 
 * Este arquivo demonstra como configurar diferentes ambientes.
 * Copie este arquivo para config.js e ajuste as configurações conforme necessário.
 */

// Configuração da API
const CONFIG = {
    // URL base da API - Ajuste conforme o ambiente
    API_BASE_URL: 'http://localhost:3006/api', // Desenvolvimento local
    // API_BASE_URL: 'https://api.seudominio.com/api', // Produção
    // API_BASE_URL: 'https://staging.seudominio.com/api', // Staging
    
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
    },
    
    // Configurações de ambiente
    ENV: {
        DEBUG: true, // Habilita logs de debug
        VERSION: '1.0.0'
    }
};

// Exportar configuração para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}

/*
 * INSTRUÇÕES DE USO:
 * 
 * 1. Copie este arquivo para config.js
 * 2. Ajuste a API_BASE_URL conforme seu ambiente
 * 3. Modifique as validações se necessário
 * 4. Ajuste as configurações de UI conforme preferência
 * 
 * AMBIENTES:
 * - Desenvolvimento: http://localhost:3006/api
 * - Staging: https://staging.seudominio.com/api
 * - Produção: https://api.seudominio.com/api
 */ 
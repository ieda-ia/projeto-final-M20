/**
 * SPA Gerador de Treinos Personalizados
 * JavaScript principal com toda a lógica da aplicação
 */

// Configuração da API (agora centralizada no config.js)
const API_BASE_URL = CONFIG.API_BASE_URL;

// Inicialização da aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners
    setupEventListeners();
    
    // Configurar navegação suave
    setupSmoothNavigation();
    
    console.log('🚀 SPA Gerador de Treinos inicializada com sucesso!');
    console.log('📡 Conectando com API em:', API_BASE_URL);
});

// A inicialização dos componentes do MaterializeCSS agora é feita diretamente no HTML

/**
 * Configura todos os event listeners da aplicação
 */
function setupEventListeners() {
    // Formulário do Gerador de Treino
    const geradorTreinoForm = document.getElementById('geradorTreinoForm');
    if (geradorTreinoForm) {
        geradorTreinoForm.addEventListener('submit', handleGerarTreino);
    }
    
    // Formulário da Calculadora IMC
    const calculadoraIMCForm = document.getElementById('calculadoraIMCForm');
    if (calculadoraIMCForm) {
        calculadoraIMCForm.addEventListener('submit', handleCalcularIMC);
    }
    
    // Botão para gerar treino baseado no IMC
    const gerarTreinoIMCButton = document.getElementById('gerarTreinoIMCButton');
    if (gerarTreinoIMCButton) {
        gerarTreinoIMCButton.addEventListener('click', handleGerarTreinoIMC);
    }
    
    console.log('✅ Event listeners configurados');
}

/**
 * Configura navegação suave entre seções
 */
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: CONFIG.UI.SCROLL_BEHAVIOR,
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Manipula o envio do formulário de geração de treino
 * @param {Event} event - Evento de submit do formulário
 */
async function handleGerarTreino(event) {
    event.preventDefault();
    
    // Obter dados do formulário
    const formData = new FormData(event.target);
    const nomeUsuario = formData.get('nomeUsuario');
    const objetivo = formData.get('objetivo');
    const nivel = formData.get('nivel');
    const duracao = formData.get('duracao');
    
    // Validar dados
    if (!nomeUsuario || !objetivo || !nivel || !duracao) {
        showError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Mostrar loading
    showLoading('treino');
    
    try {
        // Fazer requisição para a API
        const response = await fetch(`${API_BASE_URL}/treinos/gerar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeUsuario: nomeUsuario,
                objetivo: objetivo,
                nivel: nivel,
                duracao: duracao
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const resultado = await response.json();
        console.log('Resposta da API:', resultado);
        
        // Exibir resultado
        if (resultado.treino) {
            displayTreino(resultado.treino);
        } else if (resultado.success && resultado.message) {
            // Se não tiver treino mas tiver sucesso, usar o próprio resultado
            displayTreino(resultado);
        } else {
            throw new Error('Formato de resposta inválido da API');
        }
        
        // Scroll para o resultado
        document.getElementById('resultadoTreino').scrollIntoView({
            behavior: CONFIG.UI.SCROLL_BEHAVIOR,
            block: 'start'
        });
        
    } catch (error) {
        console.error('❌ Erro ao gerar treino:', error);
        showError(`Erro ao gerar treino: ${error.message}`);
    } finally {
        hideLoading('treino');
    }
}

/**
 * Manipula o envio do formulário de cálculo de IMC
 * @param {Event} event - Evento de submit do formulário
 */
async function handleCalcularIMC(event) {
    event.preventDefault();
    
    // Obter dados do formulário
    const formData = new FormData(event.target);
    const peso = parseFloat(formData.get('peso'));
    const altura = parseFloat(formData.get('altura'));
    const idade = parseInt(formData.get('idade'));
    const nome = formData.get('nome') || 'Usuário';
    
    // Validar dados
    if (!peso || !altura || !idade) {
        showError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (peso < CONFIG.VALIDATION.PESO.MIN || peso > CONFIG.VALIDATION.PESO.MAX) {
        showError(`Peso deve estar entre ${CONFIG.VALIDATION.PESO.MIN} e ${CONFIG.VALIDATION.PESO.MAX} kg.`);
        return;
    }
    
    if (altura < CONFIG.VALIDATION.ALTURA.MIN || altura > CONFIG.VALIDATION.ALTURA.MAX) {
        showError(`Altura deve estar entre ${CONFIG.VALIDATION.ALTURA.MIN} e ${CONFIG.VALIDATION.ALTURA.MAX} metros.`);
        return;
    }
    
    if (idade < CONFIG.VALIDATION.IDADE.MIN || idade > CONFIG.VALIDATION.IDADE.MAX) {
        showError(`Idade deve estar entre ${CONFIG.VALIDATION.IDADE.MIN} e ${CONFIG.VALIDATION.IDADE.MAX} anos.`);
        return;
    }
    
    // Mostrar loading
    showLoading('imc');
    
    try {
        // Fazer requisição para a API
        const response = await fetch(`${API_BASE_URL}/imc/calcular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeUsuario: nome,
                peso: peso,
                altura: altura,
                idade: idade,
                gerarTreino: false // Primeiro só calcular o IMC
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const resultado = await response.json();
        
        // Exibir resultado do IMC
        displayIMCResult(resultado);
        
        // Mostrar botão para gerar treino personalizado
        showGerarTreinoIMCButton();
        
        // Scroll para o resultado
        document.getElementById('resultadoIMC').scrollIntoView({
            behavior: CONFIG.UI.SCROLL_BEHAVIOR,
            block: 'start'
        });
        
    } catch (error) {
        console.error('❌ Erro ao calcular IMC:', error);
        showError(`Erro ao calcular IMC: ${error.message}`);
    } finally {
        hideLoading('imc');
    }
}

/**
 * Manipula a geração de treino baseado no IMC
 */
async function handleGerarTreinoIMC() {
    // Obter dados do formulário
    const peso = parseFloat(document.getElementById('pesoInput').value);
    const altura = parseFloat(document.getElementById('alturaInput').value);
    const idade = parseInt(document.getElementById('idadeInput').value);
    const nome = document.getElementById('nomeInput').value || 'Usuário';
    
    // Validar dados
    if (!peso || !altura || !idade) {
        showError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Mostrar loading
    showLoading('imc');
    
    try {
        // Fazer requisição para a API com geração de treino
        const response = await fetch(`${API_BASE_URL}/imc/calcular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeUsuario: nome,
                peso: peso,
                altura: altura,
                idade: idade,
                gerarTreino: true // Gerar treino personalizado
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const resultado = await response.json();
        console.log('Resposta da API (treino IMC):', resultado);
        
        // Verificar se o resultado está na estrutura correta
        const dadosResultado = resultado.resultado || resultado;
        
        // Exibir treino personalizado
        if (dadosResultado.treinoPersonalizado) {
            displayTreinoIMC(dadosResultado.treinoPersonalizado, nome);
            
            // Scroll para o treino
            document.getElementById('treinoIMC').scrollIntoView({
                behavior: CONFIG.UI.SCROLL_BEHAVIOR,
                block: 'start'
            });
        } else {
            console.error('❌ Treino personalizado não encontrado na resposta:', dadosResultado);
            showError('Não foi possível gerar o treino personalizado. Tente novamente.');
        }
        
    } catch (error) {
        console.error('❌ Erro ao gerar treino baseado no IMC:', error);
        showError(`Erro ao gerar treino: ${error.message}`);
    } finally {
        hideLoading('imc');
    }
}

/**
 * Exibe o treino gerado na interface
 * @param {Object} treino - Dados do treino retornados pela API
 */
function displayTreino(treino) {
    const resultadoTreino = document.getElementById('resultadoTreino');
    const tituloTreino = document.getElementById('tituloTreino');
    const listaExercicios = document.getElementById('listaExercicios');
    
    // Configurar título
    let objetivoTexto = 'Personalizado';
    if (treino.objetivo) {
        switch(treino.objetivo) {
            case 'emagrecer':
                objetivoTexto = 'Emagrecer';
                break;
            case 'ganharMassa':
                objetivoTexto = 'Ganhar Massa';
                break;
            case 'condicionamento':
                objetivoTexto = 'Melhorar Condicionamento';
                break;
            default:
                objetivoTexto = treino.objetivo;
        }
    }
    tituloTreino.textContent = `Treino para ${treino.nomeUsuario} - ${objetivoTexto}`;
    console.log('Dados do treino recebidos:', treino);
    
    // Limpar lista anterior
    listaExercicios.innerHTML = '';
    
    // Exibir exercícios por categoria
    if (treino.exercicios && Array.isArray(treino.exercicios)) {
        treino.exercicios.forEach(categoria => {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'categoria-exercicios';
            
            categoriaDiv.innerHTML = `
                <h5 class="categoria-titulo">${categoria.categoria}</h5>
                <div class="categoria-conteudo">
                    ${categoria.exercicios.map(exercicio => createExercicioHTML(exercicio)).join('')}
                </div>
            `;
            
            listaExercicios.appendChild(categoriaDiv);
        });
    }
    
    // Mostrar resultado
    resultadoTreino.style.display = 'block';
    resultadoTreino.classList.add('fade-in-up');
    
    console.log('✅ Treino exibido com sucesso');
}

/**
 * Exibe o resultado do cálculo de IMC
 * @param {Object} resultado - Resultado do IMC retornado pela API
 */
function displayIMCResult(resultado) {
    const resultadoIMC = document.getElementById('resultadoIMC');
    const tituloIMC = document.getElementById('tituloIMC');
    const dadosIMC = document.getElementById('dadosIMC');
    const recomendacoesIMC = document.getElementById('recomendacoesIMC');
    
    // Log para debug
    console.log('Dados do IMC recebidos:', resultado);
    
    // Verificar se o resultado está na estrutura correta
    const dadosIMCObj = resultado.resultado || resultado;
    
    // Verificar se temos um nome de usuário
    const nomeUsuario = resultado.nomeUsuario || dadosIMCObj.nomeUsuario || 'Usuário';
    
    // Configurar título
    tituloIMC.textContent = `Resultado do IMC para ${nomeUsuario}`;
    
    // Exibir dados do IMC
    if (dadosIMCObj && dadosIMCObj.imc !== undefined) {
        dadosIMC.innerHTML = `
            <div class="imc-resultado">
                <h2 class="imc-valor">${dadosIMCObj.imc.toFixed(1)}</h2>
                <h4 class="imc-classificacao">${dadosIMCObj.classificacao}</h4>
                <p class="imc-status">${dadosIMCObj.status}</p>
            </div>
        `;
        
        // Exibir recomendações
        if (dadosIMCObj.recomendacoes && Array.isArray(dadosIMCObj.recomendacoes)) {
            recomendacoesIMC.innerHTML = `
                <div class="recomendacoes-lista">
                    <h5><i class="material-icons left">lightbulb</i>Recomendações Personalizadas</h5>
                    <ul>
                        ${dadosIMCObj.recomendacoes.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Mostrar resultado
        resultadoIMC.style.display = 'block';
        resultadoIMC.classList.add('fade-in-up');
        
        console.log('✅ Resultado do IMC exibido com sucesso');
    } else {
        console.error('❌ Dados de IMC inválidos:', dadosIMCObj);
        showError('Erro ao exibir IMC: Dados inválidos ou incompletos');
    }
}

/**
 * Exibe o treino personalizado baseado no IMC
 * @param {Object} treino - Dados do treino retornados pela API
 * @param {string} nome - Nome do usuário
 */
function displayTreinoIMC(treino, nome) {
    const treinoIMC = document.getElementById('treinoIMC');
    const tituloTreinoIMC = document.getElementById('tituloTreinoIMC');
    const listaExerciciosIMC = document.getElementById('listaExerciciosIMC');
    
    // Log para debug
    console.log('Dados do treino IMC recebidos:', treino);
    
    // Verificar se o treino está definido corretamente
    if (!treino) {
        console.error('❌ Dados de treino inválidos ou indefinidos');
        showError('Erro ao exibir treino: Dados inválidos ou incompletos');
        return;
    }
    
    // Configurar título
    tituloTreinoIMC.textContent = `Treino Personalizado para ${nome} (Baseado no IMC)`;
    
    // Limpar lista anterior
    listaExerciciosIMC.innerHTML = '';
    
    // Exibir exercícios por categoria
    if (treino.exercicios && Array.isArray(treino.exercicios)) {
        treino.exercicios.forEach(categoria => {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'categoria-exercicios';
            
            categoriaDiv.innerHTML = `
                <h5 class="categoria-titulo">${categoria.categoria}</h5>
                <div class="categoria-conteudo">
                    ${categoria.exercicios.map(exercicio => createExercicioHTML(exercicio)).join('')}
                </div>
            `;
            
            listaExerciciosIMC.appendChild(categoriaDiv);
        });
    }
    
    // Mostrar resultado
    treinoIMC.style.display = 'block';
    treinoIMC.classList.add('fade-in-up');
    
    console.log('✅ Treino baseado no IMC exibido com sucesso');
}

/**
 * Cria o HTML para um exercício individual
 * @param {Object} exercicio - Dados do exercício
 * @returns {string} HTML do exercício
 */
function createExercicioHTML(exercicio) {
    let detalhesHTML = '';
    
    // Adicionar detalhes específicos baseados no tipo de exercício
    if (exercicio.series && exercicio.repeticoes) {
        detalhesHTML += `
            <div class="detalhe-item">
                <strong>Séries</strong>
                <span>${exercicio.series}</span>
            </div>
            <div class="detalhe-item">
                <strong>Repetições</strong>
                <span>${exercicio.repeticoes}</span>
            </div>
        `;
    }
    
    if (exercicio.duracao) {
        detalhesHTML += `
            <div class="detalhe-item">
                <strong>Duração</strong>
                <span>${exercicio.duracao}</span>
            </div>
        `;
    }
    
    if (exercicio.calorias) {
        detalhesHTML += `
            <div class="detalhe-item">
                <strong>Calorias</strong>
                <span>${exercicio.calorias}</span>
            </div>
        `;
    }
    
    return `
        <div class="exercicio-item">
            <span class="exercicio-imagem">${exercicio.imagem || CONFIG.EXERCICIOS.DEFAULT_IMAGE}</span>
            <h5>${exercicio.nome}</h5>
            <p>${exercicio.descricao || ''}</p>
            ${exercicio.instrucoes ? `<p><strong>Instruções:</strong> ${exercicio.instrucoes}</p>` : ''}
            <div class="exercicio-detalhes">
                ${detalhesHTML}
            </div>
        </div>
    `;
}

/**
 * Mostra o botão para gerar treino baseado no IMC
 */
function showGerarTreinoIMCButton() {
    const gerarTreinoIMCButton = document.getElementById('gerarTreinoIMCButton');
    if (gerarTreinoIMCButton) {
        gerarTreinoIMCButton.style.display = 'inline-block';
    }
}

/**
 * Mostra o indicador de loading
 * @param {string} tipo - Tipo de loading ('treino' ou 'imc')
 */
function showLoading(tipo) {
    const loadingElement = document.getElementById(`loading${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

/**
 * Esconde o indicador de loading
 * @param {string} tipo - Tipo de loading ('treino' ou 'imc')
 */
function hideLoading(tipo) {
    const loadingElement = document.getElementById(`loading${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

/**
 * Exibe uma mensagem de erro
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function showError(mensagem) {
    // Remover mensagens de erro anteriores
    removeErrorMessages();
    
    // Criar e exibir nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'card-panel red lighten-5 red-text text-darken-4';
    errorDiv.innerHTML = `
        <i class="material-icons left">error</i>
        ${mensagem}
    `;
    
    // Inserir no topo da página
    const main = document.querySelector('main');
    main.insertBefore(errorDiv, main.firstChild);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: CONFIG.UI.SCROLL_BEHAVIOR });
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, CONFIG.UI.ERROR_MESSAGE_TIMEOUT);
    
    console.error('❌ Erro:', mensagem);
}

/**
 * Remove todas as mensagens de erro da página
 */
function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.red.lighten-5');
    errorMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

/**
 * Exibe uma mensagem de sucesso
 * @param {string} mensagem - Mensagem de sucesso a ser exibida
 */
function showSuccess(mensagem) {
    // Remover mensagens de sucesso anteriores
    removeSuccessMessages();
    
    // Criar e exibir nova mensagem de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'card-panel green lighten-5 green-text text-darken-4';
    successDiv.innerHTML = `
        <i class="material-icons left">check_circle</i>
        ${mensagem}
    `;
    
    // Inserir no topo da página
    const main = document.querySelector('main');
    main.insertBefore(successDiv, main.firstChild);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: CONFIG.UI.SCROLL_BEHAVIOR });
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, CONFIG.UI.ERROR_MESSAGE_TIMEOUT);
    
    console.log('✅ Sucesso:', mensagem);
}

/**
 * Remove todas as mensagens de sucesso da página
 */
function removeSuccessMessages() {
    const successMessages = document.querySelectorAll('.green.lighten-5');
    successMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

// Exportar funções para uso global (se necessário)
window.GeradorTreinos = {
    handleGerarTreino,
    handleCalcularIMC,
    handleGerarTreinoIMC,
    showError,
    showSuccess
};
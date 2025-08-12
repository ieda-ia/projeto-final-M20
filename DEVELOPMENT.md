# 🚀 Guia de Desenvolvimento - Gerador de Treinos Personalizados

Este documento fornece instruções para desenvolvedores que trabalham no projeto.

## 📁 Estrutura do Projeto

```
projeto-final-M20/
├── 📁 public/                    # Frontend da aplicação
│   ├── 📄 index.html             # Página principal da SPA
│   ├── 📄 styles.css             # Estilos CSS personalizados
│   ├── 📄 script.js              # Lógica JavaScript da aplicação
│   ├── 📄 config.js              # Configurações centralizadas
│   ├── 📄 config.example.js      # Exemplo de configuração
│   ├── 📄 README.md              # Documentação do frontend
│   ├── 📄 README-FRONTEND.md     # Documentação técnica completa
│   └── 📄 EXEMPLO-USO-FRONTEND.md # Guia de uso e testes
├── 📁 data/                      # Dados da aplicação
│   └── 📄 exercicios.js          # Banco de exercícios
├── 📁 routes/                    # Rotas da API
│   ├── 📄 treinos.js             # Endpoints de treinos
│   └── 📄 imc.js                 # Endpoints de IMC
├── 📄 server.js                   # Servidor Express
├── 📄 package.json                # Dependências e scripts
└── 📄 README.md                   # Documentação principal
```

## 🛠️ Configuração do Ambiente

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Configuração do Frontend
```bash
# Copie o arquivo de exemplo
cp public/config.example.js public/config.js

# Edite as configurações conforme necessário
# Especialmente a API_BASE_URL para seu ambiente
```

### 3. Inicialização do Servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 🔧 Desenvolvimento do Frontend

### Localização dos Arquivos
- **HTML**: `public/index.html`
- **CSS**: `public/styles.css`
- **JavaScript**: `public/script.js`
- **Configurações**: `public/config.js`

### Estrutura do JavaScript
```javascript
// script.js está organizado em funções modulares:
- initializeMaterialize()     // Inicialização do MaterializeCSS
- setupEventListeners()       // Configuração de eventos
- setupSmoothNavigation()     // Navegação suave
- handleGerarTreino()        // Geração de treinos
- handleCalcularIMC()        // Cálculo de IMC
- displayTreino()            // Exibição de treinos
- displayIMCResult()         // Exibição de resultados
```

### Configurações Centralizadas
```javascript
// config.js contém todas as configurações:
CONFIG.API_BASE_URL          // URL da API
CONFIG.VALIDATION            // Regras de validação
CONFIG.UI                    // Configurações de interface
CONFIG.EXERCICIOS            // Configurações de exercícios
```

## 🎨 Desenvolvimento de Estilos

### Framework Base
- **MaterializeCSS**: Componentes e grid system
- **CSS Custom**: Estilos personalizados em `styles.css`

### Classes CSS Principais
```css
.exercicio-item              /* Item de exercício */
.categoria-exercicios        /* Categoria de exercícios */
.imc-resultado               /* Resultado do IMC */
.recomendacoes-lista        /* Lista de recomendações */
.card-panel                  /* Painéis de resultado */
```

### Responsividade
- **Desktop**: 3 colunas
- **Tablet**: 2 colunas
- **Mobile**: 1 coluna

## 🧪 Testes e Qualidade

### IDs para Automação
Todos os elementos interativos possuem IDs únicos:
```html
<!-- Formulários -->
<form id="geradorTreinoForm">
<form id="calculadoraIMCForm">

<!-- Campos -->
<select id="objetivoSelect">
<input id="pesoInput">

<!-- Botões -->
<button id="gerarTreinoButton">
<button id="calcularIMCButton">

<!-- Resultados -->
<div id="resultadoTreino">
<div id="resultadoIMC">
```

### Estrutura para Cypress
```javascript
// Exemplos de seletores para testes:
cy.get('#geradorTreinoForm')
cy.get('#objetivoSelect').select('emagrecer')
cy.get('#gerarTreinoButton').click()
cy.get('#resultadoTreino').should('be.visible')
```

## 🔄 Fluxo de Desenvolvimento

### 1. Modificação do Frontend
1. Edite arquivos na pasta `public/`
2. O servidor serve automaticamente as mudanças
3. Acesse `http://localhost:3006/` para ver as alterações

### 2. Modificação da API
1. Edite arquivos em `routes/` ou `data/`
2. Reinicie o servidor se necessário
3. Teste via Swagger em `http://localhost:3006/api-docs`

### 3. Configurações
1. Modifique `public/config.js` para mudanças de configuração
2. Use `public/config.example.js` como referência
3. Reinicie o servidor se necessário

## 📱 Desenvolvimento Responsivo

### Breakpoints
```css
/* Mobile */
@media only screen and (max-width: 600px)

/* Tablet */
@media only screen and (min-width: 601px) and (max-width: 1199px)

/* Desktop */
@media only screen and (min-width: 1200px)
```

### Componentes Adaptativos
- **Formulários**: Colunas se ajustam ao tamanho da tela
- **Cards**: Largura total em mobile, lado a lado em desktop
- **Botões**: Largura total em mobile, tamanho fixo em desktop

## 🚀 Deploy e Produção

### Configuração de Produção
1. Ajuste `API_BASE_URL` em `public/config.js`
2. Configure variáveis de ambiente se necessário
3. Execute `npm start` para produção

### Estrutura de Deploy
```
public/                    # Arquivos estáticos
├── index.html            # Página principal
├── styles.css            # Estilos
├── script.js             # Lógica
└── config.js             # Configurações
```

## 🐛 Debugging

### Console do Navegador
- Logs de inicialização da aplicação
- Erros de API e validação
- Estado dos formulários e dados

### Ferramentas de Desenvolvimento
- **Chrome DevTools**: Debug JavaScript e CSS
- **Network Tab**: Monitorar requisições à API
- **Console**: Logs e erros em tempo real

## 📚 Recursos Úteis

### Documentação
- **README.md**: Visão geral do projeto
- **README-FRONTEND.md**: Documentação técnica do frontend
- **EXEMPLO-USO-FRONTEND.md**: Guia de uso e testes

### APIs
- **Swagger**: `http://localhost:3006/api-docs`
- **API Base**: `http://localhost:3006/api`
- **Frontend**: `http://localhost:3006/`

### Dependências
- **MaterializeCSS**: Framework de design
- **Express**: Servidor web
- **Swagger**: Documentação da API

## 🤝 Contribuição

### Padrões de Código
1. **JavaScript**: ES6+, funções modulares, comentários JSDoc
2. **CSS**: Classes descritivas, organização por seções
3. **HTML**: Estrutura semântica, IDs únicos para testes

### Commits
- Use mensagens descritivas
- Referencie issues se aplicável
- Teste as mudanças antes de commitar

---

**Desenvolvimento organizado e estruturado! 🚀** 
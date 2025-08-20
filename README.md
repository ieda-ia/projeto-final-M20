# 🏋️‍♀️ Gerador de Treinos Personalizados e Calculadora de IMC

> **Sistema completo com API REST para geração de treinos personalizados e frontend SPA integrado**

## 📋 Descrição do Projeto

Este projeto oferece uma solução completa para otimizar sua jornada de saúde e bem-estar, incluindo:

- 🎯 **API REST**: Backend robusto para geração de treinos e cálculo de IMC.
- 🌐 **Frontend SPA**: Interface web moderna e responsiva para uma experiência de usuário fluida.
- 📊 **Calculadora de IMC**: Ferramenta precisa com recomendações personalizadas.
- 🆕 **Treinos Baseados no IMC**: Geração automática de treinos adaptados ao seu perfil de saúde.
- 💪 **Recomendações de Exercícios**: Sugestões inteligentes e adequadas ao seu biotipo e objetivos.
- 🔄 **Exercícios Aleatórios**: Variedade garantida a cada sessão de treino para evitar a monotonia.

## 🚀 Funcionalidades Principais

### 🎯 Gerador de Treinos
- **Nome do Usuário**: Personalize seu treino com seu nome.
- **Objetivos**: Escolha entre Emagrecer, Ganhar Massa ou Melhorar Condicionamento.
- **Níveis**: Adapte o treino ao seu nível: Iniciante, Intermediário ou Avançado.
- **Categorias**: Treinos balanceados com Cardio, Força e Flexibilidade.
- **Personalização**: Treinos adaptados ao seu perfil e necessidades.

### 📊 Calculadora de IMC
- **Nome do Usuário**: Identifique seu cálculo de IMC.
- **Cálculo Automático**: IMC baseado em peso, altura e idade.
- **Classificação**: 6 categorias de peso com indicadores visuais claros.
- **Recomendações**: Sugestões personalizadas de exercícios e hábitos saudáveis.
- **Perfil Etário**: Adaptações para diferentes faixas etárias.
- **🆕 Geração de Treinos**: Opção de gerar treino diretamente do resultado do IMC.

### 🆕 Treinos Baseados no IMC
- **Automatização**: Treinos gerados automaticamente com base na sua classificação de IMC.
- **Configurações Inteligentes**: Objetivo e nível definidos automaticamente para otimizar resultados.
- **Durações Adaptadas**: Tempos de exercício ajustados ao seu perfil de saúde.
- **Exercícios Seguros**: Seleção de exercícios adequados à sua condição física.

### 💪 Banco de Exercícios
- **30+ Exercícios**: Uma vasta biblioteca organizada por categoria e nível.
- **Instruções Detalhadas**: Passo a passo claro para cada exercício.
- **Emojis Visuais**: Representação visual dos movimentos para facilitar o entendimento.
- **Informações Nutricionais**: Dados sobre calorias e duração estimada.

### 🌐 Frontend SPA
- **Interface Moderna**: Design responsivo e intuitivo com MaterializeCSS.
- **Navegação Intuitiva**: Seções organizadas e navegação suave.
- **Formulários Interativos**: Validação em tempo real para feedback imediato.
- **Resultados Visuais**: Exibição clara e organizada dos treinos e resultados de IMC.
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript.
- **Express.js** - Framework web para construção da API.
- **Swagger** - Documentação interativa da API.
- **CORS** - Gerenciamento de requisições cross-origin.
- **Helmet** - Segurança HTTP para proteção da aplicação.

### Frontend
- **HTML5** - Estrutura semântica da página.
- **CSS3** - Estilos responsivos e animações.
- **JavaScript (ES6+)** - Lógica da aplicação.
- **MaterializeCSS** - Framework de design para componentes modernos.
- **Google Fonts** - Tipografia Roboto para legibilidade.
- **Material Icons** - Ícones intuitivos para a interface.

## 📁 Estrutura do Projeto

```
projeto-final-M20/
├── 📁 Planejamento_testes/        # Documentos de planejamento de testes
│   ├── 📄 Caso_de_Teste.docx      # Caso de teste
│   └── 📄 Registro_de_Defeitos.docx # Registro de defeitos
├── 📁 api_test/                   # Testes de API
│   ├── 📄 imc.test.js             # Testes para a rota IMC
│   ├── 📄 listasCadastros.test.js # Testes para listagem de cadastros
│   └── 📄 treino.test.js          # Testes para a rota de treinos
├── 📁 data/                       # Dados da aplicação
│   └── 📄 exercicios.js           # Banco de exercícios
├── 📁 fixtures/                   # Dados de teste ou mock
├── 📁 helpers/                    # Funções auxiliares
│   └── 📄 info.js                 # Informações de ajuda
├── 📁 public/                     # Frontend da aplicação
│   ├── 📄 index.html              # Página principal da SPA
│   ├── 📄 styles.css              # Estilos CSS personalizados
│   ├── 📄 jquery-3.6.0.min.js     # Biblioteca jQuery
│   ├── 📄 materialize.min.js      # Framework MaterializeCSS
│   ├── 📄 script.js               # Lógica JavaScript da aplicação
│   ├── 📄 config.js               # Configurações centralizadas
│   ├── 📄 config.example.js       # Exemplo de configuração
├── 📁 routes/                     # Rotas da API
│   ├── 📄 treinos.js              # Endpoints de treinos
│   └── 📄 imc.js                  # Endpoints de IMC
├── 📄 .gitignore                  # Arquivos e pastas a serem ignorados pelo Git
├── 📄 package.json                # Dependências e scripts
├── 📄 package-lock.json           # Bloqueio de dependências
├── 📄 server.js                   # Servidor Express
└── 📄 README.md                   # Documentação principal (este arquivo)
```

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### 2. Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd projeto-final-M20

# Instale as dependências
npm install
```

### 3. Execução
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

### 4. Acesso
- 🌐 **Frontend**: http://localhost:3006/
- 🏠 **API**: http://localhost:3006/api
- 📚 **Swagger**: http://localhost:3006/api-docs
- 🔧 **App Alternativo**: http://localhost:3006/app

## ⚙️ Variáveis de Ambiente

Para configurar variáveis de ambiente, crie um arquivo `.env` na raiz do projeto. Este arquivo não deve ser versionado no Git por conter informações sensíveis ou específicas do ambiente.

Exemplo de `.env`:
```
PORT=3006
API_BASE_URL=http://localhost:3006
# Outras variáveis de ambiente podem ser adicionadas aqui
```

As variáveis definidas no `.env` serão carregadas automaticamente pela aplicação.

## 🧪 Testes e Qualidade

### IDs para Automação
Todos os elementos interativos possuem IDs únicos para facilitar a automação de testes:
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
Exemplos de seletores para testes de UI:
```javascript
cy.get('#geradorTreinoForm')
cy.get('#objetivoSelect').select('emagrecer')
cy.get('#gerarTreinoButton').click()
cy.get('#resultadoTreino').should('be.visible')
```

### 📊 Relatórios Mochawesome

Os testes de API são configurados para gerar relatórios detalhados usando Mochawesome. Após a execução dos testes, um relatório HTML interativo será gerado, fornecendo uma visão clara dos resultados dos testes, incluindo quais testes passaram, falharam e seus respectivos detalhes.

**Como visualizar os relatórios:**

1. **Executar os testes:**
   ```bash
   npm test
   ```

2. **Abrir o relatório:**
   Após a execução, o relatório será salvo em `mochawesome-report/mochawesome.html`. Abra este arquivo em seu navegador para visualizar os resultados.

   Exemplo de caminho:
   `file:///path/to/your/project/mochawesome-report/mochawesome.html`

Este relatório é uma ferramenta valiosa para depuração e para acompanhar a qualidade do código.

## 🔄 Fluxo de Desenvolvimento

### 1. Modificação do Frontend
1. Edite arquivos na pasta `public/`.
2. O servidor serve automaticamente as mudanças.
3. Acesse `http://localhost:3006/` para ver as alterações.

### 2. Modificação da API
1. Edite arquivos em `routes/` ou `data/`.
2. Reinicie o servidor se necessário.
3. Teste via Swagger em `http://localhost:3006/api-docs`.

### 3. Configurações
1. Modifique `public/config.js` para mudanças de configuração.
2. Use `public/config.example.js` como referência.
3. Reinicie o servidor se necessário.

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
- **Formulários**: Colunas se ajustam ao tamanho da tela.
- **Cards**: Largura total em mobile, lado a lado em desktop.
- **Botões**: Largura total em mobile, tamanho fixo em desktop.

## 🚀 Deploy e Produção

### Configuração de Produção
1. Ajuste `API_BASE_URL` em `public/config.js`.
2. Configure variáveis de ambiente se necessário.
3. Execute `npm start` para produção.

### Estrutura de Deploy
```
public/                    # Arquivos estáticos
├── index.html            # Página principal
├── styles.css            # Estilos
├── jquery-3.6.0.min.js   # Biblioteca jQuery
├── materialize.min.js    # Framework MaterializeCSS
├── script.js             # Lógica
```

## 🐛 Debugging

### Console do Navegador
- Logs de inicialização da aplicação.
- Erros de API e validação.
- Estado dos formulários e dados.

### Ferramentas de Desenvolvimento
- **Chrome DevTools**: Debug JavaScript e CSS.
- **Network Tab**: Monitorar requisições à API.
- **Console**: Logs e erros em tempo real.

## 📚 Exemplos de Uso da API

### 🚀 Testando a API

#### 1. **Verificar Status da API**
```bash
curl http://localhost:3006
```

**Resposta esperada:**
```json
{
  "message": "🏋️‍♂️ Bem-vindo à API de Gerador de Treinos Personalizados!",
  "endpoints": {
    "treinos": "/api/treinos",
    "imc": "/api/imc",
    "documentacao": "/api-docs"
  },
  "status": "✅ API funcionando perfeitamente!"
}
```

#### 2. **Listar Todos os Exercícios**
```bash
curl http://localhost:3006/api/treinos/exercicios
```

#### 3. **Ver Configurações de Treino**
```bash
curl http://localhost:3006/api/treinos/configuracoes
```

### 🎯 Gerando Treinos Personalizados

#### **Exemplo 1: Treino para Emagrecer (Iniciante)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "João Silva",
    "objetivo": "emagrecer",
    "nivel": "iniciante"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "🎯 Treino gerado com sucesso para João Silva!",
  "treino": {
    "id": "treino_1234567890",
    "nomeUsuario": "João Silva",
    "objetivo": "emagrecer",
    "nivel": "iniciante",
    "duracaoTotal": 45,
    "exercicios": [
      {
        "categoria": "Cardio",
        "duracao": 15,
        "exercicios": [...]
      },
      {
        "categoria": "Força",
        "duracao": 20,
        "exercicios": [...]
      },
      {
        "categoria": "Flexibilidade",
        "duracao": 10,
        "exercicios": [...]
      }
    ],
    "dataCriacao": "2024-01-01T10:00:00.000Z"
  }
}
```

#### **Exemplo 2: Treino para Ganhar Massa (Intermediário)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Maria Santos",
    "objetivo": "ganharMassa",
    "nivel": "intermediario"
  }'
```

#### **Exemplo 3: Treino para Condicionamento (Avançado)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Pedro Costa",
    "objetivo": "condicionamento",
    "nivel": "avancado"
  }'
```

### 🆕 **NOVA FUNCIONALIDADE: Gerar Treino Baseado no IMC**

#### **Exemplo 1: Gerar Treino por IMC (com treino personalizado)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Ana Oliveira",
    "peso": 70,
    "altura": 1.75,
    "idade": 30
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "🎯 Treino baseado no IMC gerado com sucesso para Ana Oliveira!",
  "resultadoIMC": {
    "imc": 22.86,
    "classificacao": "Peso normal",
    "status": "Excelente! Mantenha seus hábitos saudáveis",
    "recomendacoes": [...],
    "exerciciosRecomendados": [...]
  },
  "treino": {
    "id": "treino_imc_1234567890",
    "nomeUsuario": "Ana Oliveira",
    "objetivo": "condicionamento",
    "nivel": "intermediario",
    "classificacaoIMC": "Peso normal",
    "duracaoTotal": 60,
    "exercicios": [...],
    "observacao": "Treino personalizado baseado no IMC: Peso normal"
  }
}
```

### 📊 Calculando IMC

#### **Exemplo 1: IMC Básico (sem gerar treino)**
```bash
curl -X POST http://localhost:3006/api/imc/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Carlos Lima",
    "peso": 70,
    "altura": 1.75,
    "idade": 30
  }'
```

#### **Exemplo 2: IMC com Geração de Treino Personalizado**
```bash
curl -X POST http://localhost:3006/api/imc/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Fernanda Rocha",
    "peso": 85,
    "altura": 1.70,
    "idade": 35,
    "gerarTreino": true
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "📊 IMC calculado com sucesso para Fernanda Rocha!",
  "resultado": {
    "imc": 29.41,
    "classificacao": "Sobrepeso",
    "status": "Atenção: Considere ajustar sua alimentação e aumentar a atividade física",
    "recomendacoes": [...],
    "exerciciosRecomendados": [...],
    "treinoPersonalizado": {
      "id": "treino_imc_1234567890",
      "nomeUsuario": "Fernanda Rocha",
      "objetivo": "emagrecer",
      "nivel": "iniciante",
      "classificacaoIMC": "Sobrepeso",
      "duracaoTotal": 45,
      "exercicios": [...],
      "observacao": "Treino personalizado baseado no IMC: Sobrepeso"
    }
  }
}
```

#### **Exemplo 3: Pessoa com Baixo Peso**
```bash
curl -X POST http://localhost:3006/api/imc/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Lucas Mendes",
    "peso": 55,
    "altura": 1.80,
    "idade": 25
  }'
```

## 📚 Recursos Úteis

### Documentação
- **README.md**: Visão geral do projeto (este arquivo).

## 👩‍💻 Créditos

**Autora**: Ieda Ferreira Alves Flock
**GitHub**: <mcurl name="ieda-ia" url="https://github.com/ieda-ia"></mcurl>
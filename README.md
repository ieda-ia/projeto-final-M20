# 🏋️‍♂️ Gerador de Treinos Personalizados - API + Frontend

> **Sistema completo com API REST para geração de treinos personalizados e frontend SPA integrado**

## 📋 Descrição

Este projeto oferece uma solução completa para geração de treinos personalizados, incluindo:

- 🎯 **API REST**: Backend completo para geração de treinos e cálculo de IMC
- 🌐 **Frontend SPA**: Interface web moderna e responsiva
- 📊 **Calculadora de IMC**: Com recomendações personalizadas
- 🆕 **Treinos Baseados no IMC**: Geração automática baseada no perfil de saúde
- 💪 **Recomendações de Exercícios**: Sugestões adequadas ao perfil do usuário
- 🔄 **Exercícios Aleatórios**: Variedade a cada sessão de treino

## 🚀 Funcionalidades

### 🎯 Gerador de Treinos
- **Nome do Usuário**: Campo obrigatório para personalização
- **Objetivos**: Emagrecer, Ganhar Massa, Melhorar Condicionamento
- **Níveis**: Iniciante, Intermediário, Avançado
- **Categorias**: Cardio, Força, Flexibilidade
- **Personalização**: Treinos adaptados ao perfil do usuário

### 📊 Calculadora de IMC
- **Nome do Usuário**: Campo obrigatório para personalização
- **Cálculo Automático**: IMC baseado em peso, altura e idade
- **Classificação**: 6 categorias de peso com indicadores visuais
- **Recomendações**: Sugestões personalizadas de exercícios
- **Perfil Etário**: Adaptações para diferentes faixas etárias
- **🆕 Geração de Treinos**: Opção de gerar treino baseado no resultado do IMC

### 🆕 Treinos Baseados no IMC
- **Automatização**: Treinos gerados automaticamente baseados na classificação do IMC
- **Configurações Inteligentes**: Objetivo e nível definidos automaticamente
- **Durações Adaptadas**: Tempos de exercício ajustados ao perfil de saúde
- **Exercícios Seguros**: Seleção de exercícios adequados à condição física

### 💪 Banco de Exercícios
- **30+ Exercícios**: Organizados por categoria e nível
- **Instruções Detalhadas**: Passo a passo para cada exercício
- **Emojis Visuais**: Representação visual dos movimentos
- **Informações Nutricionais**: Calorias e duração estimada

### 🌐 Frontend SPA
- **Interface Moderna**: Design responsivo com MaterializeCSS
- **Navegação Intuitiva**: Seções organizadas e navegação suave
- **Formulários Interativos**: Validação em tempo real
- **Resultados Visuais**: Exibição organizada dos treinos e IMC
- **Totalmente Responsivo**: Funciona em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-origin resource sharing
- **Helmet** - Segurança HTTP

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos e animações
- **JavaScript (ES6+)** - Lógica da aplicação
- **MaterializeCSS** - Framework de design
- **Google Fonts** - Tipografia Roboto
- **Material Icons** - Ícones da interface

## 📁 Estrutura do Projeto

```
projeto-final-M20/
├── 📁 public/                    # 🆕 Frontend da aplicação
│   ├── 📄 index.html             # Página principal da SPA
│   ├── 📄 styles.css             # Estilos CSS personalizados
│   ├── 📄 script.js              # Lógica JavaScript
│   ├── 📄 config.js              # Configurações centralizadas
│   ├── 📄 config.example.js      # Exemplo de configuração
│   ├── 📄 README.md              # Documentação do frontend
│   ├── 📄 README-FRONTEND.md     # Documentação técnica completa
│   └── 📄 EXEMPLO-USO-FRONTEND.md # Guia de uso e testes
├── 📁 data/
│   └── 📄 exercicios.js          # Banco de exercícios e configurações por IMC
├── 📁 routes/
│   ├── 📄 treinos.js             # Rotas para geração de treinos
│   └── 📄 imc.js                 # Rotas para cálculo de IMC
├── 📄 server.js                   # Servidor principal (atualizado para servir frontend)
├── 📄 package.json                # Dependências e scripts
├── 📄 README.md                   # Este arquivo
└── 📄 exemplos-uso.md             # Exemplos práticos de uso da API
```

## 🚀 Como Executar

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

## 🌐 Frontend SPA

### 🎯 Funcionalidades
- **Gerador de Treino**: Formulário completo para criação de treinos
- **Calculadora IMC**: Interface para cálculo e recomendações
- **Design Responsivo**: Adapta-se a todos os dispositivos
- **Navegação Suave**: Transições e scroll automático
- **Validação em Tempo Real**: Feedback imediato para o usuário

### 🎨 Características de Design
- **MaterializeCSS**: Componentes modernos e responsivos
- **Cores Consistentes**: Paleta de cores unificada
- **Animações CSS**: Transições suaves e efeitos hover
- **Ícones Material**: Interface intuitiva e familiar
- **Tipografia Roboto**: Legibilidade em todas as telas

### 🧪 Preparado para Testes
- **IDs Únicos**: Todos os elementos possuem identificadores
- **Estrutura Consistente**: HTML semântico e organizado
- **Funções Testáveis**: JavaScript modular e isolado
- **Estados de UI**: Estados claros para automação

## 📚 Endpoints da API

### 🎯 Treinos

#### `POST /api/treinos/gerar`
Gera um treino personalizado baseado no nome do usuário, objetivo e nível.

**Body (obrigatório):**
```json
{
  "nomeUsuario": "João Silva",
  "objetivo": "emagrecer",
  "nivel": "iniciante"
}
```

**Resposta:**
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
    "exercicios": [...],
    "dataCriacao": "2024-01-01T10:00:00.000Z"
  }
}
```

#### 🆕 `POST /api/treinos/gerar-por-imc`
Gera um treino personalizado baseado no IMC do usuário.

**Body (obrigatório):**
```json
{
  "nomeUsuario": "Ana Oliveira",
  "peso": 70,
  "altura": 1.75,
  "idade": 30
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "🎯 Treino baseado no IMC gerado com sucesso para Ana Oliveira!",
  "resultadoIMC": {...},
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

#### `GET /api/treinos/exercicios`
Lista todos os exercícios disponíveis organizados por categoria e nível.

#### `GET /api/treinos/configuracoes`
Retorna as configurações de treino por objetivo, duração por nível e configurações baseadas no IMC.

### 📊 IMC

#### `POST /api/imc/calcular`
Calcula o IMC e fornece recomendações personalizadas. Pode gerar treino baseado no resultado.

**Body (obrigatório):**
```json
{
  "nomeUsuario": "Carlos Lima",
  "peso": 70,
  "altura": 1.75,
  "idade": 30,
  "gerarTreino": true
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "📊 IMC calculado com sucesso para Carlos Lima!",
  "resultado": {
    "imc": 22.86,
    "classificacao": "Peso normal",
    "status": "Excelente! Mantenha seus hábitos saudáveis",
    "recomendacoes": [...],
    "exerciciosRecomendados": [...],
    "treinoPersonalizado": {...}
  }
}
```

#### `GET /api/imc/classificacoes`
Lista todas as classificações possíveis de IMC com descrições e recomendações.

## 🎯 Exemplos de Uso

### Gerar Treino para Emagrecer (Iniciante)
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "João Silva",
    "objetivo": "emagrecer",
    "nivel": "iniciante"
  }'
```

### Gerar Treino Baseado no IMC
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Maria Santos",
    "peso": 75,
    "altura": 1.80,
    "idade": 25
  }'
```

### Calcular IMC com Geração de Treino
```bash
curl -X POST http://localhost:3006/api/imc/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Pedro Costa",
    "peso": 75,
    "altura": 1.80,
    "idade": 25,
    "gerarTreino": true
  }'
```

## 🔧 Configurações

### Variáveis de Ambiente
```bash
PORT=3006  # Porta do servidor (padrão: 3006)
```

### Personalização de Exercícios
Os exercícios podem ser personalizados editando o arquivo `data/exercicios.js`:
- Adicionar novos exercícios
- Modificar configurações de treino
- Ajustar durações por nível
- **🆕 Configurar treinos baseados no IMC**

## 📊 Dados em Memória

⚠️ **Importante**: Esta API armazena todos os dados em memória (variáveis JavaScript). Os dados são **perdidos** a cada reinicialização do servidor.

**Dados Armazenados:**
- 📋 Lista completa de exercícios
- ⚙️ Configurações de treino por objetivo
- ⏰ Durações de treino por nível
- 🆕 **Configurações de treino baseadas no IMC**
- 🆕 **Durações de treino adaptadas ao IMC**
- 🎯 Treinos gerados (apenas durante a sessão)

## 🧪 Testando a API

### 1. **Swagger UI**
Acesse http://localhost:3006/api-docs para:
- 📖 Visualizar toda a documentação
- 🧪 Testar endpoints diretamente
- 📋 Ver schemas e modelos de dados
- 🆕 **Testar novos endpoints com nome obrigatório**

### 2. **Postman/Insomnia**
Importe os endpoints para testar com ferramentas externas.

### 3. **cURL**
Use os exemplos fornecidos acima para testes via linha de comando.

## 🚨 Limitações

- **Sem Persistência**: Dados são perdidos ao reiniciar
- **Sem Autenticação**: API pública para estudos
- **Sem Validação Avançada**: Validações básicas implementadas
- **Sem Rate Limiting**: Sem limite de requisições

## 🔮 Melhorias Futuras

- 💾 **Banco de Dados**: Persistência de dados
- 🔐 **Autenticação**: Sistema de usuários
- 📱 **Mobile App**: Aplicativo móvel
- 🎯 **Histórico**: Rastreamento de progresso
- 📊 **Analytics**: Métricas de uso
- 🏋️‍♀️ **Vídeos**: Demonstrações em vídeo dos exercícios
- 🆕 **Perfis de Usuário**: Salvar preferências e histórico

## 👨‍💻 Desenvolvimento

### Scripts Disponíveis
```bash
npm start      # Inicia o servidor
npm run dev    # Modo desenvolvimento com nodemon
npm test       # Executa testes (não implementado)
```

### Estrutura de Código
- **Modular**: Rotas organizadas por funcionalidade
- **Documentado**: Swagger integrado em todas as rotas
- **Validado**: Validação de entrada em todos os endpoints
- **Tratamento de Erros**: Middleware de erro global
- **🆕 Validação de Nome**: Nome do usuário obrigatório e validado

## 📝 Licença

Este projeto é desenvolvido para **estudos de teste de software** e não deve ser usado em produção.

## 🤝 Contribuição

Para estudos e testes, sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir melhorias
- 🔧 Fazer modificações
- 📚 Adicionar documentação

## 📞 Suporte

Para dúvidas sobre a implementação ou funcionalidades:
- 📧 Abra uma issue no repositório
- 📖 Consulte a documentação Swagger
- 🔍 Verifique os logs do servidor

---

**🏋️‍♂️ Divirta-se testando e desenvolvendo com esta API atualizada! 💪** 
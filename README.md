# 🏋️‍♂️ Gerador de Treinos Personalizados API

> **API REST completa para geração de treinos personalizados e cálculo de IMC com recomendações de exercícios**

## 📋 Descrição

Esta API foi desenvolvida para estudos de teste de software e oferece funcionalidades completas para:

- 🎯 **Geração de Treinos Personalizados**: Cria treinos baseados em nome do usuário, objetivo, nível e duração
- 📊 **Calculadora de IMC**: Calcula o Índice de Massa Corporal com recomendações personalizadas
- 🆕 **Treinos Baseados no IMC**: Gera treinos personalizados automaticamente baseados no resultado do IMC
- 💪 **Recomendações de Exercícios**: Sugere exercícios adequados ao perfil do usuário
- 🔄 **Exercícios Aleatórios**: Sorteia exercícios diferentes a cada sessão de treino
- 👤 **Identificação do Usuário**: Nome obrigatório para personalização dos treinos

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

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-origin resource sharing
- **Helmet** - Segurança HTTP

## 📁 Estrutura do Projeto

```
gerador-treinos-api/
├── 📁 data/
│   └── 📄 exercicios.js          # Banco de exercícios e configurações por IMC
├── 📁 routes/
│   ├── 📄 treinos.js             # Rotas para geração de treinos
│   └── 📄 imc.js                 # Rotas para cálculo de IMC
├── 📄 server.js                   # Servidor principal
├── 📄 package.json                # Dependências e scripts
├── 📄 README.md                   # Este arquivo
└── 📄 exemplos-uso.md             # Exemplos práticos de uso
```

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### 2. Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd gerador-treinos-api

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
- 🌐 **API**: http://localhost:3006
- 📚 **Swagger**: http://localhost:3006/api-docs
- 🏠 **Rota Raiz**: http://localhost:3006

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
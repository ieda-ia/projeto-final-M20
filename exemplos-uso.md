# 🧪 Exemplos de Uso da API

## 🚀 Testando a API

### 1. **Verificar Status da API**
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

### 2. **Listar Todos os Exercícios**
```bash
curl http://localhost:3006/api/treinos/exercicios
```

### 3. **Ver Configurações de Treino**
```bash
curl http://localhost:3006/api/treinos/configuracoes
```

## 🎯 Gerando Treinos Personalizados

### **Exemplo 1: Treino para Emagrecer (Iniciante)**
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

### **Exemplo 2: Treino para Ganhar Massa (Intermediário)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Maria Santos",
    "objetivo": "ganharMassa",
    "nivel": "intermediario"
  }'
```

### **Exemplo 3: Treino para Condicionamento (Avançado)**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Pedro Costa",
    "objetivo": "condicionamento",
    "nivel": "avancado"
  }'
```

## 🆕 **NOVA FUNCIONALIDADE: Gerar Treino Baseado no IMC**

### **Exemplo 1: Gerar Treino por IMC (com treino personalizado)**
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

## 📊 Calculando IMC

### **Exemplo 1: IMC Básico (sem gerar treino)**
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

### **Exemplo 2: IMC com Geração de Treino Personalizado**
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

### **Exemplo 3: Pessoa com Baixo Peso**
```bash
curl -X POST http://localhost:3006/api/imc/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Lucas Mendes",
    "peso": 55,
    "altura": 1.80,
    "idade": 25,
    "gerarTreino": true
  }'
```

## 📋 Verificando Classificações de IMC

```bash
curl http://localhost:3006/api/imc/classificacoes
```

## 🌐 Acessando a Documentação Swagger

Abra seu navegador e acesse:
**http://localhost:3006/api-docs**

## 🧪 Testando com Diferentes Níveis

### **Teste de Validação - Nome do Usuário Faltando**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "objetivo": "emagrecer",
    "nivel": "iniciante"
  }'
```

**Resposta esperada (erro 400):**
```json
{
  "error": "❌ Parâmetros obrigatórios",
  "message": "Nome do usuário, objetivo e nível são obrigatórios"
}
```

### **Teste de Validação - Nome do Usuário Inválido**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "A",
    "objetivo": "emagrecer",
    "nivel": "iniciante"
  }'
```

**Resposta esperada (erro 400):**
```json
{
  "error": "❌ Nome do usuário inválido",
  "message": "Nome deve ter entre 2 e 50 caracteres"
}
```

### **Teste de Validação - Objetivo Inválido**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "João Silva",
    "objetivo": "invalid",
    "nivel": "iniciante"
  }'
```

### **Teste de Validação - Nível Inválido**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "João Silva",
    "objetivo": "emagrecer",
    "nivel": "expert"
  }'
```

## 🔄 Testando Exercícios Aleatórios

Execute o mesmo comando várias vezes para ver exercícios diferentes:

```bash
# Execute este comando 3 vezes para ver exercícios diferentes
curl -X POST http://localhost:3006/api/treinos/gerar \
  -H "Content-Type: application/json" \
  -d '{"nomeUsuario": "Teste Usuário", "objetivo": "condicionamento", "nivel": "intermediario"}'
```

## 🆕 **Testando Treinos Baseados no IMC**

### **Teste com Diferentes Classificações de IMC**

#### **Abaixo do Peso**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Usuário Abaixo Peso",
    "peso": 50,
    "altura": 1.75,
    "idade": 25
  }'
```

#### **Peso Normal**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Usuário Peso Normal",
    "peso": 70,
    "altura": 1.75,
    "idade": 30
  }'
```

#### **Sobrepeso**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Usuário Sobrepeso",
    "peso": 85,
    "altura": 1.70,
    "idade": 35
  }'
```

#### **Obesidade Grau I**
```bash
curl -X POST http://localhost:3006/api/treinos/gerar-por-imc \
  -H "Content-Type: application/json" \
  -d '{
    "nomeUsuario": "Usuário Obesidade I",
    "peso": 95,
    "altura": 1.70,
    "idade": 40
  }'
```

## 📱 Testando com Postman/Insomnia

1. **Importe as URLs:**
   - Base URL: `http://localhost:3006`
   - Treinos: `http://localhost:3006/api/treinos`
   - IMC: `http://localhost:3006/api/imc`

2. **Configure os headers:**
   - `Content-Type: application/json`

3. **Teste os endpoints POST com os bodies dos exemplos acima**

## 🚨 Testando Tratamento de Erros

### **Rota Não Encontrada**
```bash
curl http://localhost:3006/rota-inexistente
```

### **Método HTTP Inválido**
```bash
curl -X PUT http://localhost:3006/api/treinos/gerar
```

## 📊 Monitorando a API

### **Verificar Logs do Servidor**
```bash
# Em outro terminal, monitore os logs
npm run dev
```

### **Verificar Status da Porta**
```bash
lsof -i :3006
```

## 🔍 **Novos Endpoints Disponíveis**

### **1. Gerar Treino Personalizado (com nome obrigatório)**
- **POST** `/api/treinos/gerar`
- **Body obrigatório**: `nomeUsuario`, `objetivo`, `nivel`

### **2. Gerar Treino Baseado no IMC**
- **POST** `/api/treinos/gerar-por-imc`
- **Body obrigatório**: `nomeUsuario`, `peso`, `altura`, `idade`

### **3. Calcular IMC com Opção de Gerar Treino**
- **POST** `/api/imc/calcular`
- **Body obrigatório**: `nomeUsuario`, `peso`, `altura`, `idade`
- **Body opcional**: `gerarTreino: true` (para gerar treino baseado no resultado)

## ⚠️ **Validações Implementadas**

- ✅ **Nome do usuário obrigatório** em todos os endpoints
- ✅ **Validação de tamanho do nome**: 2-50 caracteres
- ✅ **Validação de parâmetros** do IMC
- ✅ **Validação de objetivo e nível** para treinos
- ✅ **Tratamento de erros** para todos os casos

---

**🏋️‍♂️ Divirta-se testando todos os endpoints da API atualizada! 💪** 
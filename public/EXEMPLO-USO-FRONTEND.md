# 🚀 Exemplo de Uso - Frontend Gerador de Treinos

Este documento demonstra como usar a SPA **Gerador de Treinos Personalizados** com exemplos práticos.

## 🎯 Cenário 1: Gerando um Treino Básico

### Passo a Passo:
1. **Abra a aplicação** no navegador (`index.html`)
2. **Navegue para a seção "Gerador de Treino"**
3. **Preencha o formulário**:
   - **Objetivo**: "Emagrecer"
   - **Nível**: "Iniciante"
   - **Duração**: "45 minutos"
4. **Clique em "Gerar Treino"**

### Resultado Esperado:
- Loading será exibido
- Treino personalizado aparecerá com exercícios organizados por categoria
- Cada exercício mostrará:
  - Emoji/imagem representativa
  - Nome e descrição
  - Instruções de execução
  - Séries, repetições, duração e calorias

### Exemplo de Dados:
```json
{
  "nomeUsuario": "Usuário",
  "objetivo": "emagrecer",
  "nivel": "iniciante",
  "exercicios": [
    {
      "categoria": "Cardio",
      "exercicios": [
        {
          "nome": "Caminhada",
          "descricao": "Caminhada em ritmo moderado",
          "duracao": "20-30 minutos",
          "calorias": "150-200",
          "imagem": "🚶‍♂️"
        }
      ]
    }
  ]
}
```

## 🧮 Cenário 2: Calculando IMC e Recebendo Recomendações

### Passo a Passo:
1. **Navegue para a seção "Calculadora IMC"**
2. **Preencha o formulário**:
   - **Peso**: 70 kg
   - **Altura**: 1.70 m
   - **Idade**: 25 anos
   - **Nome**: "João Silva" (opcional)
3. **Clique em "Calcular IMC"**

### Resultado Esperado:
- IMC calculado: **24.2**
- Classificação: **Peso normal**
- Status: **Saudável**
- Recomendações personalizadas aparecerão
- Botão "Gerar Treino Personalizado" será exibido

### Exemplo de Dados:
```json
{
  "nomeUsuario": "João Silva",
  "imc": 24.2,
  "classificacao": "Peso normal",
  "status": "Saudável",
  "recomendacoes": [
    "Mantenha uma rotina regular de exercícios",
    "Combine cardio e treino de força",
    "Foque na manutenção do peso atual"
  ]
}
```

## 🏋️‍♂️ Cenário 3: Gerando Treino Baseado no IMC

### Passo a Passo:
1. **Após calcular o IMC**, clique em **"Gerar Treino Personalizado"**
2. **Aguarde o processamento**
3. **Visualize o treino personalizado**

### Resultado Esperado:
- Treino específico baseado no resultado do IMC
- Exercícios adaptados ao status de saúde
- Recomendações de intensidade e volume
- Organização por categorias de exercício

## 📱 Testando Responsividade

### Desktop (1200px+):
- Layout em 3 colunas para formulários
- Cards lado a lado
- Navegação horizontal completa

### Tablet (768px - 1199px):
- Layout em 2 colunas
- Cards empilhados
- Navegação adaptada

### Mobile (< 768px):
- Layout em 1 coluna
- Botões em largura total
- Navegação mobile-friendly

## 🔍 Testando Validações

### Campos Obrigatórios:
1. **Tente enviar formulários vazios**
2. **Verifique mensagens de erro**
3. **Confirme que campos obrigatórios são destacados**

### Validação de Valores:
1. **Peso**: Teste valores fora do range (20-300 kg)
2. **Altura**: Teste valores fora do range (0.5-3.0 m)
3. **Idade**: Teste valores fora do range (10-100 anos)

### Exemplo de Erro:
```json
{
  "error": "Dados inválidos",
  "message": "Peso deve estar entre 20 e 300 kg"
}
```

## 🧪 Testando com Cypress

### Estrutura de IDs para Automação:
```javascript
// Formulários
cy.get('#geradorTreinoForm')
cy.get('#calculadoraIMCForm')

// Campos
cy.get('#objetivoSelect').select('emagrecer')
cy.get('#nivelSelect').select('iniciante')
cy.get('#pesoInput').type('70')
cy.get('#alturaInput').type('1.70')

// Botões
cy.get('#gerarTreinoButton').click()
cy.get('#calcularIMCButton').click()

// Resultados
cy.get('#resultadoTreino').should('be.visible')
cy.get('#resultadoIMC').should('be.visible')
```

## 🐛 Testando Tratamento de Erros

### Cenários de Erro:
1. **Backend offline**: Teste com servidor parado
2. **Dados inválidos**: Envie valores incorretos
3. **Timeout**: Simule lentidão na rede
4. **Erro 500**: Simule erro interno do servidor

### Mensagens de Erro Esperadas:
- "Erro ao gerar treino: Erro na API: 500"
- "Por favor, preencha todos os campos obrigatórios"
- "Peso deve estar entre 20 e 300 kg"

## 📊 Testando Performance

### Métricas a Verificar:
1. **Tempo de carregamento inicial**: < 3 segundos
2. **Tempo de resposta da API**: < 2 segundos
3. **Transições suaves**: Animações CSS fluidas
4. **Responsividade**: Adaptação rápida a mudanças de tela

### Ferramentas de Teste:
- **Chrome DevTools**: Performance tab
- **Lighthouse**: Análise de performance
- **Network tab**: Monitoramento de requisições

## 🎨 Testando Design

### Verificações Visuais:
1. **Cores consistentes** com o design system
2. **Tipografia legível** em todas as telas
3. **Espaçamento adequado** entre elementos
4. **Sombras e bordas** aplicadas corretamente
5. **Ícones Material Design** exibidos adequadamente

### Estados de UI:
1. **Hover effects** nos botões
2. **Focus states** nos campos de formulário
3. **Loading spinners** durante requisições
4. **Mensagens de feedback** (erro/sucesso)

## 🔧 Testando Integração com API

### Endpoints Testados:
```bash
# Gerar treino
POST http://localhost:3006/api/treinos/gerar
{
  "nomeUsuario": "Teste",
  "objetivo": "emagrecer",
  "nivel": "iniciante"
}

# Calcular IMC
POST http://localhost:3006/api/imc/calcular
{
  "nomeUsuario": "Teste",
  "peso": 70,
  "altura": 1.70,
  "idade": 25,
  "gerarTreino": false
}
```

### Respostas Esperadas:
- **Status 200** para sucesso
- **JSON válido** com dados estruturados
- **Headers corretos** (Content-Type: application/json)
- **CORS habilitado** para requisições locais

## 📝 Checklist de Testes

### ✅ Funcionalidades Básicas:
- [ ] Formulário de geração de treino funciona
- [ ] Formulário de cálculo de IMC funciona
- [ ] Treinos são exibidos corretamente
- [ ] Resultados de IMC são calculados
- [ ] Recomendações são exibidas

### ✅ Validações:
- [ ] Campos obrigatórios são validados
- [ ] Valores numéricos são validados
- [ ] Mensagens de erro são exibidas
- [ ] Formulários não são enviados com dados inválidos

### ✅ Responsividade:
- [ ] Layout funciona em desktop
- [ ] Layout funciona em tablet
- [ ] Layout funciona em mobile
- [ ] Navegação é adaptativa

### ✅ Tratamento de Erros:
- [ ] Erros de API são tratados
- [ ] Mensagens de erro são claras
- [ ] Loading states funcionam
- [ ] Fallbacks são aplicados

### ✅ Performance:
- [ ] Carregamento inicial é rápido
- [ ] Animações são fluidas
- [ ] Requisições são otimizadas
- [ ] Interface é responsiva

## 🎯 Dicas para Testes Eficientes

1. **Teste em diferentes navegadores**: Chrome, Firefox, Safari, Edge
2. **Teste em diferentes dispositivos**: Desktop, tablet, mobile
3. **Teste com dados extremos**: Valores mínimos e máximos
4. **Teste cenários de erro**: Backend offline, dados inválidos
5. **Teste acessibilidade**: Navegação por teclado, leitores de tela
6. **Teste performance**: Carregamento, responsividade, animações

---

**Use este guia para testar todas as funcionalidades da SPA e garantir uma experiência de usuário excepcional! 🚀** 
# 🏋️‍♂️ Frontend - Gerador de Treinos Personalizados

Este é o frontend da aplicação **Gerador de Treinos Personalizados**, uma Single Page Application (SPA) desenvolvida com HTML, CSS e JavaScript puro, utilizando o framework MaterializeCSS para o design.

## 📋 Funcionalidades

### 🎯 Gerador de Treino
- Formulário para seleção de objetivo (emagrecer, ganhar massa, melhorar condicionamento)
- Seleção de nível de dificuldade (iniciante, intermediário, avançado)
- Escolha da duração do treino (30, 45, 60, 90 minutos)
- Geração automática de treinos personalizados via API
- Exibição organizada dos exercícios por categoria

### 🧮 Calculadora de IMC e Recomendações
- Cálculo automático do Índice de Massa Corporal
- Classificação do IMC com status de saúde
- Recomendações personalizadas baseadas no resultado
- Geração de treinos específicos baseados no IMC
- Campo opcional para nome do usuário

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilos personalizados e responsivos
- **JavaScript (ES6+)**: Lógica da aplicação e interação com API
- **MaterializeCSS**: Framework de design responsivo
- **Google Fonts**: Tipografia Roboto
- **Material Icons**: Ícones da interface

## 📁 Estrutura de Arquivos

```
projeto-final-M20/
├── index.html          # Arquivo HTML principal da SPA
├── styles.css          # Estilos CSS personalizados
├── script.js           # Lógica JavaScript da aplicação
├── README-FRONTEND.md  # Esta documentação
└── ...                 # Outros arquivos do projeto
```

## 🚀 Como Executar

### Pré-requisitos
1. **Backend da API**: Certifique-se de que o backend está rodando na porta 3006
2. **Navegador moderno**: Chrome, Firefox, Safari ou Edge atualizado

### Passos para Execução

1. **Iniciar o Backend**:
   ```bash
   cd /caminho/para/projeto-final-M2
   npm start
   ```
   O backend deve estar rodando em `http://localhost:3006`

2. **Abrir o Frontend**:
   - Abra o arquivo `index.html` em seu navegador
   - Ou use um servidor local simples:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (se tiver http-server instalado)
   npx http-server -p 8000
   ```

3. **Acessar a Aplicação**:
   - Frontend: `http://localhost:8000` (ou arquivo local)
   - Backend: `http://localhost:3006`
   - Documentação API: `http://localhost:3006/api-docs`

## 🔧 Configuração da API

A aplicação está configurada para se conectar com a API no endereço `http://localhost:3006`. Se precisar alterar este endereço, edite a constante `API_BASE_URL` no arquivo `script.js`:

```javascript
const API_BASE_URL = 'http://localhost:3006/api';
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- **Desktop**: Telas grandes com layout otimizado
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para dispositivos móveis

## 🎨 Design System

### Cores Principais
- **Azul Principal**: `#1976d2` (MaterializeCSS Blue)
- **Verde**: `#4caf50` (MaterializeCSS Green)
- **Vermelho**: `#f44336` (MaterializeCSS Red)
- **Cinza**: `#f5f5f5` (Background)

### Componentes
- **Navbar**: Navegação principal com gradiente azul
- **Cards**: Painéis com sombras e bordas arredondadas
- **Botões**: Estilo Material Design com efeitos hover
- **Formulários**: Campos com validação e feedback visual

## 🔍 IDs para Automação de Testes

Todos os elementos interativos possuem IDs únicos e descritivos para facilitar a automação com Cypress:

### Formulários
- `geradorTreinoForm` - Formulário principal de geração de treinos
- `calculadoraIMCForm` - Formulário da calculadora de IMC

### Campos de Entrada
- `objetivoSelect` - Seleção do objetivo do treino
- `nivelSelect` - Seleção do nível de dificuldade
- `duracaoSelect` - Seleção da duração do treino
- `pesoInput` - Campo de peso
- `alturaInput` - Campo de altura
- `idadeInput` - Campo de idade
- `nomeInput` - Campo de nome (opcional)

### Botões
- `gerarTreinoButton` - Botão para gerar treino
- `calcularIMCButton` - Botão para calcular IMC
- `gerarTreinoIMCButton` - Botão para gerar treino baseado no IMC

### Resultados
- `resultadoTreino` - Container do resultado do treino
- `resultadoIMC` - Container do resultado do IMC
- `treinoIMC` - Container do treino baseado no IMC
- `listaExercicios` - Lista de exercícios do treino
- `listaExerciciosIMC` - Lista de exercícios do treino baseado no IMC

## 📊 Funcionalidades da API

### Endpoints Utilizados
- `POST /api/treinos/gerar` - Gera treino personalizado
- `POST /api/imc/calcular` - Calcula IMC e fornece recomendações

### Dados de Entrada
- **Treino**: objetivo, nível, duração
- **IMC**: peso, altura, idade, nome (opcional)

### Dados de Saída
- **Treino**: lista de exercícios organizados por categoria
- **IMC**: valor calculado, classificação, status e recomendações

## 🎯 Fluxo de Uso

### 1. Geração de Treino
1. Usuário seleciona objetivo, nível e duração
2. Clica em "Gerar Treino"
3. Sistema faz requisição para a API
4. Resultado é exibido com exercícios organizados por categoria

### 2. Cálculo de IMC
1. Usuário insere peso, altura e idade
2. Clica em "Calcular IMC"
3. Sistema calcula e exibe resultado com recomendações
4. Botão "Gerar Treino Personalizado" aparece

### 3. Treino Baseado no IMC
1. Usuário clica em "Gerar Treino Personalizado"
2. Sistema gera treino específico baseado no resultado do IMC
3. Treino é exibido com exercícios personalizados

## 🐛 Tratamento de Erros

A aplicação inclui tratamento robusto de erros:
- **Validação de formulários**: Campos obrigatórios e valores válidos
- **Erros de API**: Mensagens claras para problemas de conexão
- **Feedback visual**: Indicadores de loading e mensagens de erro/sucesso
- **Fallbacks**: Valores padrão e tratamento de dados ausentes

## 🔧 Personalização

### Estilos CSS
- Arquivo `styles.css` com estilos personalizados
- Fácil modificação de cores, fontes e layout
- Sistema de variáveis CSS para consistência

### JavaScript
- Código modular e bem documentado
- Funções reutilizáveis para manipulação do DOM
- Sistema de eventos centralizado

## 📈 Performance

- **Carregamento otimizado**: CDNs para bibliotecas externas
- **Lazy loading**: Componentes carregados sob demanda
- **Animações CSS**: Transições suaves sem impacto na performance
- **Responsividade**: Layout adaptativo para diferentes dispositivos

## 🧪 Testes

A aplicação está preparada para testes automatizados:
- IDs únicos para todos os elementos interativos
- Estrutura HTML semântica e consistente
- Funções JavaScript testáveis e isoladas
- Estados de UI claramente definidos

## 🤝 Contribuição

Para contribuir com o frontend:
1. Mantenha a estrutura de IDs para automação
2. Use as cores e componentes do design system
3. Documente novas funcionalidades
4. Teste em diferentes dispositivos e navegadores

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique se o backend está rodando
- Confirme a configuração da URL da API
- Verifique o console do navegador para erros
- Consulte a documentação da API em `/api-docs`

---

**Desenvolvido com ❤️ usando MaterializeCSS e JavaScript puro** 
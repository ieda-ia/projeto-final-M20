# 🌐 Frontend - Pasta Public

Esta pasta contém todos os arquivos do frontend da aplicação **Gerador de Treinos Personalizados**.

## 📁 Estrutura da Pasta

```
public/
├── index.html                    # Página principal da SPA
├── styles.css                    # Estilos CSS personalizados
├── script.js                     # Lógica JavaScript da aplicação
├── config.js                     # Configurações centralizadas
├── README.md                     # Esta documentação
├── README-FRONTEND.md            # Documentação técnica completa
└── EXEMPLO-USO-FRONTEND.md      # Guia de uso e testes
```

## 🚀 Como Acessar

### Desenvolvimento Local
- **Frontend**: `http://localhost:3006/`
- **API**: `http://localhost:3006/api`
- **Documentação**: `http://localhost:3006/api-docs`

### Rotas Disponíveis
- `/` - Frontend principal (SPA)
- `/app` - Alternativa para acessar o frontend
- `/api/*` - Endpoints da API
- `/api-docs` - Documentação Swagger

## 🔧 Configuração

O servidor Express está configurado para:
1. **Servir arquivos estáticos** da pasta `public`
2. **Rota raiz** (`/`) serve o `index.html`
3. **Rotas da API** (`/api/*`) funcionam normalmente
4. **SPA routing** - rotas não encontradas servem o frontend

## 📱 Funcionalidades

### ✅ Gerador de Treino
- Formulário para seleção de objetivo, nível e duração
- Geração automática via API
- Exibição organizada dos exercícios

### ✅ Calculadora de IMC
- Cálculo automático do IMC
- Recomendações personalizadas
- Geração de treinos baseados no resultado

## 🎨 Design

- **MaterializeCSS** para componentes
- **Responsivo** para todos os dispositivos
- **Animações CSS** suaves
- **Ícones Material Design**

## 🧪 Testes

Todos os elementos possuem IDs únicos para automação:
- Formulários: `geradorTreinoForm`, `calculadoraIMCForm`
- Campos: `objetivoSelect`, `pesoInput`, etc.
- Botões: `gerarTreinoButton`, `calcularIMCButton`
- Resultados: `resultadoTreino`, `resultadoIMC`

## 📊 Integração com API

- **Base URL**: `http://localhost:3006/api`
- **Endpoints**: `/treinos/gerar`, `/imc/calcular`
- **CORS**: Habilitado para desenvolvimento local

## 🔄 Atualizações

Para modificar o frontend:
1. Edite os arquivos na pasta `public/`
2. Reinicie o servidor se necessário
3. Acesse `http://localhost:3006/` para ver as mudanças

---

**Frontend organizado e servido pelo Express! 🚀** 
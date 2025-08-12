const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gerador de Treinos Personalizados API',
      version: '1.0.0',
      description: 'API para gerar treinos personalizados e calcular IMC com recomendações de exercícios',
      contact: {
        name: 'Estudante de Teste de Software'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rotas
const treinosRoutes = require('./routes/treinos');
const imcRoutes = require('./routes/imc');

app.use('/api/treinos', treinosRoutes);
app.use('/api/imc', imcRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz - Frontend da aplicação
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para o frontend (SPA)
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota da API (mantida para compatibilidade)
app.get('/api', (req, res) => {
  res.json({
    message: '🏋️‍♂️ Bem-vindo à API de Gerador de Treinos Personalizados!',
    endpoints: {
      treinos: '/api/treinos',
      imc: '/api/imc',
      documentacao: '/api-docs'
    },
    frontend: '/',
    status: '✅ API funcionando perfeitamente!'
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '❌ Erro interno do servidor',
    message: err.message
  });
});

// Rota 404 - Para rotas da API, retorna JSON; para outras, serve o frontend
app.use('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({
      error: '❌ Rota não encontrada',
      message: 'A rota solicitada não existe nesta API'
    });
  } else {
    // Para rotas não-API, serve o frontend (SPA)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🏠 API disponível em: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend disponível em: http://localhost:${PORT}`);
});

module.exports = app; 
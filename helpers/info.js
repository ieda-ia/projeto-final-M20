const request = require('supertest')
require('dotenv').config()
//const postIMC = require('../fixtures/postIMC.json')

const preencherFormularioIMC = async(nome, peso, altura, idade, treino) =>{
    //const bodyIMC = { ...postIMC }
    const resposta = await request(process.env.API_BASE_URL)        
        .post('/api/imc/calcular')
        .set('Content-Type', 'application/json')
        .send({
                'nomeUsuario': nome,
                'peso': peso,
                'altura': altura,
                'idade': idade,
                'gerarTreino': treino
            })
    return resposta     
}

const preencherFormularioTreino = async(nome, objetivo, nivel, duracao) =>{
    const resposta = await request(process.env.API_BASE_URL)
                    .post('/api/treinos/gerar')
                    .set('Content-Type', 'application/json')
                    .send({
                        'nomeUsuario': nome,
                        'objetivo': objetivo,
                        'nivel': nivel,
                        'duracao': duracao 
                    })
    return resposta     
}

module.exports = {
    preencherFormularioIMC, preencherFormularioTreino
}

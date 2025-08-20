const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const{ preencherFormularioIMC } = require('../helpers/info')  
//const postIMC = require('../fixtures/postIMC.json')


describe('IMC API', () => {
    describe('POST /api/imc/calcular', () => {        
        it('Deve retornar status 200, calcular o IMC corretamente e gerar recomendações', async () => {
            //const bodyIMC = { ...postIMC }
            const resposta = await preencherFormularioIMC('João Silva', 70, 1.75, 25, false)         
            
            expect(resposta.status).to.equal(200)
            expect(resposta.body.message).to.be.equal('✅ IMC calculado com sucesso!')
            expect(resposta.body.resultadoIMC).to.have.property('imc')
            expect(resposta.body.resultadoIMC).to.have.property('imc', 22.86)
            expect(resposta.body.resultadoIMC).to.have.property('classificacao','Peso normal')
            expect(resposta.body.resultadoIMC).to.have.property('recomendacoes')
            
        })

        it('Deve validar que o nome é opcional se a propriedade gerar treino for false', async () => {
            const resposta = await preencherFormularioIMC('João Silva', 70, 1.75, 25, false)
                
            expect(resposta.status).to.equal(200)
            expect(resposta.body.message).to.be.equal('✅ IMC calculado com sucesso!')
            expect(resposta.body).to.not.have.property('treino')
            
        })

        it('Deve retornar status code 400 ao validar que o nome é obrigatório se a propriedade gerar treino for true', async () => {
            const resposta = await preencherFormularioIMC('', 70, 1.75, 25, true)
                
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('success', false)
            expect(resposta.body.message).to.be.equal('Nome do usuário é obrigatório para gerar treino personalizado e deve ter entre 2 e 50 caracteres.')
       
        })

        it('Deve retornar status code 400 ao validar que o peso, a altura e a idade são obrigatórios', async () => {
            const resposta = await preencherFormularioIMC(' ', null, null, null, false)
                
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', '❌ Erro de validação')
            expect(resposta.body.message).to.be.equal('Os seguintes campos são obrigatórios ou inválidos: peso, altura, idade.')

        })

        it('Deve retornar status 200 ao informar o nome e a propriedade gerar treino for true', async () => {
            const resposta = await preencherFormularioIMC('João Silva', 70, 1.75, 25, true)          
                                  
            expect(resposta.status).to.equal(200)
            expect(resposta.body.message).to.be.equal('🎯 IMC calculado e treino personalizado gerado para João Silva!')
            expect(resposta.body).to.have.property('treino')

        })

        it('Deve validar o treino personalizado com base no IMC', async () => {
            const resposta = await preencherFormularioIMC('João Silva', 70, 1.75, 25, true)
                
            expect(resposta.status).to.equal(200)
            expect(resposta.body.treino).to.have.property('id')
            expect(resposta.body.treino.nomeUsuario).to.be.equal('João Silva')
            expect(resposta.body.treino).to.have.property('objetivo', 'condicionamento')
            expect(resposta.body.treino).to.have.property('nivel', 'intermediario')
            expect(resposta.body.treino).to.have.property('classificacaoIMC', 'Peso normal')
            expect(resposta.body.treino).to.have.property('duracaoTotal')
            expect(resposta.body.treino.exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino).to.have.property('dataCriacao')
            expect(resposta.body.treino).to.have.property('observacao', 'Treino personalizado baseado no IMC: Peso normal')

        })
    })

})

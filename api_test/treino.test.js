const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const{ preencherFormularioTreino } = require('../helpers/info')  
 

describe('IMC API', () => {
    describe('POST /api/treinos/gerar', () => {
            it('Deve retornar status code 400 se o nome do usuário não for preenchido', async () => {
            const resposta = await preencherFormularioTreino('', 'emagrecer', 'iniciante', 30)
                
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', '❌ Parâmetros obrigatórios')
            expect(resposta.body.message).to.be.equal('Nome do usuário, objetivo e nível são obrigatórios')     
            
                
        })  
         it('Deve retornar status code 400 se o objetivo do usuário não for preenchido', async () => {
            const resposta = await preencherFormularioTreino('João Silva', '', 'iniciante', 30)
                
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', '❌ Parâmetros obrigatórios')
            expect(resposta.body.message).to.be.equal('Nome do usuário, objetivo e nível são obrigatórios')     
               
        })   
         it('Deve retornar status code 400 se o nível do usuário não for preenchido', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', '', 30)
                
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', '❌ Parâmetros obrigatórios')
            expect(resposta.body.message).to.be.equal('Nome do usuário, objetivo e nível são obrigatórios')     
                
        })  
         it('Deve retornar status code 400 se a duração do treino não for preenchido', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 0)
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', '❌ Duração inválida')
            expect(resposta.body.message).to.be.equal('Duração deve ser: 30, 45, 60 ou 90')     
              
        }) 
        it('Deve retornar status code 200 ao gerar treino personalizado', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 30)
                
            expect(resposta.status).to.equal(200)
            expect(resposta.body).to.have.property('success', true)
            expect(resposta.body.message).to.be.equal('🎯 Treino gerado com sucesso para João Silva!')     
                
        }) 
        it('Deve validar o treino personalizado ', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 30)
           
            expect(resposta.body).to.have.property('treino')
            expect(resposta.body.treino).to.have.property('id')
            expect(resposta.body.treino).to.have.property('nomeUsuario', 'João Silva')
            expect(resposta.body.treino).to.have.property('objetivo', 'emagrecer')
            expect(resposta.body.treino).to.have.property('nivel', 'iniciante')
            expect(resposta.body.treino).to.have.property('duracaoTotal')
            expect(resposta.body.treino).to.have.property('exercicios')
            expect(resposta.body.treino.exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino.exercicios[0]).to.have.property('categoria', 'Cardio')
           
        })  
        it('Deve validar as categorias dos exercícios gerados no treino personalizado ', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 45)
           
            expect(resposta.body.treino.exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino.exercicios[0]).to.have.property('categoria', 'Cardio')
            expect(resposta.body.treino.exercicios[1]).to.have.property('categoria', 'Força')
            expect(resposta.body.treino.exercicios[2]).to.have.property('categoria', 'Flexibilidade')
            expect(resposta.body.treino.exercicios[0].exercicios).to.be.an('array').that.is.not.empty            
                       
        }) 
        it('Deve validar exercícios de cardio gerados no treino personalizado ', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 45)
                       
            expect(resposta.body.treino.exercicios[0]).to.have.property('categoria', 'Cardio')
            expect(resposta.body.treino.exercicios[0].exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('id')
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('nome')
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('descricao')
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('duracao')
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('calorias')
            expect(resposta.body.treino.exercicios[0].exercicios[0]).to.have.property('instrucoes')
                       
        }) 
        it('Deve validar exercícios de força gerados no treino personalizado ', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 45)
                       
            expect(resposta.body.treino.exercicios[1]).to.have.property('categoria', 'Força')
            expect(resposta.body.treino.exercicios[1].exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino.exercicios[1].exercicios[0]).to.have.property('id')
            expect(resposta.body.treino.exercicios[1].exercicios[0]).to.have.property('nome')
            expect(resposta.body.treino.exercicios[1].exercicios[0]).to.have.property('descricao')
            expect(resposta.body.treino.exercicios[1].exercicios[0]).to.have.property('series')           
            expect(
                'repeticoes' in resposta.body.treino.exercicios[1].exercicios[0]||
                'duracao' in resposta.body.treino.exercicios[1].exercicios[0]
                ).to.be.true
            expect(resposta.body.treino.exercicios[1].exercicios[0]).to.have.property('instrucoes')
                       
        }) 
        it('Deve validar exercícios de flexibilidade gerados no treino personalizado ', async () => {
            const resposta = await preencherFormularioTreino('João Silva', 'emagrecer', 'iniciante', 45)
                       
            expect(resposta.body.treino.exercicios[2]).to.have.property('categoria', 'Flexibilidade')
            expect(resposta.body.treino.exercicios[2].exercicios).to.be.an('array').that.is.not.empty
            expect(resposta.body.treino.exercicios[2].exercicios[0]).to.have.property('id')
            expect(resposta.body.treino.exercicios[2].exercicios[0]).to.have.property('nome')
            expect(resposta.body.treino.exercicios[2].exercicios[0]).to.have.property('descricao')
            expect(resposta.body.treino.exercicios[2].exercicios[0]).to.have.property('duracao')
            expect(resposta.body.treino.exercicios[2].exercicios[0]).to.have.property('instrucoes')
                       
        })
    })

})

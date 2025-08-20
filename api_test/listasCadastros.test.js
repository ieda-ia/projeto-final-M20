const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

describe('Listas do casdastros da API', () => {
    describe('GET /api/imc/classificacoes', () => {  
        let resposta
        beforeEach(async() => {
            resposta = await request(process.env.API_BASE_URL)  
                .get('/api/imc/classificacoes') 
        })     
        it('Deve retornar status 200 ao listar as classificações de IMC', () => {                       
            expect(resposta.status).to.equal(200)
                    
         })
         it('Deve retornar sucesso e a mensagem de classificações de IMC', () => {                     
            expect(resposta.body).to.have.property('success', true)
            expect(resposta.body.message).to.be.equal('📋 Classificações de IMC')                    
         })
         it('Deve retornar as classificações de IMC e seu grau', () => {                      
            expect(
                'Abaixo do peso' in resposta.body.classificacoes &&
                'Peso normal' in resposta.body.classificacoes &&
                'Sobrepeso' in resposta.body.classificacoes &&
                'Obesidade Grau I' in resposta.body.classificacoes &&
                'Obesidade Grau II' in resposta.body.classificacoes &&
                'Obesidade Grau III' in resposta.body.classificacoes                 
                ).to.be.true                   
         })
         it('Deve retornar as características para classificação Abaixo do Peso', () => {                      
            expect(resposta.body.classificacoes['Abaixo do peso'].range).to.equal('< 18.5')
            expect(resposta.body.classificacoes['Abaixo do peso'].descricao).to.equal('Peso abaixo do recomendado para a altura')
            expect(resposta.body.classificacoes['Abaixo do peso'].risco).to.equal('Baixo')
            expect(resposta.body.classificacoes['Abaixo do peso'].cor).to.equal('🔵')
            expect(resposta.body.classificacoes['Abaixo do peso'].recomendacao).to.equal('Foque em exercícios de força para ganhar massa muscular')
         })
         it('Deve retornar as características para classificação Peso normal', () => {                      
            expect(resposta.body.classificacoes['Peso normal'].range).to.equal('18.5 - 24.9')
            expect(resposta.body.classificacoes['Peso normal'].descricao).to.equal('Peso saudável para a altura')
            expect(resposta.body.classificacoes['Peso normal'].risco).to.equal('Muito baixo')
            expect(resposta.body.classificacoes['Peso normal'].cor).to.equal('🟢')
            expect(resposta.body.classificacoes['Peso normal'].recomendacao).to.equal('Mantenha uma rotina equilibrada de exercícios')
                        
        })
        it('Deve retornar as características para classificação Sobrepeso', () => {                      
            expect(resposta.body.classificacoes['Sobrepeso'].range).to.equal('25.0 - 29.9')
            expect(resposta.body.classificacoes['Sobrepeso'].descricao).to.equal('Peso acima do recomendado para a altura')
            expect(resposta.body.classificacoes['Sobrepeso'].risco).to.equal('Baixo')
            expect(resposta.body.classificacoes['Sobrepeso'].cor).to.equal('🟡')
            expect(resposta.body.classificacoes['Sobrepeso'].recomendacao).to.equal('Comece com exercícios de baixo impacto e aumente gradualmente')
              
        })       
        it('Deve retornar as características para classificação Obesidade Grau I', () => {                      
            expect(resposta.body.classificacoes['Obesidade Grau I'].range).to.equal('30.0 - 34.9')
            expect(resposta.body.classificacoes['Obesidade Grau I'].descricao).to.equal('Obesidade leve')
            expect(resposta.body.classificacoes['Obesidade Grau I'].risco).to.equal('Moderado')
            expect(resposta.body.classificacoes['Obesidade Grau I'].cor).to.equal('🟠')
            expect(resposta.body.classificacoes['Obesidade Grau I'].recomendacao).to.equal('Foque em exercícios de cardio e consulte um profissional')
            
        })  
        it('Deve retornar as características para classificação Obesidade Grau II', () => {                      
            expect(resposta.body.classificacoes['Obesidade Grau II'].range).to.equal('35.0 - 39.9')
            expect(resposta.body.classificacoes['Obesidade Grau II'].descricao).to.equal('Obesidade moderada')
            expect(resposta.body.classificacoes['Obesidade Grau II'].risco).to.equal('Alto')
            expect(resposta.body.classificacoes['Obesidade Grau II'].cor).to.equal('🔴')
            expect(resposta.body.classificacoes['Obesidade Grau II'].recomendacao).to.equal('Exercícios de baixo impacto e orientação médica obrigatória')
        }) 
        it('Deve retornar as características para classificação Obesidade Grau III', () => {                      
            expect(resposta.body.classificacoes['Obesidade Grau III'].range).to.equal('≥ 40.0')
            expect(resposta.body.classificacoes['Obesidade Grau III'].descricao).to.equal('Obesidade grave')
            expect(resposta.body.classificacoes['Obesidade Grau III'].risco).to.equal('Muito alto')
            expect(resposta.body.classificacoes['Obesidade Grau III'].cor).to.equal('⚫')
            expect(resposta.body.classificacoes['Obesidade Grau III'].recomendacao).to.equal('Sempre consulte um médico antes de iniciar exercícios')
        })           
         
    })
    describe('GET /api/treinos/exercicios', () => {  
        let resposta
        beforeEach(async() => {
            resposta = await request(process.env.API_BASE_URL)  
                .get('/api/treinos/exercicios') 
        })     
        it('Deve retornar status 200 ao listar todos os exercícios disponíveis', () => {                       
            expect(resposta.status).to.equal(200)
                    
        })
        it('Deve retornar sucesso e a mensagem de Exercícios diponíveis', () => {                     
            expect(resposta.body).to.have.property('success', true)
            expect(resposta.body.message).to.be.equal('📋 Exercícios disponíveis')                    
         })
        it('Deve retornar treinos de Cardio, Força e Flexibilidade', () => {                  
            expect(resposta.body.exercicios).to.have.property('cardio')
            expect(resposta.body.exercicios).to.have.property('forca')
            expect(resposta.body.exercicios).to.have.property('flexibilidade')
                              
         })
    })
    describe('GET /api/treinos/configuracoes', () => {  
        let resposta
        beforeEach(async() => {
            resposta = await request(process.env.API_BASE_URL)  
                .get('/api/treinos/configuracoes') 
        })     
        it('Deve retornar status 200 ao listar todos as configurações disponíveis para exercícios e IMC', () => {                       
            expect(resposta.status).to.equal(200)
                    
        })
        it('Deve retornar sucesso e a mensagem de Configurações de treino', () => {                     
            expect(resposta.body).to.have.property('success', true)
            expect(resposta.body.message).to.be.equal('⚙️ Configurações de treino')                    
         })
        it('Deve retornar Configurações de Objetivo do treino', () => {                  
            expect(resposta.body.configuracoes).to.have.property('emagrecer')
            expect(resposta.body.configuracoes).to.have.property('ganharMassa')
            expect(resposta.body.configuracoes).to.have.property('condicionamento')
                              
         })
         it('Deve retornar Configurações de IMC', () => {                  
            expect(resposta.body.configuracoesIMC).to.have.property('Abaixo do peso')
            expect(resposta.body.configuracoesIMC).to.have.property('Peso normal')
            expect(resposta.body.configuracoesIMC).to.have.property('Sobrepeso')
            expect(resposta.body.configuracoesIMC).to.have.property('Obesidade Grau I')
            expect(resposta.body.configuracoesIMC).to.have.property('Obesidade Grau II')
            expect(resposta.body.configuracoesIMC).to.have.property('Obesidade Grau III')
            //expect(resposta.body.treino.exercicios[0].exercicios).to.be.an('array').that.is.not.empty                   
         })
         it('Deve retornar Configurações de duração dos treinos conforme o nível do usuário', () => {                  
            expect(resposta.body.duracoes).to.have.property('iniciante')
            expect(resposta.body.duracoes).to.have.property('intermediario')
            expect(resposta.body.duracoes).to.have.property('avancado')
         })
         it('Deve retornar Configurações de duração dos treinos conforme o nível do IMC do usuário', () => {                  
            expect(resposta.body.duracoesIMC).to.have.property('Abaixo do peso')
            expect(resposta.body.duracoesIMC).to.have.property('Peso normal')
            expect(resposta.body.duracoesIMC).to.have.property('Sobrepeso')
            expect(resposta.body.duracoesIMC).to.have.property('Obesidade Grau I')
            expect(resposta.body.duracoesIMC).to.have.property('Obesidade Grau II')
            expect(resposta.body.duracoesIMC).to.have.property('Obesidade Grau III')
         })
    })
})


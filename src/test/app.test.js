const app = require('../app')
const request = require('supertest')
const model = require ('../models/livroSchema')
const { get } = require('mongoose')

describe('livrosControllers', () => {
    const livroMock ={
        nome: "Livro Teste",
        autor: "Seu Zé",
        Categoria: "Teste"
    }
    beforeAll(async()=>{
        const novoLivro = new model(livroMock)
        await novoLivro.save()
        livroMock.id = novoLivro._id
    })
    test('GET /lista', (done)=>{
        request(app)
        .get('/api/lista')
        .expect(200)
        .expect(res=>{
            expect(res.body.message).toBe("Todos os Livros")
        })
        .end(err=>{
            if(err) return done(err)
            return done()
        })
    })
    test ('POST /novolivro', (done)=>{
        const livroBody={
                "nome": "Livro Teste",
                "autor": "Seu Zé",
                "categoria": "Teste"
        }
        request(app)
        .post('/api/novolivro')
        .send(livroBody)
        .expect(201)
        .expect(res=>{
            expect(res.body.message).toBe("Livro Cadastrado")
        })
        .end(err=>{
            if(err) return done(err)
            return done()
        })
    })
    test('PATCH /editalivro/:id', (done)=>{
        const livroBody2={
            "nome": "Livro Teste volume 2",
            "autor": "Seu Zé de novo"}
        request(app)
        .patch('/api/editalivro/'+livroMock.id)
        .send(livroBody2)
        .expect(200)
        .expect(res=>{
            expect(res.body.message).toBe("Livro Atualizado")
        })
        .end(err=>{
            if(err) return done(err)
            return done()
        })
    })
    test('DELETE /deletalivro/:id', (done)=>{
        request(app)
        .delete('/api/deletalivro/'+livroMock.id)
        .expect(200)
        .expect(res=>{
            expect(res.body.message).toBe("Livro Deletado")
        })
        .end(err=>{
            if(err) return done(err)
            return done()
        })
    })
});
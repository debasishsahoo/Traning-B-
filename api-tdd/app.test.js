const request = require('supertest')
const app = require('./app')

describe('Todos', () => {
    it('GET /todos --> array todo', () => {
        return request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean),
                    })
                ]))
            });
    })

    it('GET /todos/id --> specific todo by ID', () => { })

    it('GET /todos/id --> 404 if not Found', () => { })

    it('POST /todos --> create todo', () => { })

    it('GET /todos --> validates request body', () => { })

    // it('GET /todos --> array todo', () => { })
    // it('GET /todos --> array todo', () => { })
    // it('GET /todos --> array todo', () => { })
    // it('GET /todos --> array todo', () => { })

})
    ;


const app = require('../server')
const router = require('../routes/routes')
const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

function ba(){
    let id = ''
    beforeEach( async () => {
        let data = {
            name: "Test Todo Mocha before each 2",
            body: "Test todo body before each 2"
        };
        const res = await chai.request(app)
            .post('/api/add-todo')
            .send(data)
            id = res.body.todo.id
            console.log('yashyashayshyash', res.body.todo.id)
    });
    afterEach( async () => {
        await chai.request(app)
            .delete('/api/delete-todo/'+id)
    });
}

describe('GET /get-college', () => {
    ba()
    it('Should return college list', async () => {
        const res = await chai.request(app)
            .get('/api/get-todo-list')
        
        assert.equal(res.status, '200')
        assert.typeOf(res.body, 'object')      
    })
})

describe('GET /get-todo/:todoid', () => {
    it('Get single todo', () => {
        chai.request(app)
            .get('/api/get-todo/1')
            .end((err, res) => {
                assert.equal(res.status, '200')
            })
    })
})

describe('POST /add-todo', () => {
    it.skip('Add todo', (done) => {
        let data = {
            name: "Test Todo Mocha",
            body: "Test todo body"
        }
        chai.request(app)
            .post('/api/add-todo')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
                done()
            })
    })
})

describe('PUT /edit-todo-name', () => {
    let data = {
        name: 'Todo Updated Name',
        todoid: '1'
    }
    it('Update todo name', () => {
        chai.request(app)
            .put('/api/edit-todo-name')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
            })
    })
})

describe('PUT /edit-todo-body', () => {
    let data = {
        body: 'Todo Updated Body',
        todoid: '1'
    }
    it('Update todo body', (done) => {
        chai.request(app)
            .put('/api/edit-todo-body')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
                done()
            })
    })
})

describe('DELETE /delete-todo/:todoid', () => {
    it('Delete todo', () => {
        chai.request(app)
            .delete('/api/delete-todo/5')
            .end((err, res) => {
                assert.equal(res.status, '200')
            })
    })
})

describe('PUT /mark-todo', () => {
    let data = {
        done: true,
        todoid: 1
    }
    it('Update todo body', (done) => {
        chai.request(app)
            .put('/api/mark-todo')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
                done()
            })
    })
})

describe('POST /get-todo-pagination', () => {
    let data = {
        page_no: parseInt(1),
        rows: parseInt(3)
    }
    it('Get todo pagination', (done) => {
        chai.request(app)
            .post('/api/get-todo-pagination')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
                assert.typeOf(res.body, 'array')
                done()
            })
    })
})

describe('GET /get-todo-search/:page_no/:rows/:keyword', () => {
    it('Get todo pagination with search', (done) => {
        chai.request(app)
            .get('/api/get-todo-search/1/3/updated')
            .end((err, res) => {
                assert.equal(res.status, '200')
                done();
            })
    })
})

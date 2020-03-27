const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () =>{
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll( async() => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () =>{
        const response  = await request(app)
        .post('/ongs')
        .send({
            nome: "VCR25",
            email: "vcr@bol.com.br",
            whatsapp: "12981155319",
            city: "Ubatuba",
            uf: "SP"
        });

       expect(response.body).toHaveProperty('id');
       expect(response.body.id).toHaveLength(8);
    });
});
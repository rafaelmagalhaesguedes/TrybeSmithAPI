import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Tests router POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 201 status when creating a product', function (done) {
    chai.request('http://localhost:3001')
      .post('/products')
      .set('Content-Type', 'application/json')
      .send({ name: 'Martelo do Chapolin Colorado', price: '1200 peças de ouro', userId: 1 })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 500 status when trying to create a product without sending the data', function (done) {
    chai.request('http://localhost:3001')
      .post('/products')
      .set('Content-Type', 'application/json')
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(500);
        done();
      });
  });
});

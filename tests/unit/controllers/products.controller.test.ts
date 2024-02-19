import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { createProduct } from '../../../src/controllers/products.controller';

chai.use(sinonChai);

describe('Products Controller', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('1. Should create a product successfully', async () => {
    req.body = { name: 'Martelo do Chapolin Colorado', price: '1.000.000.000 peças de ouro', userId: 1 };
    await createProduct(req, res);
    
    expect(res.json).to.have.been.calledWith(
      sinon.match.has('id', sinon.match.number)
        .and(sinon.match.has('name', 'Martelo do Chapolin Colorado'))
        .and(sinon.match.has('price', '1.000.000.000 peças de ouro'))
        .and(sinon.match.has('userId', 1))
    );
  });

  it('2. Should return an error when trying to create a product without sending the data', async () => {
    req.body = {};
    await createProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Informe os dados para criar o produto' });
  });

});

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { createProduct, getProducts } from '../../../src/controllers/products.controller';
import * as productService from '../../../src/services/products.service';

chai.use(sinonChai);

const mockProducts = [
  { id: 1, name: 'Marreta do Patolino', price: '100 moedas de ouro', userId: 1 },
  { id: 2, name: 'Eirenus da Foema Black', price: '200 moedas de ouro', userId: 2 },
];

describe('Products Controller', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('createProduct', function () {
    it('should return a new product', async function () {
      // Arrange
      req.body = { name: 'Marreta do Patolino', price: '100 moedas de ouro', userId: 1 };

      sinon.stub(productService, 'addProduct').resolves(req.body);

      // Act
      await createProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(req.body);
    });

    it('should return a 500 status code when an error occurs', async function () {
      // Arrange
      req.body = {};
      
      sinon.stub().rejects();

      // Act
      await createProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: 'Informe os dados para criar o produto' });
    });
  });

  describe('getProducts', function () {
    it('should return all products', async function () {
      sinon.stub(productService, 'getAllProducts').resolves(mockProducts);

      // Act
      await getProducts(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    });
  });
});

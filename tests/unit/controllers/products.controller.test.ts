import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { ProductsController } from '../../../src/controllers';
import { ProductsService } from '../../../src/services';

chai.use(sinonChai);

const mockProducts = [
  { id: 1, name: 'Marreta do Patolino', price: '100 moedas de ouro', userId: 1 },
  { id: 2, name: 'Eirenus da Foema Black', price: '200 moedas de ouro', userId: 2 },
];

describe('Products Controller Tests', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('createProduct', function () {
    it('1. should create and return a new product', async function () {
      // Arrange
      req.body = mockProducts[0];
      const response = {
        status: 'CREATED',
        data: mockProducts[0],
        type: 'success',
      };
      sinon.stub(ProductsService, 'addProduct').resolves(response as unknown as any);

      // Act
      await ProductsController.createProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(response.data);
    });

    it('2. should return an error when creating a product', async function () {
      // Arrange
      req.body = mockProducts[0];
      const response = {
        status: 'INTERNAL_ERROR',
        message: 'Internal Server Error',
        type: 'error',
      };
      sinon.stub(ProductsService, 'addProduct').resolves(response as unknown as any);

      // Act
      await ProductsController.createProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: response.message });
    });
  });

  describe('getProducts', function () {
    it('1. should return all products', async function () {
      // Arrange
      const response = {
        status: 'SUCCESSFUL',
        data: mockProducts,
        type: 'success',
      };
      sinon.stub(ProductsService, 'getAllProducts').resolves(response as unknown as any);

      // Act
      await ProductsController.getProducts(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(response.data);
    });

    it('2. should return an error when getting all products', async function () {
      // Arrange
      const response = {
        status: 'NOT_FOUND',
        message: 'Not Found',
        type: 'error',
      };
      sinon.stub(ProductsService, 'getAllProducts').resolves(response as unknown as any);

      // Act
      await ProductsController.getProducts(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: response.message });
    });
  });
});

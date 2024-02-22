import { expect } from 'chai';
import sinon from 'sinon';
import { Product } from '../../../src/types/Product';
import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../../../src/database/models/product.model';
import { ProductsService } from '../../../src/services';

const mockProduct = {
  products: [
    { id: 1, name: 'Marreta do Chapolin Colorado', price: '1.000.000.000 moedas de ouro', userId: 1 },
    { id: 2, name: 'Eirenus da Foema Black', price: '200.000 moedas de ouro', userId: 2 },
  ],
};

describe('Products Service Tests', function () {
  beforeEach(function () { sinon.restore(); });

  describe('addProduct', function () {
    it('1. should create and return a new product', async function () {
      // Arrange
      const parameters = mockProduct.products[0];
      const mockedBuild = ProductModel.build(parameters);
      sinon.stub(ProductModel, 'create').resolves(mockedBuild);

      // Act
      const response = await ProductsService.addProduct(mockProduct.products[0]);

      // Assert
      expect(response.status).to.equal('CREATED');
      expect(response.type).to.equal('success');
    });

    it('2. should return an error when creating a product', async function () {
      // Arrange
      const error = new Error('Internal Server Error');
      sinon.stub(ProductModel, 'create').rejects(error);

      // Act
      const response = await ProductsService.addProduct(mockProduct.products[0]);

      // Assert
      expect(response.type).to.equal('error');
    });
  });

  describe('getAllProducts', function () {
    it('1. should return all products', async function () {
      // Arrange
      const parameters = mockProduct.products as unknown as Model<Product, ProductInputtableTypes>[];
      sinon.stub(ProductModel, 'findAll').resolves(parameters);

      // Act
      const response = await ProductsService.getAllProducts();

      // Assert
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.type).to.equal('success');
      expect(response.data).to.equal(parameters);
    });

    it('2. should return an error when getting all products', async function () {
      // Arrange
      const error = new Error('Internal Server Error');
      sinon.stub(ProductModel, 'findAll').rejects(error);

      // Act
      const response = await ProductsService.getAllProducts();

      // Assert
      expect(response.type).to.equal('error');
    });
  });
});
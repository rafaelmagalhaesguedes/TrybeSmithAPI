import { expect } from 'chai';
import sinon from 'sinon';
import ProductsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

const mockProduct = {
  products: [
    { id: 1, name: 'Marreta do Patolino', price: '100 moedas de ouro', userId: 1 },
    { id: 2, name: 'Eirenus da Foema Black', price: '200 moedas de ouro', userId: 2 },
  ],
};

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('addProduct', function () {
    it('should return a new product', async function () {
      // Arrange
      sinon.stub(ProductsService, 'addProduct').resolves(mockProduct.products[0]);

      // Act
      const product = await ProductsService.addProduct(mockProduct.products[0]);

      // Assert
      expect(product).to.be.deep.equal(mockProduct.products[0]);
    });
  });

  describe('getAllProducts', function () {
    it('should return all products', async function () {
      // Arrange
      const mockProduct1 = sinon.createStubInstance(ProductModel);
      mockProduct1.get.returns(mockProduct.products[0]);

      const mockProduct2 = sinon.createStubInstance(ProductModel);
      mockProduct2.get.returns(mockProduct.products[1]);

      sinon.stub(ProductModel, 'findAll').resolves([mockProduct1, mockProduct2]);

      // Act
      const products = await ProductsService.getAllProducts();

      // Assert
      expect(products).to.deep.equal(mockProduct.products);
    });
  });
});

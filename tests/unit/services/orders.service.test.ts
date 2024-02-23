import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel, { OrderInputtableTypes } from "../../../src/database/models/order.model";
import { OrdersService } from "../../../src/services";
import UserModel from '../../../src/database/models/user.model';
import ProductModel from '../../../src/database/models/product.model';
import { Model, Order } from 'sequelize';

const mockOrder = {
    orders: [
        {
            userId: 1,
            productId: 2,
            quantity: 1
        }
    ]
};

describe('Orders Service Tests', function () {
    beforeEach(function () { sinon.restore(); });
    
    describe('addOrder', function () {
        it('1. should create and return a new order', async function () {
        // Arrange
        const parameters = mockOrder.orders[0];
        const mockedBuild = OrderModel.build(parameters);
        sinon.stub(UserModel, 'findOne').resolves({ id: parameters.userId } as unknown as Model);
        sinon.stub(ProductModel, 'findOne').resolves({ id: parameters.productId } as unknown as Model);
        sinon.stub(OrderModel, 'create').resolves(mockedBuild);
    
        // Act
        const response = await OrdersService.create(mockOrder.orders[0]);
    
        // Assert
        expect(response.status).to.equal('CREATED');
        expect(response.type).to.equal('success');
        });
    
        it('2. should return an error when creating an order', async function () {
        // Arrange
        const error = new Error('Internal Server Error');
        sinon.stub(OrderModel, 'create').rejects(error);
    
        // Act
        const response = await OrdersService.create(mockOrder.orders[0]);
    
        // Assert
        expect(response.type).to.equal('error');
        });
    });
    
    describe('getAllOrders', function () {
        it('1. should return all orders', async function () {
        // Arrange
        const parameters = mockOrder.orders as unknown as Model<Order, OrderInputtableTypes>[];
        sinon.stub(OrderModel, 'findAll').resolves(parameters);
    
        // Act
        const response = await OrdersService.getAll();
    
        // Assert
        expect(response.status).to.equal('SUCCESSFUL');
        expect(response.type).to.equal('success');
        expect(response.data).to.equal(parameters);
        });
    
        it('2. should return an error when getting all orders', async function () {
        // Arrange
        const error = new Error('Internal Server Error');
        sinon.stub(OrderModel, 'findAll').rejects(error);
    
        // Act
        const response = await OrdersService.getAll();
    
        // Assert
        expect(response.type).to.equal('error');
        });
    });
});
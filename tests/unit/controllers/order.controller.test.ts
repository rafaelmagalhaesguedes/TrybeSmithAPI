import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { OrdersController } from '../../../src/controllers';
import { OrdersService } from '../../../src/services';
import statusHTTP from '../../../src/utils/httpStatusMap';

chai.use(sinonChai);

describe('Orders Controller Tests', function () {
    const req = {} as Request;
    const res = {} as Response;
    
    beforeEach(function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        sinon.restore();
    });
    
    describe('createOrder', function () {
        it('1. should create and return a new order', async function () {
        // Arrange
        req.body = { userId: 1, productId: 2, quantity: 1 };
        const response = {
            status: 'CREATED',
            data: { userId: 1, productId: 2, quantity: 1 },
            type: 'success',
        };
        sinon.stub(OrdersService, 'create').resolves(response as unknown as any);
    
        // Act
        await OrdersController.createOrder(req, res);
    
        // Assert
        expect(res.status).to.have.been.calledWith(statusHTTP('CREATED'));
        expect(res.json).to.have.been.calledWith(response.data);
        });
    
        it('2. should return an error when creating an order', async function () {
        // Arrange
        req.body = { userId: 1, productId: 2, quantity: 1 };
        const response = {
            status: 'INTERNAL_ERROR',
            message: 'Internal Server Error',
            type: 'error',
        };
        sinon.stub(OrdersService, 'create').resolves(response as unknown as any);
    
        // Act
        await OrdersController.createOrder(req, res);
    
        // Assert
        expect(res.status).to.have.been.calledWith(statusHTTP('INTERNAL_ERROR'));
        expect(res.json).to.have.been.calledWith({ message: response.message });
        });
    });
    
    describe('getOrders', function () {
        it('1. should return all orders', async function () {
        // Arrange
        const response = {
            status: 'SUCCESSFUL',
            data: [{ userId: 1, productId: 2, quantity: 1 }],
            type: 'success',
        };
        sinon.stub(OrdersService, 'getAll').resolves(response as unknown as any);
    
        // Act
        await OrdersController.getAllOrders(req, res);
    
        // Assert
        expect(res.status).to.have.been.calledWith(statusHTTP('SUCCESSFUL'));
        expect(res.json).to.have.been.calledWith(response.data);
        });
    
        it('2. should return an error when getting all orders', async function () {
        // Arrange
        const response = {
            status: 'INTERNAL_ERROR',
            message: 'Internal Server Error',
            type: 'error',
        };
        sinon.stub(OrdersService, 'getAll').resolves(response as unknown as any);

        // Act
        await OrdersController.getAllOrders(req, res);

        // Assert
        expect(res.status).to.have.been.calledWith(statusHTTP('INTERNAL_ERROR'));
        expect(res.json).to.have.been.calledWith({ message: response.message });
        });
    });
});
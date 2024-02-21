import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserModel from '../../../src/database/models/user.model';
import UsersController from '../../../src/controllers/users.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('getAllUsers', function () {
    it('should return all users with their product IDs', async function () {
      // Arrange
      const mockUser: any = {
        dataValues: {
          id: 1,
          username: "Rafael Guedes",
          vocation: "Developer Fullstack",
          level: 1,
          password: "123456",
          productIds: [
            {
              id: 1,
              name: "Zoom",
              price: "0",
              userId: 1,
            },
            {
              id: 2,
              name: "Slack",
              price: "0",
              userId: 1,
            }
          ],
        },
      };
      sinon.stub(UserModel, 'findAll').resolves([mockUser]);

      // Act
      await UsersController.getUsers(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([{
        username: 'Rafael Guedes',
        productIds: [1, 2],
      }]);
    });

    it('should return an error message when an error occurs', async function () {
      // Arrange
      sinon.stub(UserModel, 'findAll').rejects(new Error('Database error'));

      // Act
      await UsersController.getUsers(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: 'Database error' });
    });
  });
});

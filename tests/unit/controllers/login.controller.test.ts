import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';
import { LoginController } from '../../../src/controllers';

chai.use(sinonChai);

const mockUser: any = {
  users: [
    { username: 'MohammeD', password: 'BeastMaster' },
    { username: 'Euthyrox', password: 'Huntress' },
  ],
};

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('login', function () {
    it('1. should return a user when logging in', async function () {
      // Arrange
      req.body = mockUser.users[0];
      const hashedPassword = bcrypt.hashSync(mockUser.users[0].password, 10);
      const mockedBuild = UserModel.build({ ...mockUser.users[0], password: hashedPassword });
      sinon.stub(UserModel, 'findOne').resolves(mockedBuild);

      // Act
      await LoginController.login(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sinon.match.object);
    });

    it('2. should return an error when logging in', async function () {
      // Arrange
      req.body = mockUser.users[0];
      sinon.stub(UserModel, 'findOne').resolves(null);

      // Act
      await LoginController.login(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith(sinon.match.object);
    });

    it('3. should return an error when the password is invalid', async function () {
      // Arrange
      req.body = mockUser.users[0];
      const hashedPassword = bcrypt.hashSync('wrongpassword', 10);
      const mockedBuild = UserModel.build({ ...mockUser.users[0], password: hashedPassword });
      sinon.stub(UserModel, 'findOne').resolves(mockedBuild);

      // Act
      await LoginController.login(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith(sinon.match.object);
    });
  });
});

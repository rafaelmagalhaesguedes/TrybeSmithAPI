import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import UserModel from '../../../src/database/models/user.model';
import { LoginService } from '../../../src/services';

const mockUser: any = {
  users: [
    { username: 'MohammeD', password: 'BeastMaster' },
    { username: 'Euthyrox', password: 'Huntress' },
  ],
};

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('login', function () {
    it('1. should return a user when logging in', async function () {
      // Arrange
      const parameters = mockUser.users[0];
      const hashedPassword = bcrypt.hashSync(parameters.password, 10);
      const mockedBuild = UserModel.build({ ...parameters, password: hashedPassword });
      sinon.stub(UserModel, 'findOne').resolves(mockedBuild);

      // Act
      const response = await LoginService.authLogin(mockUser.users[0]);

      // Assert
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.type).to.equal('success');
      expect(response.data?.token).to.exist;
    });

    it('2. should return an error when logging in', async function () {
      // Arrange
      const error = new Error('Username or password invalid');
      sinon.stub(UserModel, 'findOne').resolves(null);

      // Act
      const response = await LoginService.authLogin(mockUser.users[0]);

      // Assert
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.type).to.equal('error');
      expect(response.message).to.equal('Username or password invalid');
    });

    it('3. should return an error when the password is invalid', async function () {
      // Arrange
      const parameters = mockUser.users[0];
      const hashedPassword = bcrypt.hashSync('wrongpassword', 10);
      const mockedBuild = UserModel.build({ ...parameters, password: hashedPassword });
      sinon.stub(UserModel, 'findOne').resolves(mockedBuild);

      // Act
      const response = await LoginService.authLogin(mockUser.users[0]);

      // Assert
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.type).to.equal('error');
      expect(response.message).to.equal('Username or password invalid');
    });
  });
});
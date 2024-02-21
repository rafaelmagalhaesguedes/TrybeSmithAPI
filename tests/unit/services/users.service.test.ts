import { expect } from 'chai';
import sinon from 'sinon';
import UsersService from '../../../src/services/users.service';
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('getUsers', function () {
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
      const result = await UsersService.getAllUsers();

      // Assert
      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.type).to.equal('success');
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.an('array');
      expect(result.data).to.deep.equal([{
          username: 'Rafael Guedes',
          productIds: [1, 2],
      }]);
    });

    it('should return an error message when an error occurs', async function () {
      // Arrange
      sinon.stub(UserModel, 'findAll').rejects(new Error('Database error'));
      
      // Act
      const result = await UsersService.getAllUsers();

      // Assert
      expect(result.status).to.equal('NOT_FOUND');
      expect(result.type).to.equal('error');
      expect(result.data).to.be.undefined;
      expect(result.message).to.equal('Database error');
    });
  });

});

import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('orders', [
      {
        userId: 1,
        productId: 1,
        quantity: 2,
      },
      {
        userId: 2,
        productId: 2,
        quantity: 1,
      },
      {
        userId: 1,
        productId: 2,
        quantity: 3,
      },
    ], {});
  },
  
  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('orders', {});
  }
};
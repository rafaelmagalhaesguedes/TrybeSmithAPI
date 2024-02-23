import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Orders } from '../../types/Orders';
import User from './user.model';
import Product from './product.model';

export type OrderInputtableTypes = Optional<Orders, 'id'>;
type OrderSequelizeModelCreator = ModelDefined<Orders, OrderInputtableTypes>;
export type OrderSequelizeModel = Model<Orders, OrderInputtableTypes>;

const OrderModel: OrderSequelizeModelCreator = db.define('Order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false,
  underscored: false,
});

User.hasMany(OrderModel, { foreignKey: 'userId', as: 'orderIds' });
OrderModel.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(OrderModel, { foreignKey: 'productId', as: 'orderIds' });
OrderModel.belongsTo(Product, { foreignKey: 'productId' });

export default OrderModel;
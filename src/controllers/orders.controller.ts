import { Request, Response } from 'express';
import { OrdersService } from '../services';

const getAllOrders = async (req: Request, res: Response) => {
  const { type, message, data } = await OrdersService.getAll();
  
  if (type !== 'success') {
    return res.status(500).json({ message });
  }

  return res.status(200).json(data);
};

const createOrder = async (req: Request, res: Response) => {
  const { type, message, data } = await OrdersService.create(req.body);
  
  if (type !== 'success') {
    return res.status(500).json({ message });
  }

  return res.status(201).json(data);
};

export default { getAllOrders, createOrder };
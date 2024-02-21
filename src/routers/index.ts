//
// Barrel Routers
import express from 'express';
import { createProduct, getProducts } from '../controllers/products.controller';
import { getUsers } from '../controllers/users.controller';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

router.get('/users', getUsers);

export default router;
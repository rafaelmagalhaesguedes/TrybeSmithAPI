//
// Barrel Routers
import express from 'express';
import { createProduct } from '../controllers/products.controller';

const router = express.Router();

router.post('/products', createProduct);

export default router;
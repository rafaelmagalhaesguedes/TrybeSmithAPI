//
// Barrel Routers
import express from 'express';
import { createProduct, getProducts } from '../controllers/products.controller';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

export default router;
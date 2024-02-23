import { Request, Response, NextFunction } from 'express';

const ordersValidateBody = (req: Request, res: Response, next: NextFunction) => {
  const { userId, productId, quantity } = req.body;

  if (!userId) return res.status(400).json({ message: '"userId" is required' });

  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

const ordersValidateUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
    
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
    
  next();
};

const ordersValidateProductId = (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;
        
  if (typeof productId !== 'number') {
    return res.status(422).json({ message: '"productId" must be a number' });
  }
        
  next();
};

const ordersValidateQuantity = (req: Request, res: Response, next: NextFunction) => {
  const { quantity } = req.body;
  
  if (typeof quantity !== 'number') {
    return res.status(422).json({ message: '"quantity" must be a number' });
  }

  next();
};

const ordersValidate = (req: Request, res: Response, next: NextFunction) => {
  ordersValidateBody(req, res, () => {
    ordersValidateUserId(req, res, () => {
      ordersValidateProductId(req, res, () => {
        ordersValidateQuantity(req, res, next);
      });
    });
  });
};

export default { ordersValidate };
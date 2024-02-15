import request from 'supertest';
import shell from 'shelljs';
import { runMochaCoverage } from './utils';
import {
  sequelizeCLI,
  getRequirementDescription
} from './assets/constants';

import app from '../src/app';

describe(getRequirementDescription(5), () => {
  beforeAll(() => {
    shell.exec([
      sequelizeCLI.drop,
      sequelizeCLI.create,
      sequelizeCLI.migrate,
      sequelizeCLI.seed
    ].join(' && '),
      { silent: process.env.DEBUG === 'false' });
  });

  it('Será validado que não é possível cadastrar um produto sem informar um "name"', async () => {
    const result = await request(app).post('/products').send({
      price: 'price',
      userId: 1,
    })

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual('"name" is required');
  })

  it('Será validado que não é possível cadastrar um produto sem informar um "price"', async () => {
    const result = await request(app).post('/products').send({
      name: 'punhal de mithril',
      userId: 1,
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual('"price" is required');
  })

  it('Será validado que não é possível cadastrar um produto sem informar um "userId"', async () => {
    const result = await request(app).post('/products').send({
      name: 'punhal de mithril',
      price: 50,
    });

    expect(result.statusCode).toEqual(400);
    expect(result.body.message).toEqual('"userId" is required');
  })

  it('Será validado que não é possível cadastrar um produto se "name" não for uma string', async () => {
    const result = await request(app).post('/products').send({
      name: 1,
      price: 'price',
      userId: 1,
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"name" must be a string');
  })

  it('Será validado que não é possível cadastrar um produto se "price" não for uma string', async () => {
    const result = await request(app).post('/products').send({
      name: 'espada élfica',
      price: 1,
      userId: 1,
    });

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"price" must be a string');
  })

  it('Será validado que não é possível cadastrar um produto se "name" tiver menos de 3 caracteres', async () => {
    const result = await request(app).post('/products').send({
      name: 'ar',
      price: '10 peças de prata',
      userId: 1,
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"name" length must be at least 3 characters long');
  })

  it('Será validado que não é possível cadastrar um produto se "price" tiver menos de 3 caracteres', async () => {
    const result = await request(app).post('/products').send({
      name: 'espada élfica',
      price: 'um',
      userId: 1,
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"price" length must be at least 3 characters long');
  })

  it('Será validado que não é possível cadastrar um produto se "userId" não for um número', async () => {
    const result = await request(app).post('/products').send({
      name: 'espada élfica',
      price: '10 peças de prata',
      userId: '1',
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"userId" must be a number');
  });

  it('Será validado que não é possível cadastrar um produto se não existir um usuário correspondente ao "userId" informado', async () => {
    const result = await request(app).post('/products').send({
      name: 'espada élfica',
      price: '10 peças de prata',
      userId: -1,
    })

    expect(result.statusCode).toEqual(422);
    expect(result.body.message).toEqual('"userId" not found');
  });

  it('Será validado que os testes estão cobrindo pelo menos 80% das camadas `Service` e `Controller`', async () => {
    const { total: { statements } } = await runMochaCoverage();
    
    expect(statements.pct).toBeGreaterThanOrEqual(80);
  });
});
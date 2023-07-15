import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TradeData } from 'src/entity/trade.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Fluxo basico', async () => {
    const initialGet = await request(app.getHttpServer()).get('/caixa');

    expect(initialGet.statusCode).toEqual(200);
    expect(initialGet.body).toEqual([]);

    const VALUE = {
      service: {
        name: 'corte1',
        title: 'Corte Cabelo',
        value: 12.0,
        commission: 0.5,
      },
      employee: 'Joao',
      paymentMethod: 'cash',
    } as TradeData;

    const create = await request(app.getHttpServer())
      .post('/caixa')
      .send(VALUE);
    expect(create.statusCode).toEqual(201);

    const afterGet = await request(app.getHttpServer()).get('/caixa');
    expect(afterGet.statusCode).toEqual(200);
    expect(afterGet.body).toMatchObject([VALUE]);

    const idCreatedData = afterGet.body[0].id;

    const get = await request(app.getHttpServer()).get(
      `/caixa/${idCreatedData}`,
    );
    expect(get.body).toMatchObject(VALUE);
  });
});

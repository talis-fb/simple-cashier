import { Test, TestingModule } from '@nestjs/testing';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';

describe('AppController', () => {
  let controller: CashierController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CashierController],
      providers: [CashierService],
    }).compile();

    controller = app.get<CashierController>(CashierController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(controller.getHello()).toBe('Hello World!');
    });
  });
});

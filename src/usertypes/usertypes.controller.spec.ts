import { Test, TestingModule } from '@nestjs/testing';
import { UsertypesController } from './usertypes.controller';

describe('UsertypesController', () => {
  let controller: UsertypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertypesController],
    }).compile();

    controller = module.get<UsertypesController>(UsertypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { UsertypesController } from './usertypes.controller';
import { UsertypesService } from './usertypes.service';

@Module({
  controllers: [UsertypesController],
  providers: [UsertypesService]
})
export class UsertypesModule {}

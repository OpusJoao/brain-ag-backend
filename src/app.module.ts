import { Module } from '@nestjs/common';
import RuralProducerController from './rural-producer/presentation/controllers/rural-producer.controller';

@Module({
  imports: [],
  controllers: [RuralProducerController],
  providers: [],
})
export class AppModule {}

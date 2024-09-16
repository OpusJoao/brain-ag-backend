import { Module } from '@nestjs/common';
import RuralProducerController from './rural-producer/Presentation/Controllers/rural-producer.controller';

@Module({
  imports: [],
  controllers: [RuralProducerController],
  providers: [],
})
export class AppModule {}

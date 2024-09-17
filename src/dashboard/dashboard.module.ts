import { Module } from '@nestjs/common';
import DashboardController from './presentation/controllers/dashboard.controller';
import RuralProducerModule from '../rural-producer/rural-producer.module';
import DashboardService from './application/services/dashboard.service';

@Module({
  imports: [RuralProducerModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export default class DashboardModule {}

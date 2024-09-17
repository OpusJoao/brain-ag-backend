import { Injectable } from '@nestjs/common';
import RuralProducerRepository from '../../../rural-producer/domain/repositories/rural-producer.repository';

@Injectable()
export default class DashboardService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async getViewDashboard() {
    return await this.ruralProducerRepository.getViewDashboard();
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ControllerResponseInterface from '../../../shared/presentation/interfaces/controller-response.interface';
import DashboardService from '../../application/services/dashboard.service';

@ApiTags('Dashboards')
@Controller('dashboard')
export default class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('')
  async getPrincipalDashboard(): Promise<ControllerResponseInterface> {
    const dashData = await this.dashboardService.getViewDashboard();
    return {
      status: 200,
      data: {
        totalOfFarmInQuantity: dashData.totalOfFarmInQuantity,
        totalOfFarmInHectares: dashData.totalOfFarmInHectares,
      },
    };
  }
}

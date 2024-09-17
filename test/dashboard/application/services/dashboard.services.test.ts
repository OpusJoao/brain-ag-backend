import { TestingModule, Test } from '@nestjs/testing';
import DashboardService from '../../../../src/dashboard/application/services/dashboard.service';
import RuralProducerRepository from '../../../../src/rural-producer/domain/repositories/rural-producer.repository';

describe('DashboardService', () => {
  let service: DashboardService;
  let repository: RuralProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: RuralProducerRepository,
          useValue: {
            getViewDashboard: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    repository = module.get<RuralProducerRepository>(RuralProducerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getViewDashboard', () => {
    it('should return the expected data', async () => {
      const expectedResult = {
        totalOfFarmInQuantity: 0,
        totalOfFarmInHectares: 0,
      };

      jest
        .spyOn(repository, 'getViewDashboard')
        .mockResolvedValue(expectedResult);

      expect(await service.getViewDashboard()).toBe(expectedResult);
      expect(repository.getViewDashboard).toHaveBeenCalled();
    });

    it('should handle errors properly', async () => {
      const error = new Error('Something went wrong');

      jest.spyOn(repository, 'getViewDashboard').mockRejectedValue(error);

      await expect(service.getViewDashboard()).rejects.toThrow(error);
      expect(repository.getViewDashboard).toHaveBeenCalled();
    });
  });
});

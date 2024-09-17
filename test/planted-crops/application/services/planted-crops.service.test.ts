import { TestingModule, Test } from '@nestjs/testing';
import PlantedCropService from '../../../../src/planted-crops/application/services/planted-crop.service';
import PlantedCropEntity from '../../../../src/planted-crops/domain/entities/planted-crop.entity';
import PlantedCropRepository from '../../../../src/planted-crops/domain/repositories/planted-crop.repository';

describe('PlantedCropService', () => {
  let service: PlantedCropService;
  let repository: PlantedCropRepository;

  beforeEach(async () => {
    // Cria uma instância de módulo de teste
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantedCropService,
        {
          provide: PlantedCropRepository,
          useValue: {
            getByIds: jest.fn(), // Mock do método getByIds
          },
        },
      ],
    }).compile();

    service = module.get<PlantedCropService>(PlantedCropService);
    repository = module.get<PlantedCropRepository>(PlantedCropRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByIds', () => {
    it('should return an array of PlantedCropEntity', async () => {
      const ids = [1, 2, 3];
      const result: PlantedCropEntity[] = [
        new PlantedCropEntity(), // Supondo que o construtor de PlantedCropEntity cria uma instância válida
        new PlantedCropEntity(),
      ];

      jest.spyOn(repository, 'getByIds').mockResolvedValue(result);

      expect(await service.getByIds(ids)).toBe(result);
      expect(repository.getByIds).toHaveBeenCalledWith(ids);
    });

    it('should handle empty array of ids', async () => {
      const ids: number[] = [];
      const result: PlantedCropEntity[] = [];

      jest.spyOn(repository, 'getByIds').mockResolvedValue(result);

      expect(await service.getByIds(ids)).toBe(result);
      expect(repository.getByIds).toHaveBeenCalledWith(ids);
    });
  });
});

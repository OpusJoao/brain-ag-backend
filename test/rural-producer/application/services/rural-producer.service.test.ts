import { TestingModule, Test } from '@nestjs/testing';
import PlantedCropService from '../../../../src/planted-crops/application/services/planted-crop.service';
import RuralProducerService from '../../../../src/rural-producer/application/services/rural-producer.service';
import { PlantedCropsFullEnum } from '../../../../src/rural-producer/domain/enums/planted-crops.enum';
import RuralProducerRepository from '../../../../src/rural-producer/domain/repositories/rural-producer.repository';
import BodyCreateRuralProducerDto from '../../../../src/rural-producer/presentation/dtos/body-create-rural-producer.dto';
import BodyUpdateRuralProducerDto from '../../../../src/rural-producer/presentation/dtos/body-update-rural-producer.dto';
import InvalidTotalAreaException from '../../../../src/rural-producer/presentation/exceptions/invalid-total-area.exception';
import RuralProducerAlreadyExistsException from '../../../../src/rural-producer/presentation/exceptions/rural-producer-already-exists.exception';
import RuralProducerNotExistsException from '../../../../src/rural-producer/presentation/exceptions/rural-producer-not-exists.exception';

describe('RuralProducerService', () => {
  let service: RuralProducerService;
  let ruralProducerRepository: Partial<RuralProducerRepository>;
  let plantedCropsService: Partial<PlantedCropService>;

  beforeEach(async () => {
    ruralProducerRepository = {
      getRuralProducer: jest.fn(),
      getRuralProducerByDocument: jest.fn(),
      createRuralProducer: jest.fn(),
      deleteRuralProducer: jest.fn(),
      updateRuralProducer: jest.fn(),
    };

    plantedCropsService = {
      getByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuralProducerService,
        { provide: RuralProducerRepository, useValue: ruralProducerRepository },
        { provide: PlantedCropService, useValue: plantedCropsService },
      ],
    }).compile();

    service = module.get<RuralProducerService>(RuralProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return a rural producer by id', async () => {
      const result = [{ id: 1, name: 'Producer 1' }];
      jest
        .spyOn(ruralProducerRepository, 'getRuralProducer')
        .mockResolvedValue(result as any);
      expect(await service.get(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new rural producer', async () => {
      const createDto: BodyCreateRuralProducerDto = {
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        state: 'teste',
        document: '123456',
        agriculturalArea: 50,
        totalArea: 100,
        vegetationArea: 20,
        plantedCrops: [PlantedCropsFullEnum.SOJA],
      };

      const plantedCropEntity = { id: 1, name: 'Corn' };
      jest
        .spyOn(plantedCropsService, 'getByIds')
        .mockResolvedValue([plantedCropEntity] as any);
      jest
        .spyOn(ruralProducerRepository, 'getRuralProducerByDocument')
        .mockResolvedValue(null as any);
      jest
        .spyOn(ruralProducerRepository, 'createRuralProducer')
        .mockResolvedValue({ id: 1, ...createDto } as any);

      expect(await service.create(createDto)).toEqual({ id: 1, ...createDto });
    });

    it('should throw InvalidTotalAreaException if total area is invalid on create', async () => {
      const createDto: BodyCreateRuralProducerDto = {
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        state: 'teste',
        document: '123456',
        agriculturalArea: 50,
        totalArea: 70,
        vegetationArea: 30,
        plantedCrops: [PlantedCropsFullEnum.SOJA],
      };

      await expect(service.create(createDto)).rejects.toThrow(
        InvalidTotalAreaException,
      );
    });

    it('should throw InvalidTotalAreaException if total area is invalid on update', async () => {
      const id = 1;
      const updateDto: BodyUpdateRuralProducerDto = {
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        state: 'teste',
        document: '123456',
        agriculturalArea: 50,
        totalArea: 70,
        vegetationArea: 30,
        plantedCrops: [PlantedCropsFullEnum.SOJA],
      };

      const existingProducer = [
        { id: 1, agriculturalArea: 50, totalArea: 100, vegetationArea: 20 },
      ];
      jest.spyOn(service, 'get').mockResolvedValue(existingProducer as any);
      jest
        .spyOn(plantedCropsService, 'getByIds')
        .mockResolvedValue([{ id: 2, name: 'SOJA' }] as any);
      jest
        .spyOn(ruralProducerRepository, 'updateRuralProducer')
        .mockResolvedValue({ id: 1 } as any);

      await expect(service.update(id, updateDto)).rejects.toThrow(
        InvalidTotalAreaException,
      );
    });

    it('should throw RuralProducerAlreadyExistsException if producer already exists', async () => {
      const createDto: BodyCreateRuralProducerDto = {
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        state: 'teste',
        document: '123456',
        agriculturalArea: 50,
        totalArea: 100,
        vegetationArea: 20,
        plantedCrops: [PlantedCropsFullEnum.SOJA],
      };

      jest
        .spyOn(ruralProducerRepository, 'getRuralProducerByDocument')
        .mockResolvedValue({ id: 1 } as any);

      await expect(service.create(createDto)).rejects.toThrow(
        RuralProducerAlreadyExistsException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a rural producer', async () => {
      jest.spyOn(service, 'get').mockResolvedValue([{ id: 1 }] as any);
      jest
        .spyOn(ruralProducerRepository, 'deleteRuralProducer')
        .mockResolvedValue({ affected: 1 } as any);
      expect(await service.delete(1)).toBe(true);
    });

    it('should return false if producer does not exist', async () => {
      jest.spyOn(service, 'get').mockResolvedValue([] as any);
      expect(await service.delete(1)).toBe(false);
    });
  });

  describe('update', () => {
    it('should update an existing rural producer', async () => {
      const updateDto: BodyUpdateRuralProducerDto = {
        state: 'teste',
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        document: '123456',
        plantedCrops: [PlantedCropsFullEnum.SOJA],
      };

      const existingProducer = [
        { id: 1, agriculturalArea: 50, totalArea: 100, vegetationArea: 20 },
      ];
      jest.spyOn(service, 'get').mockResolvedValue(existingProducer as any);
      jest
        .spyOn(plantedCropsService, 'getByIds')
        .mockResolvedValue([{ id: 2, name: 'SOJA' }] as any);
      jest
        .spyOn(ruralProducerRepository, 'updateRuralProducer')
        .mockResolvedValue({ id: 1 } as any);

      expect(await service.update(1, updateDto)).toBe(true);
    });

    it('should update an existing rural producer withou plantedCrops', async () => {
      const updateDto: BodyUpdateRuralProducerDto = {
        state: 'teste',
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        document: '123456',
      };

      const existingProducer = [
        { id: 1, agriculturalArea: 50, totalArea: 100, vegetationArea: 20 },
      ];
      jest.spyOn(service, 'get').mockResolvedValue(existingProducer as any);
      jest
        .spyOn(plantedCropsService, 'getByIds')
        .mockResolvedValue([{ id: 2, name: 'SOJA' }] as any);
      jest
        .spyOn(ruralProducerRepository, 'updateRuralProducer')
        .mockResolvedValue({ id: 1 } as any);

      expect(await service.update(1, updateDto)).toBe(true);
    });

    it('should throw RuralProducerNotExistsException if producer does not exist', async () => {
      jest.spyOn(service, 'get').mockResolvedValue([] as any);

      await expect(service.update(1, {} as any)).rejects.toThrow(
        RuralProducerNotExistsException,
      );
    });

    it('should throw InvalidTotalAreaException if total area is invalid', async () => {
      const updateDto: BodyUpdateRuralProducerDto = {
        state: 'teste',
        name: 'teste',
        city: 'teste',
        farmName: 'teste',
        document: '123456',
        agriculturalArea: 60,
        totalArea: 90,
        vegetationArea: 40,
      };

      const existingProducer = [
        { id: 1, agriculturalArea: 50, totalArea: 100, vegetationArea: 20 },
      ];
      jest.spyOn(service, 'get').mockResolvedValue(existingProducer as any);

      await expect(service.update(1, updateDto)).rejects.toThrow(
        InvalidTotalAreaException,
      );
    });
  });
});

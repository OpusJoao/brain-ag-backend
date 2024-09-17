import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PlantedCropsEnum } from '../../domain/enums/planted-crops.enum';

export default class BodyCreateRuralProducerDto {
  @ApiProperty({
    description: 'Documento do produtor rural (CPF ou CNPJ)',
    type: String,
    required: true,
  })
  @IsString()
  readonly document: string;

  @ApiProperty({
    description: 'Nome do produtor rural',
    type: String,
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Nome da fazenda',
    type: String,
    required: true,
  })
  @IsString()
  readonly farmName: string;

  @ApiProperty({
    description: 'Cidade',
    type: String,
    required: true,
  })
  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'Estado',
    type: String,
    required: true,
  })
  @IsString()
  readonly state: string;

  @ApiProperty({
    description: 'Área total em hectares da fazenda',
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly totalArea: number;

  @ApiProperty({
    description: 'Área agricultável em hectares',
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly agriculturalArea: number;

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly vegetationArea: number;

  @ApiProperty({
    description: 'Culturas plantadas',
    required: true,
    enum: PlantedCropsEnum,
    isArray: true,
  })
  @IsEnum(PlantedCropsEnum, { each: true })
  readonly plantedCrops: PlantedCropsEnum[];
}

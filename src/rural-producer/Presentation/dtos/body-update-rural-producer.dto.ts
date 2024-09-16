import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PlantedCropsEnum } from '../../domain/enums/planted-crops.enum';

export default class BodyUpdateRuralProducerDto {
  @ApiProperty({
    description: 'Documento do produtor rural',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly document: string;

  @ApiProperty({
    description: 'Nome do produtor rural',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    description: 'Nome da fazenda',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly farmName: string;

  @ApiProperty({
    description: 'Cidade',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty({
    description: 'Estado',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly state: string;

  @ApiProperty({
    description: 'Área total em hectares da fazenda',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly totalArea: number;

  @ApiProperty({
    description: 'Área agricultável em hectares',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly agriculturalArea: number;

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly vegetationArea: number;

  @ApiProperty({
    description: 'Culturas plantadas',
    required: false,
    enum: PlantedCropsEnum,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(PlantedCropsEnum, { each: true })
  readonly plantedCrops?: PlantedCropsEnum[];
}

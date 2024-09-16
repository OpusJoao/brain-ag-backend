import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BodyCreateRuralProducerDto from '../dtos/body-create-rural-producer.dto';
import BodyUpdateRuralProducerDto from '../dtos/body-update-rural-producer.dto';

@ApiTags('Produtor Rural')
@Controller('rural-producer')
export default class RuralProducerController {
  constructor() {}

  @Get('/:id')
  showRuralProducers(@Param('id') id: number) {
    return id;
  }

  @Post('/')
  createRuralProducer(
    @Body() createRuralProducerDto: BodyCreateRuralProducerDto,
  ) {
    return createRuralProducerDto;
  }

  @Delete('/:id')
  deleteRuralProducer(@Param('id') id: number) {
    if (isNaN(id)) return false;
    return id;
  }

  @Put('/:id')
  updateRuralProducer(
    @Param('id') id: number,
    @Body() updateRuralProducerDto: BodyUpdateRuralProducerDto,
  ) {
    return { id, ...updateRuralProducerDto };
  }
}

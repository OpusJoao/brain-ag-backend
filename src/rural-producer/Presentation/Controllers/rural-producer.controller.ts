import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produtor Rural')
@Controller('rural-producer')
export default class RuralProducerController {
  constructor() {}

  @Get('/')
  showRuralProducers() {
    return {};
  }

  @Post('/')
  createRuralProducer() {
    return {};
  }

  @Delete('/')
  deleteRuralProducer() {
    return {};
  }

  @Put('/')
  updateRuralProducer() {
    return {};
  }
}

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
import RuralProducerService from '../../application/services/rural-producer.service';
import ValidationBrDocumentService from '../../../utils/application/services/validation-br-document.service';

@ApiTags('Produtor Rural')
@Controller('rural-producer')
export default class RuralProducerController {
  constructor(
    private readonly ruralProducerService: RuralProducerService,
    private readonly validateDocumentService: ValidationBrDocumentService,
  ) {}

  @Get('/:id')
  showRuralProducers(@Param('id') id: number) {
    return this.ruralProducerService.get(id);
  }

  @Post('/')
  createRuralProducer(
    @Body() createRuralProducerDto: BodyCreateRuralProducerDto,
  ) {
    if (
      !this.validateDocumentService.isValidDocument(
        createRuralProducerDto.document,
      )
    ) {
      throw new Error('Documento inválido');
    }
    return this.ruralProducerService.create(createRuralProducerDto);
  }

  @Delete('/:id')
  async deleteRuralProducer(@Param('id') id: number) {
    if (isNaN(id)) return false;
    const wasDeleted = await this.ruralProducerService.delete(id);
    if (wasDeleted) return 'usuario removido com sucesso';
    else return 'Usuario n pode ser deletado';
  }

  @Put('/:id')
  async updateRuralProducer(
    @Param('id') id: number,
    @Body() updateRuralProducerDto: BodyUpdateRuralProducerDto,
  ) {
    const wasUpdated = await this.ruralProducerService.update(
      id,
      updateRuralProducerDto,
    );
    if (wasUpdated) return 'usuario editado com sucesso';
    else return 'Usuario n pode ser editado';
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BodyCreateRuralProducerDto from '../dtos/body-create-rural-producer.dto';
import BodyUpdateRuralProducerDto from '../dtos/body-update-rural-producer.dto';
import RuralProducerService from '../../application/services/rural-producer.service';
import ValidationBrDocumentService from '../../../utils/application/services/validation-br-document.service';
import InvalidDocumentException from '../exceptions/invalid-document.exception';
import NullIdException from '../exceptions/null-id.exception';
import ControllerResponseInterface from '../../../shared/presentation/interfaces/controller-response.interface';

@ApiTags('Produtor Rural')
@Controller('rural-producer')
export default class RuralProducerController {
  constructor(
    private readonly ruralProducerService: RuralProducerService,
    private readonly validateDocumentService: ValidationBrDocumentService,
  ) {}

  @Get('/:id')
  async getRuralProducer(
    @Param('id') id: number,
  ): Promise<ControllerResponseInterface> {
    const ruralProducers = await this.ruralProducerService.get(id);
    return {
      status: HttpStatus.OK,
      data: ruralProducers,
    };
  }

  @Get('/')
  async showRuralProducers(): Promise<ControllerResponseInterface> {
    const ruralProducers = await this.ruralProducerService.get();
    return {
      status: HttpStatus.OK,
      data: ruralProducers,
    };
  }

  @Post('/')
  async createRuralProducer(
    @Body() createRuralProducerDto: BodyCreateRuralProducerDto,
  ): Promise<ControllerResponseInterface> {
    this.validateDocument(createRuralProducerDto.document);
    const ruralProducerCreated = await this.ruralProducerService.create(
      createRuralProducerDto,
    );
    return {
      status: HttpStatus.CREATED,
      data: ruralProducerCreated,
    };
  }

  @Delete('/:id')
  async deleteRuralProducer(
    @Param('id') id: number,
  ): Promise<ControllerResponseInterface> {
    if (isNaN(id)) throw new NullIdException();
    const wasDeleted = await this.ruralProducerService.delete(id);
    if (wasDeleted)
      return {
        status: HttpStatus.OK,
        message: 'Produtor rural deletado com sucesso!',
        data: [],
      };
    else
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Produtor rural não foi deletado com sucesso.',
        data: [],
      };
  }

  @Put('/:id')
  async updateRuralProducer(
    @Param('id') id: number,
    @Body() updateRuralProducerDto: BodyUpdateRuralProducerDto,
  ): Promise<ControllerResponseInterface> {
    if (
      updateRuralProducerDto.document &&
      updateRuralProducerDto?.document != ''
    )
      this.validateDocument(updateRuralProducerDto.document);

    const wasUpdated = await this.ruralProducerService.update(
      id,
      updateRuralProducerDto,
    );
    if (wasUpdated)
      return {
        status: HttpStatus.OK,
        message: 'Produtor rural editado com sucesso!',
        data: [],
      };
    else
      return {
        status: HttpStatus.OK,
        message: 'Produtor rural não foi editado com sucesso.',
        data: [],
      };
  }

  private validateDocument(document: string) {
    if (!this.validateDocumentService.isValidDocument(document)) {
      throw new InvalidDocumentException();
    }
  }
}

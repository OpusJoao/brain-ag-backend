export const GET_RURAL_PRODUCER_REPOSITORY_INTERFACE =
  'GetRuralProducerRepositoryInterface';

export interface GetRuralProducerResponseRepositoryInterface {
  id: number;
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
}

export default interface GetRuralProducerRepositoryInterface {
  getRuralProducer(
    id?: number,
  ): Promise<GetRuralProducerResponseRepositoryInterface[]>;
}

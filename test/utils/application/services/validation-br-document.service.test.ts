import { Test, TestingModule } from '@nestjs/testing';
import { isCPF, isCNPJ } from 'validation-br';
import ValidationBrDocumentService from '../../../../src/utils/application/services/validation-br-document.service';

jest.mock('validation-br', () => ({
  isCPF: jest.fn(),
  isCNPJ: jest.fn(),
}));

describe('ValidationBrDocumentService', () => {
  let service: ValidationBrDocumentService;
  let mockIsCpf: jest.Mock;
  let mockIsCnpj: jest.Mock;

  beforeEach(async () => {
    mockIsCpf = isCPF as jest.Mock;
    mockIsCnpj = isCNPJ as jest.Mock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationBrDocumentService],
    }).compile();

    service = module.get<ValidationBrDocumentService>(
      ValidationBrDocumentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isCpf', () => {
    it('should return true for valid CPF', () => {
      mockIsCpf.mockReturnValue(true);
      expect(service.isCpf('12345678901')).toBe(true);
      expect(mockIsCpf).toHaveBeenCalledWith('12345678901');
    });

    it('should return false for invalid CPF', () => {
      mockIsCpf.mockReturnValue(false);
      expect(service.isCpf('12345678901')).toBe(false);
      expect(mockIsCpf).toHaveBeenCalledWith('12345678901');
    });
  });

  describe('isCnpj', () => {
    it('should return true for valid CNPJ', () => {
      mockIsCnpj.mockReturnValue(true);
      expect(service.isCnpj('12345678000195')).toBe(true);
      expect(mockIsCnpj).toHaveBeenCalledWith('12345678000195');
    });

    it('should return false for invalid CNPJ', () => {
      mockIsCnpj.mockReturnValue(false);
      expect(service.isCnpj('12345678000195')).toBe(false);
      expect(mockIsCnpj).toHaveBeenCalledWith('12345678000195');
    });
  });

  describe('isValidDocument', () => {
    it('should return true if document is a valid CPF', () => {
      mockIsCpf.mockReturnValue(true);
      mockIsCnpj.mockReturnValue(false);
      expect(service.isValidDocument('12345678901')).toBe(true);
    });

    it('should return true if document is a valid CNPJ', () => {
      mockIsCpf.mockReturnValue(false);
      mockIsCnpj.mockReturnValue(true);
      expect(service.isValidDocument('12345678000195')).toBe(true);
    });

    it('should return false if document is neither valid CPF nor valid CNPJ', () => {
      mockIsCpf.mockReturnValue(false);
      mockIsCnpj.mockReturnValue(false);
      expect(service.isValidDocument('00000000000')).toBe(false);
    });
  });
});

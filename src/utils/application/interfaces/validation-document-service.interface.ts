export default interface ValidationDocumentServiceInterface {
  isCpf(document: string): boolean;
  isCnpj(document: string): boolean;
  isValidDocument(document: string): boolean;
}

export interface CostoProduccion {
  totalGastosMercadeo: number;
  totalCostosOperacion: number;
  totalGastosProduccion: number;
  totalCostoProduccionUnitario: number;
  precioVentaUnitario: number;
  margenUtilidadUnitario: number;
}

export interface RegistroCostosFormValues {
  productoId: string;
  materiaPrimaDirecta: any[]; // reemplaza con tipo si lo tienes
  manoObraDirecta: any[];
  costosIndirectosFabricacion: any[];
  manoObraIndirecta: any[];
  costosGenerales: any[];
  costosOperacion: any[];
  gastosVentas: any[];
  costoProduccion: CostoProduccion;
}

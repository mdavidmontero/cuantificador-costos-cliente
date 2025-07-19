import { z } from "zod";

export const RegistroCostosFormSchema = z.object({
  productoId: z.number().int(),
  organizationId: z.string().uuid(),

  materiaPrimaDirecta: z.array(
    z.object({
      name: z.string(),
      unidadMedida: z.string(),
      cantidad: z.number(),
      costoUnitario: z.number(),
      costoTotal: z.number(),
    })
  ),

  manoObraDirecta: z.array(
    z.object({
      nombre: z.string(),
      unidadMedida: z.string(),
      cantidad: z.number(),
      costoUnitario: z.number(),
      costoTotal: z.number(),
    })
  ),

  costosIndirectosFabricacion: z.array(
    z.object({
      nombre: z.string(),
      unidadMedida: z.string(),
      cantidad: z.number(),
      costoUnitario: z.number(),
      costoTotal: z.number(),
    })
  ),

  manoObraIndirecta: z.array(
    z.object({
      nombre: z.string(),
      unidadMedida: z.string(),
      costoUnitario: z.number(),
      costoTotal: z.number(),
    })
  ),

  costosGenerales: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
      costosTotales: z.number(),
    })
  ),

  costosOperacion: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
      totales: z.number(),
    })
  ),

  gastosVentas: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
      totales: z.number(),
    })
  ),

  costoProduccion: z.object({
    totalGastosMercadeo: z.number(),
    totalCostosOperacion: z.number(),
    totalGastosProduccion: z.number(),
    totalCostoProduccionUnitario: z.number(),
    precioVentaUnitario: z.number(),
    margenUtilidadUnitario: z.number(),
  }),
});

export type RegistroCostosFormValues = z.infer<typeof RegistroCostosFormSchema>;

export interface CostoProduccion {
  totalGastosMercadeo: number;
  totalCostosOperacion: number;
  totalGastosProduccion: number;
  totalCostoProduccionUnitario: number;
  precioVentaUnitario: number;
  margenUtilidadUnitario: number;
}

export const materiaPrimaDirectaSchema = z.object({
  nombre: z.string(),
  unidadMedida: z.string(),
  cantidad: z.number(),
  costoUnitario: z.number(),
  costoTotal: z.number(),
});

export type MateriaPrimaDirectaForm = z.infer<typeof materiaPrimaDirectaSchema>;

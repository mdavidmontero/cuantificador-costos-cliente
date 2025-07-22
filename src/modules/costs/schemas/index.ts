import { z } from "zod";

export const RegistroCostosFormSchema = z.object({
  productoId: z.number().int(),
  cantidadProducida: z.number(),
  unidadMedida: z.string(),
  perdidasEstimadas: z.number(),
  cantidadesFinales: z.number(),

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
      cantidad: z.number(),
      costoUnitario: z.number(),
      costoTotal: z.number(),
    })
  ),

  costosGenerales: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
    })
  ),

  costosOperacion: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
    })
  ),

  gastosVentas: z.array(
    z.object({
      nombre: z.string(),
      valorTotal: z.number(),
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

// Producto
export const ProductoZod = z.object({
  id: z.number(),
  nombre: z.string(),
  organizacionId: z.string(),
});

// Organización
export const OrganizationZod = z.object({
  id: z.string(),
  name: z.string(),
  nit: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Costos Generales / Gastos de Ventas
export const CostosGeneraleZod = z.object({
  id: z.number(),
  nombre: z.string(),
  valorTotal: z.number(),
  organizationId: z.string(),
  registroId: z.string(),
  createdAt: z.coerce.date(),
});

// Costos Indirectos Fabricación y Mano de Obra
export const CostosIndirectosFabricacionZod = z.object({
  id: z.number(),
  nombre: z.string().optional(),
  name: z.string().optional(),
  unidadMedida: z.string(),
  cantidad: z.number(),
  costoUnitario: z.number(),
  costoTotal: z.number(),
  organizationId: z.string(),
  registroId: z.string(),
  createdAt: z.coerce.date().optional(),
});

// Costo Producción
export const CostoProduccionZod = z.object({
  id: z.string(),
  registroId: z.string(),
  totalGastosMercadeo: z.number().nullable(),
  totalCostosOperacion: z.number(),
  totalGastosProduccion: z.number(),
  totalCostoProduccionUnitario: z.number(),
  precioVentaUnitario: z.number(),
  margenUtilidadUnitario: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  organizationId: z.string(),
});

// SchemaCost principal
export const SchemaCostZod = z.object({
  id: z.string(),
  date: z.coerce.date(),
  productoId: z.number(),
  organizationId: z.string(),
  unidadMedida: z.string(),
  cantidadProducida: z.number(),
  perdidasEstimadas: z.number(),
  cantidadesFinales: z.number(),
  createdAt: z.coerce.date(),

  producto: ProductoZod.optional(),
  organization: OrganizationZod.optional(),
  costoProduccion: CostoProduccionZod.optional(),

  materiaPrimaDirecta: z.array(CostosIndirectosFabricacionZod).optional(),
  manoObraDirecta: z.array(CostosIndirectosFabricacionZod).optional(),
  costosIndirectosFabricacion: z
    .array(CostosIndirectosFabricacionZod)
    .optional(),
  manoObraIndirecta: z.array(CostosIndirectosFabricacionZod).optional(),
  costosGenerales: z.array(CostosGeneraleZod).optional(),
  costosOperacion: z.array(z.any()).optional(),
  gastosVentas: z.array(CostosGeneraleZod).optional(),
});

export type SchemaCost = z.infer<typeof SchemaCostZod>;
export type Producto = z.infer<typeof ProductoZod>;
export type Organization = z.infer<typeof OrganizationZod>;
export type CostoProduccionSchema = z.infer<typeof CostoProduccionZod>;
export type CostosGenerale = z.infer<typeof CostosGeneraleZod>;
export type CostosIndirectosFabricacion = z.infer<
  typeof CostosIndirectosFabricacionZod
>;

export const schemaListCostsZod = z.array(SchemaCostZod);

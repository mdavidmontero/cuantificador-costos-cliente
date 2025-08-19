import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, DollarSign } from "lucide-react";
import useConfigStore from "../store/useConfigStore";
import { formattCurrency } from "@/lib";
import { toast } from "sonner";

export default function ConfiguracionForm() {
  const { salarioMinimoLegal, setSalarioMinimoLegal } = useConfigStore();
  const [tempSalario, setTempSalario] = useState(salarioMinimoLegal.toString());

  const handleSave = () => {
    const nuevoSalario = parseFloat(tempSalario);
    if (isNaN(nuevoSalario) || nuevoSalario <= 0) {
      toast.error("Por favor ingrese un valor válido para el salario mínimo");
      return;
    }
    
    setSalarioMinimoLegal(nuevoSalario);
    toast.success("Salario mínimo legal actualizado correctamente");
  };

  const handleReset = () => {
    setTempSalario(salarioMinimoLegal.toString());
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Configuración del Sistema
        </h1>
        <p className="text-gray-600">
          Administra las variables globales del sistema de costos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Salario Mínimo Legal Vigente
          </CardTitle>
          <CardDescription>
            Este valor se utiliza como referencia en los cálculos de mano de obra directa.
            Actualízalo según la normativa vigente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salario">Valor Actual</Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span className="text-lg font-semibold text-green-600">
                  {formattCurrency(salarioMinimoLegal)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nuevoSalario">Nuevo Valor</Label>
              <Input
                id="nuevoSalario"
                type="number"
                value={tempSalario}
                onChange={(e) => setTempSalario(e.target.value)}
                placeholder="Ingrese el nuevo salario mínimo"
                className="text-right"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={tempSalario === salarioMinimoLegal.toString()}
            >
              Restablecer
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={tempSalario === salarioMinimoLegal.toString()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Los cambios se aplicarán inmediatamente a todos los 
              cálculos de mano de obra directa. Los registros existentes mantendrán 
              sus valores calculados originales.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
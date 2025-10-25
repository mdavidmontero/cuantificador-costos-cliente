import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { CostoProduccionSchema } from "../schemas";
import { useLocation } from "react-router";

interface ModalConfirmCostProps {
  handleDeleteCost: (id: CostoProduccionSchema["id"]) => void;
  children?: React.ReactNode;
}

export function ModalConfirmCost({
  handleDeleteCost,
  children,
}: ModalConfirmCostProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deleteItem = queryParams.get("handleDelete")!;
  const handleEliminar = () => {
    handleDeleteCost(deleteItem);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta seguro que desea eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEliminar}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

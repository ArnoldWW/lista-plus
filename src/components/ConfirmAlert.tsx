import React from "react";
import { IonAlert } from "@ionic/react";

interface ConfirmAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header = "Confirmar",
  message = "¿Estás seguro?",
  confirmText = "Aceptar",
  cancelText = "Cancelar"
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={header}
      message={message}
      buttons={[
        {
          text: cancelText,
          role: "cancel",
          handler: onClose // Acción al cancelar
        },
        {
          text: confirmText,
          role: "destructive",
          handler: onConfirm // Acción al confirmar
        }
      ]}
    />
  );
};

export default ConfirmAlert;

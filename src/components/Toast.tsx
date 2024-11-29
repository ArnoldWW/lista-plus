import React from "react";
import { IonToast } from "@ionic/react";

interface ToastProps {
  isOpen: boolean;
  message: string;
  duration?: number;
  onDidDismiss?: () => void;
  color?: "success" | "warning" | "danger" | "primary" | "secondary";
}

const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  duration = 2000,
  onDidDismiss,
  color = "primary"
}) => {
  return (
    <IonToast
      isOpen={isOpen}
      message={message}
      duration={duration}
      onDidDismiss={onDidDismiss}
      color={color}
    />
  );
};

export default Toast;

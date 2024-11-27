import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton
} from "@ionic/react";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  defaultHref?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  defaultHref = "/"
}) => {
  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref} />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;

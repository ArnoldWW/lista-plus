import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import PageHeader from "../components/PageHeader";
import Toast from "../components/Toast";

const EditGroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { taskGroups, updateTaskGroupName } = useTaskContext();
  const history = useHistory();

  const group = taskGroups.find((group) => group.id === groupId);
  const [newName, setNewName] = useState(group?.name || "");
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    if (newName.trim() === "") {
      setShowToast(true);
      return;
    }

    if (newName.trim() && group) {
      updateTaskGroupName(groupId, newName);
      history.goBack(); // Regresa a la página anterior
    }
  };

  return (
    <IonPage>
      <PageHeader
        title="Editar Grupo"
        showBackButton={true}
        defaultHref={`/tasks/${groupId}`}
      />

      <IonContent className="ion-padding">
        <IonLabel position="stacked">Nuevo Nombre</IonLabel>
        <IonInput
          value={newName}
          placeholder="Ingrese el nuevo nombre del grupo"
          onIonInput={(e) => setNewName(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleSave}>
          Guardar Cambios
        </IonButton>

        <Toast
          isOpen={showToast}
          message={"El nombre del grupo no puede estar vacío."}
          onDidDismiss={() => setShowToast(false)}
          color={"danger"}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditGroupPage;

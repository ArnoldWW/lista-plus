import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonLabel
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import PageHeader from "../components/PageHeader";

const EditGroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { taskGroups, updateTaskGroupName } = useTaskContext();
  const history = useHistory();

  const group = taskGroups.find((group) => group.id === groupId);
  const [newName, setNewName] = useState(group?.name || "");

  const handleSave = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default EditGroupPage;

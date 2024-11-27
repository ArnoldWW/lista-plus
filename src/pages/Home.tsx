import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonModal,
  IonImg
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

const HomePage: React.FC = () => {
  const { taskGroups, addTaskGroup } = useTaskContext();
  const history = useHistory();
  const [newGroupName, setNewGroupName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddGroup = () => {
    console.log(newGroupName);

    if (newGroupName.trim()) {
      addTaskGroup(newGroupName);
      setNewGroupName("");
      setShowModal(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonImg
              src="/logo.svg"
              alt="logo"
              style={{ width: "150px", margin: "0 auto" }}
            />
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonList>
          {taskGroups.length > 0 ? (
            taskGroups.map((group) => {
              const completedTasks = group.tasks.filter(
                (task) => task.completed
              ).length;
              const totalTasks = group.tasks.length;

              return (
                <IonItem
                  key={group.id}
                  button
                  onClick={() => history.push(`/tasks/${group.id}`)}
                >
                  {group.name} ({completedTasks}/{totalTasks})
                </IonItem>
              );
            })
          ) : (
            <IonItem>No hay grupo de tareas.</IonItem>
          )}
        </IonList>

        <IonButton expand="block" onClick={() => setShowModal(true)}>
          Agregar Nuevo Grupo
        </IonButton>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nuevo Grupo de Tareas</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonLabel position="stacked">Nombre del Grupo</IonLabel>
            <IonInput
              value={newGroupName}
              placeholder="Ingrese el nombre del grupo"
              onIonInput={(e) => setNewGroupName(e.detail.value!)}
            />

            <IonButton expand="block" onClick={handleAddGroup}>
              Crear Grupo
            </IonButton>
            <IonButton
              expand="block"
              color="danger"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

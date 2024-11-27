import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCheckbox,
  IonLabel,
  IonIcon,
  IonAlert
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

import { trash, pencil } from "ionicons/icons";
import { useState } from "react";
import ConfirmAlert from "../components/ConfirmAlert";
import PageHeader from "../components/PageHeader";

const TaskListPage: React.FC = () => {
  const { taskGroups, deleteTask, toggleTaskCompletion, deleteTaskGroup } =
    useTaskContext();
  const { groupId } = useParams<{ groupId: string }>();
  const history = useHistory();

  const [showAlertTask, setShowAlertTask] = useState(false); // Estado del modal
  const [showAlertGroup, setShowAlertGroup] = useState(false); // Estado del modal

  // ID de la tarea a eliminar
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  /* id de el grupo a eliminar */
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const group = taskGroups.find((group) => group.id === groupId);

  const handleDeleteGroup = () => {
    console.log(`Eliminar grupo ${groupId}`);
    if (groupToDelete) {
      deleteTaskGroup(groupId);
      setGroupToDelete(null);
    }

    setShowAlertGroup(false);
    history.goBack();
  };

  const handleDeleteTask = () => {
    if (taskToDelete && groupId) {
      deleteTask(groupId, taskToDelete); // Elimina la tarea
      setTaskToDelete(null); // Resetea la tarea seleccionada
    }
    setShowAlertTask(false); // Cierra el modal
  };

  return (
    <IonPage>
      <PageHeader title={`Tareas - ${group?.name}`} showBackButton={true} />

      <IonContent fullscreen={true} className="ion-padding">
        <IonList>
          {group?.tasks.length === 0 ? (
            <IonItem>No hay tareas</IonItem>
          ) : (
            group?.tasks.map((task) => (
              <IonItem key={task.id}>
                <IonLabel
                  style={{
                    textDecoration: task.completed ? "line-through" : "none"
                  }}
                >
                  {task.name}
                </IonLabel>
                <IonCheckbox
                  slot="start"
                  checked={task.completed}
                  onIonChange={() => toggleTaskCompletion(groupId, task.id)}
                />
                <IonButton
                  slot="end"
                  color="primary"
                  onClick={() =>
                    history.push(`/tasks/${groupId}/edit/${task.id}`)
                  }
                >
                  <IonIcon icon={pencil}></IonIcon>
                </IonButton>
                <IonButton
                  slot="end"
                  color="danger"
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setShowAlertTask(true);
                  }}
                >
                  <IonIcon icon={trash}></IonIcon>
                </IonButton>
              </IonItem>
            ))
          )}
        </IonList>

        <IonButton
          expand="block"
          color="primary"
          onClick={() => history.push(`/tasks/${groupId}/add`)}
        >
          Agregar Nueva Tarea
        </IonButton>

        <IonButton
          expand="block"
          color="warning"
          onClick={() => history.push(`/tasks/${groupId}/edit-group`)}
        >
          Editar Nombre del Grupo
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={() => {
            setGroupToDelete(group.id);
            setShowAlertGroup(true);
          }}
        >
          Eliminar Grupo
        </IonButton>

        <ConfirmAlert
          isOpen={showAlertGroup}
          onClose={() => setShowAlertGroup(false)}
          onConfirm={handleDeleteGroup}
          header="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar este grupo y todas sus tareas?"
          confirmText="Eliminar"
          cancelText="Cancelar"
        />

        <ConfirmAlert
          isOpen={showAlertTask}
          onClose={() => setShowAlertTask(false)}
          onConfirm={handleDeleteTask}
          header="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar?"
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskListPage;

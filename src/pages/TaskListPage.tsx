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
  IonIcon
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

import { trash, pencil } from "ionicons/icons";

const TaskListPage: React.FC = () => {
  const { taskGroups, deleteTask, toggleTaskCompletion } = useTaskContext();
  const { groupId } = useParams<{ groupId: string }>();
  const history = useHistory();

  const group = taskGroups.find((group) => group.id === groupId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle>Tareas - {group?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
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
                  onClick={() => deleteTask(groupId, task.id)}
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
      </IonContent>
    </IonPage>
  );
};

export default TaskListPage;

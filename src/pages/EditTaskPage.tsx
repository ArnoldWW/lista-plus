import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonFooter,
  IonButtons,
  IonBackButton,
  IonLabel
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const EditTaskPage: React.FC = () => {
  const { taskGroups, updateTask } = useTaskContext();
  const history = useHistory();
  const { groupId, taskId } = useParams<{ taskId: string; groupId: string }>();
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    const group = taskGroups.find((group) => group.id === groupId);
    const task = group?.tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskName(task.name);
    }
  }, []);

  const handleSave = () => {
    console.log(`Guardar cambios en la tarea ${taskId}: ${taskName}`);

    if (taskName.trim() === "") return;

    //actualizar la tarea
    updateTask(groupId, taskId, taskName);
    history.goBack();
    setTaskName("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/tasks/${taskId}`}></IonBackButton>
          </IonButtons>

          <IonTitle>Editar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonLabel position="stacked">Nombre de la Tarea</IonLabel>
        <IonInput
          value={taskName}
          placeholder="Nombre de la Tarea"
          onIonInput={(e) => setTaskName(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleSave}>
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditTaskPage;

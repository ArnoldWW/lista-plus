import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import PageHeader from "../components/PageHeader";
import Toast from "../components/Toast";

const EditTaskPage: React.FC = () => {
  const { taskGroups, updateTask } = useTaskContext();
  const history = useHistory();
  const { groupId, taskId } = useParams<{ taskId: string; groupId: string }>();
  const [taskName, setTaskName] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const group = taskGroups.find((group) => group.id === groupId);
    const task = group?.tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskName(task.name);
    }
  }, []);

  const handleSave = () => {
    console.log(`Guardar cambios en la tarea ${taskId}: ${taskName}`);

    if (taskName.trim() === "") {
      setShowToast(true);
      return;
    }

    //actualizar la tarea
    updateTask(groupId, taskId, taskName);
    history.goBack();
    setTaskName("");
  };

  return (
    <IonPage>
      <PageHeader
        title={`Editar Tarea - ${taskName}`}
        showBackButton={true}
        defaultHref="/"
      />

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

        <Toast
          isOpen={showToast}
          message={"El nombre de la tarea no puede estar vacío."}
          onDidDismiss={() => setShowToast(false)}
          color={"danger"}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditTaskPage;

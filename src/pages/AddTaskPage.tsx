import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import PageHeader from "../components/PageHeader";
import Toast from "../components/Toast";

const AddTaskPage: React.FC = () => {
  const { addTask } = useTaskContext();
  const { groupId } = useParams<{ groupId: string }>();
  const history = useHistory();
  const [taskName, setTaskName] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleAddTask = () => {
    //console.log(`Nueva tarea para el grupo ${groupId}: ${taskName}`);
    if (taskName === "") {
      setShowToast(true);
      return;
    }

    addTask(groupId, taskName);

    // Regresa a la pantalla de listado de tareas después de agregar la nueva tarea
    history.goBack();
  };

  return (
    <IonPage>
      <PageHeader title="Agregar Nueva Tarea" showBackButton={true} />

      <IonContent fullscreen={true} className="ion-padding">
        <IonLabel position="stacked">Nombre de la Tarea</IonLabel>
        <IonInput
          value={taskName}
          placeholder="Ingrese el nombre de la tarea"
          onIonInput={(e) => setTaskName(e.detail.value!)}
        />

        <IonButton expand="block" onClick={handleAddTask}>
          Guardar Tarea
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

export default AddTaskPage;

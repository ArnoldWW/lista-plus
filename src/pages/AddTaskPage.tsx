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

const AddTaskPage: React.FC = () => {
  const { addTask } = useTaskContext();
  const { groupId } = useParams<{ groupId: string }>();
  const history = useHistory();
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    //console.log(`Nueva tarea para el grupo ${groupId}: ${taskName}`);

    if (taskName === "") return;

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
      </IonContent>
    </IonPage>
  );
};

export default AddTaskPage;

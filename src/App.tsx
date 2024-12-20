import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import HomePage from "./pages/Home";
import TaskListPage from "./pages/TaskListPage";
import EditTaskPage from "./pages/EditTaskPage";
import AddTaskPage from "./pages/AddTaskPage";
import EditGroupPage from "./pages/EditGroupPage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tasks/:groupId" component={TaskListPage} />
        <Route
          exact
          path="/tasks/:groupId/edit/:taskId"
          component={EditTaskPage}
        />
        <Route exact path="/tasks/:groupId/add" component={AddTaskPage} />
        <Route path="/tasks/:groupId/edit-group" component={EditGroupPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

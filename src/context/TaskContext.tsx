import React, { createContext, useState, useContext, useEffect } from "react";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
}

interface TaskContextType {
  taskGroups: TaskGroup[];
  addTaskGroup: (name: string) => void;
  addTask: (groupId: string, taskName: string) => void;
  toggleTaskCompletion: (groupId: string, taskId: string) => void;
  updateTask: (groupId: string, taskId: string, taskName: string) => void;
  deleteTask: (groupId: string, taskId: string) => void;
  deleteTaskGroup: (groupId: string) => void;
  updateTaskGroupName: (groupId: string, newName: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  //const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(() => {
    const storedData = localStorage.getItem("taskGroups");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Guardar los datos cada vez que cambien
  useEffect(() => {
    localStorage.setItem("taskGroups", JSON.stringify(taskGroups));
  }, [taskGroups]);

  const addTaskGroup = (name: string) => {
    const newGroup: TaskGroup = {
      id: String(taskGroups.length + 1),
      name,
      tasks: []
    };
    setTaskGroups([...taskGroups, newGroup]);
  };

  const addTask = (groupId: string, taskName: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: [
                ...group.tasks,
                {
                  id: String(group.tasks.length + 1),
                  name: taskName,
                  completed: false
                }
              ]
            }
          : group
      )
    );
  };

  const toggleTaskCompletion = (groupId: string, taskId: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : group
      )
    );
  };

  const updateTask = (groupId: string, taskId: string, taskName: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId ? { ...task, name: taskName } : task
              )
            }
          : group
      )
    );
  };

  const deleteTask = (groupId: string, taskId: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.filter((task) => task.id !== taskId)
            }
          : group
      )
    );
  };

  const deleteTaskGroup = (groupId: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  const updateTaskGroupName = (groupId: string, newName: string) => {
    setTaskGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId ? { ...group, name: newName } : group
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        taskGroups,
        addTaskGroup,
        addTask,
        toggleTaskCompletion,
        updateTask,
        deleteTask,
        deleteTaskGroup,
        updateTaskGroupName
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  return context;
};

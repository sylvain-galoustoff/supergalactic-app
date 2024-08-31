import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.ts";
import { apiResponseType } from "../models/apiResponse";
import { store } from "../redux/store.ts";
import { TaskType } from "../models/task.ts";
import { storeTask } from "../redux/TaskSlice.ts";
import { EventType } from "../models/event.ts";
import { registerEvent } from "./eventApi.ts";

export const observeTasks = () => {
  const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as TaskType);
    store.dispatch(storeTask(data));
  });
  return unsubscribe;
};

export const registerTask = async (form: TaskType): Promise<apiResponseType> => {
  if (form.taskName) {
    const newDocument = { ...form };
    const id = Date.now().toString();
    newDocument.id = id;
    newDocument.uid = store.getState().user.uid;

    const projects = store.getState().projects;
    const clientId = projects.find((project) => project.id === form.projectId)?.clientId;

    const eventForm: EventType = {
      uid: store.getState().user.uid,
      id: Date.now().toString(),
      eventName: newDocument.taskName,
      date: newDocument.deadline,
      time: "00:00",
      taskId: id,
      projectId: form.projectId,
      clientId: clientId ? clientId : "",
    };

    try {
      await Promise.all([
        registerEvent(eventForm),
        setDoc(doc(db, "tasks", id), newDocument),
      ]);
      return {
        success: true,
        message: `Nouvelle tâche "${newDocument.taskName}" enregistré.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          "Erreur d'enregistrement d'un nouveau document dans la table des tâches.",
      };
    }
  } else {
    return {
      success: false,
      message: `Le champ "Nom du client" est requis.`,
    };
  }
};

export const patchTask = async (
  taskId: string,
  key: string,
  value: string
): Promise<apiResponseType> => {
  const docRef = doc(db, "tasks", taskId);

  try {
    await updateDoc(docRef, { [key]: value });
    return {
      success: true,
      message: `Statut modifié`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erreur serveur : modification impossible pour l'instant`,
    };
  }
};

export const updateTask = async (payload: TaskType): Promise<apiResponseType> => {
  const docRef = doc(db, "tasks", payload.id);

  try {
    await updateDoc(docRef, payload);
    return {
      success: true,
      message: `la tâche ${payload.taskName} a été modifiée.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Echec de mise à jour de la tâche " + payload.id,
    };
  }
};

export const deleteTask = async (task: TaskType): Promise<apiResponseType> => {
  try {
    const docRef = doc(db, "tasks", task.id);
    await deleteDoc(docRef);
    return {
      success: true,
      message: `La tâche ${task.taskName} a été supprimé.`,
    };
  } catch (error) {
    console.error("Erreur de suppression du document " + task.id);
    console.error(error);
    return {
      success: false,
      message: `Erreur serveur : la suppression a échoué.`,
    };
  }
};

/* FETCH STORE */

export const getProjectNameFromProjectId = (projectId: string) => {
  const projectsStore = store.getState().projects;
  const query = projectsStore.find((project) => project.id === projectId);

  if (query) {
    return query.projectName;
  } else {
    return "Aucun projet";
  }
};

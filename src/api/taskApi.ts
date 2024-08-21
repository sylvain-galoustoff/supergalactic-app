import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ClientType } from "../models/client";
import { db } from "../firebase.ts";
import { apiResponseType } from "../models/apiResponse";
import { store } from "../redux/store.ts";
import { TaskType } from "../models/task.ts";
import { storeTask } from "../redux/TaskSlice.ts";

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

    try {
      await setDoc(doc(db, "tasks", id), newDocument);
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

export const updateClient = async (payload: ClientType): Promise<apiResponseType> => {
  const docRef = doc(db, "clients", payload.id);

  try {
    await updateDoc(docRef, payload);
    return {
      success: true,
      message: `le client ${payload.clientName} a été modifié.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Echec de mise à jour du client " + payload.id,
    };
  }
};

export const deleteClient = async (client: ClientType): Promise<apiResponseType> => {
  try {
    const docRef = doc(db, "clients", client.id);
    await deleteDoc(docRef);
    return {
      success: true,
      message: `Le client ${client.clientName} a été supprimé.`,
    };
  } catch (error) {
    console.error("Erreur de suppression du document " + client.id);
    console.error(error);
    return {
      success: false,
      message: `Erreur serveur : la suppression a échoué.`,
    };
  }
};

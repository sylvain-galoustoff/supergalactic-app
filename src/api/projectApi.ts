import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ProjectType } from "../models/project";
import { db } from "../firebase.ts";
import { apiResponseType } from "../models/apiResponse";
import { store } from "../redux/store.ts";
import { storeProject } from "../redux/ProjectSlice.ts";

export const observeProjects = () => {
  const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as ProjectType);
    store.dispatch(storeProject(data));
  });
  return unsubscribe;
};

export const registerProject = async (form: ProjectType): Promise<apiResponseType> => {
  if (form.projectName) {
    const newDocument = { ...form };
    const id = Date.now().toString();
    newDocument.id = id;

    try {
      await setDoc(doc(db, "projects", id), newDocument);
      return {
        success: true,
        message: `${newDocument.projectName} enregistré.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erreur d'enregistrement d'un nouveau document dans la table Projets.",
      };
    }
  } else {
    return {
      success: false,
      message: `Le champ "Nom du projet" est requis.`,
    };
  }
};

export const updateProject = async (payload: ProjectType) => {
  const docRef = doc(db, "projects", payload.id);

  try {
    await updateDoc(docRef, payload);
    return {
      success: true,
      message: `le projet ${payload.projectName} a été modifié.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Echec de mise à jour du projet " + payload.id,
    };
  }
};

export const deleteProject = async (project: ProjectType) => {
  try {
    const docRef = doc(db, "projects", project.id);
    await deleteDoc(docRef);
    return {
      success: true,
      message: `Le projet ${project.projectName} a été supprimé.`,
    };
  } catch (error) {
    console.error("Erreur de suppression du document " + project.id);
    console.error(error);
    return {
      success: false,
      message: `Erreur serveur : la suppression a échoué.`,
    };
  }
};

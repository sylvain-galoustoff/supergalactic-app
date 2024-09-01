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
import { EventType } from "../models/event.ts";
import { storeEvent } from "../redux/eventsSlice.ts";

export const observeEvents = () => {
  const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as EventType);
    store.dispatch(storeEvent(data));
  });
  return unsubscribe;
};

export const registerEvent = async (form: EventType): Promise<apiResponseType> => {
  if (form.eventName) {
    const newDocument = { ...form };
    const id = Date.now().toString();
    newDocument.id = id;
    newDocument.uid = store.getState().user.uid;

    try {
      await setDoc(doc(db, "events", id), newDocument);
      return {
        success: true,
        message: `${newDocument.eventName} enregistré.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          "Erreur d'enregistrement d'un nouveau document dans la table des événements.",
      };
    }
  } else {
    return {
      success: false,
      message: `Le champ "Nom de l'événement" est requis.`,
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

export const deleteEvent = async (event: EventType): Promise<apiResponseType> => {
  try {
    const docRef = doc(db, "events", event.id);
    await deleteDoc(docRef);
    return {
      success: true,
      message: `L'événement "${event.eventName}" a été supprimé.`,
    };
  } catch (error) {
    console.error("Erreur de suppression du document " + event.id);
    console.error(error);
    return {
      success: false,
      message: `Erreur serveur : la suppression a échoué.`,
    };
  }
};

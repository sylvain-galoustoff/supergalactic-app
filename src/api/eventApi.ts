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
import { storeClients } from "../redux/clientSlice.ts";
import { EventType } from "../models/event.ts";

export const observeClients = () => {
  const unsubscribe = onSnapshot(collection(db, "clients"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as ClientType);
    store.dispatch(storeClients(data));
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

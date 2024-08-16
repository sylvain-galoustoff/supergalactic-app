import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { ClientType } from "../models/client";
import { db } from "../firebase.ts";
import { apiResponseType } from "../models/apiResponse";
import { store } from "../redux/store.ts";
import { storeClients } from "../redux/clientSlice.ts";

export const observeClients = () => {
  const unsubscribe = onSnapshot(collection(db, "clients"), (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as ClientType);
    store.dispatch(storeClients(data));
  });
  return unsubscribe;
};

export const registerClient = async (form: ClientType): Promise<apiResponseType> => {
  if (form.clientName) {
    const newDocument = { ...form };
    const id = Date.now().toString();
    newDocument.id = id;

    try {
      await setDoc(doc(db, "clients", id), newDocument);
      return {
        success: true,
        message: `${newDocument.clientName} enregistré.`,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erreur d'enregistrement d'un nouveau document dans la table clients.",
      };
    }
  } else {
    return {
      success: false,
      message: `Le champ "Nom du client" est requis.`,
    };
  }
};

export const deleteClient = async (client: ClientType) => {
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

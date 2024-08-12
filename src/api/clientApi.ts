import { doc, setDoc } from "firebase/firestore";
import { ClientType } from "../models/client";
import { db } from "../firebase";
import { apiResponseType } from "../models/apiResponse";

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

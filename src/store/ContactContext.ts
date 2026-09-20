import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import type { ContactAction, ContactState } from "./contactReducer";

interface ContactContextValue {
  state: ContactState;
  dispatch: Dispatch<ContactAction>;
}

export const ContactContext = createContext<ContactContextValue | null>(null);

// Use this hook inside any component to read the contact form state or dispatch actions.
export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used inside <ContactProvider>");
  }
  return context;
};

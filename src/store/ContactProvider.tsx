import { useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { ContactContext } from "./ContactContext";
import { contactReducer, initialContactState } from "./contactReducer";

const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export default ContactProvider;

export type ContactStatus = "idle" | "sending" | "sent" | "error";

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactState {
  fields: ContactFields;
  status: ContactStatus;
}

export type ContactAction =
  | { type: "FIELD_CHANGED"; field: keyof ContactFields; value: string }
  | { type: "SUBMIT_STARTED" }
  | { type: "SUBMIT_SUCCEEDED" } // message sent: form is cleared
  | { type: "EMAIL_APP_OPENED" } // fallback: visitor's email app opened, fields are kept
  | { type: "SUBMIT_FAILED" }; // fields are kept so nothing typed is lost

export const initialContactState: ContactState = {
  fields: { name: "", email: "", message: "" },
  status: "idle",
};

export const contactReducer = (
  state: ContactState,
  action: ContactAction
): ContactState => {
  switch (action.type) {
    case "FIELD_CHANGED":
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
      };
    case "SUBMIT_STARTED":
      return { ...state, status: "sending" };
    case "SUBMIT_SUCCEEDED":
      return { fields: initialContactState.fields, status: "sent" };
    case "EMAIL_APP_OPENED":
      return { ...state, status: "sent" };
    case "SUBMIT_FAILED":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

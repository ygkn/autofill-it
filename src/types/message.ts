export type Message =
  | {
      type: "change-contextmenu-checked";
      payload: {
        currentAutocomplete: string;
      };
    }
  | {
      type: "set-autocomplete";
      payload: {
        newAutocomplete: string;
      };
    };

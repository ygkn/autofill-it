export type Message =
  | {
      type: "contextmenu-opened";
      payload: {
        currentAutocomplete: string;
      };
    }
  | {
      type: "contextmenu-closed";
      payload: {
        newAutocomplete: string;
      };
    };

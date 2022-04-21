import type { Message } from "./types/message";

type Autocompletable = HTMLElement & { autocomplete: string };

let targetInputElement: Autocompletable | null = null;

document.addEventListener("contextmenu", (event) => {
  if (!(event.target instanceof HTMLElement)) return;

  targetInputElement =
    event
      .composedPath()
      .find(
        (el): el is Autocompletable =>
          el instanceof HTMLElement && "autocomplete" in el
      ) ?? null;

  if (targetInputElement !== null) {
    chrome.runtime.sendMessage<Message>({
      type: "contextmenu-opened",
      payload: { currentAutocomplete: targetInputElement.autocomplete },
    });
  }
});

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  if (message.type === "contextmenu-closed" && targetInputElement !== null) {
    targetInputElement.autocomplete = message.payload.newAutocomplete;
  }
  sendResponse();
});

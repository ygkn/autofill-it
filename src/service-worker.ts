import { Message } from "./message";

export const autocompletes = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "username", label: "User Name" },
  { value: "new-password", label: "New Password" },
  { value: "current-password", label: "Current Password" },
];

chrome.runtime.onInstalled.addListener(() => {
  for (const autocomplete of autocompletes) {
    chrome.contextMenus.create({
      title: autocomplete.label,
      type: "radio",
      checked: false,
      id: autocomplete.value,
      contexts: ["editable"],
    });
  }
});

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
  if (message.type === "contextmenu-opened") {
    const currentAutocomplete =
      message.payload.currentAutocomplete === ""
        ? "on"
        : message.payload.currentAutocomplete;
    for (const autocomplete of autocompletes) {
      chrome.contextMenus.update(autocomplete.value, {
        checked: currentAutocomplete === autocomplete.value,
      });
    }
  }
  sendResponse();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab?.id === undefined || typeof info.menuItemId !== "string") {
    return;
  }

  chrome.tabs.sendMessage<Message>(tab.id, {
    type: "contextmenu-closed",
    payload: {
      newAutocomplete: info.menuItemId,
    },
  });
});

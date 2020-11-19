import React from "react";

export class NotePack {
  constructor() {
    // todo: add code to make list be fetched data from api
    this.list = [
    ]
    this.focused = null;
  }

  getFocused() {
    if (this.focused === null) {
      return null;
    } else {
      return this.list.filter((note) => note.key === this.focused)[0];
    }
  }

  get notes() {
    return this.list;
  }

  setFocused(key) {
    this.focused = key;
  }
}

export const NotesContext = React.createContext({
  notePack: null,
});

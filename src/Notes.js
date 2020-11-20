import React from "react";

export class NotePack {
  constructor() {

    this.list = [];
      fetch('https://predestination-service.herokuapp.com/clues')
      .then((response) => response.json())
      .then((json) => {
        this.list = json.clues;
      })
      .catch((error) => {
        console.error(error);
      });
    this.focused = null;
  };

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

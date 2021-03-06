import React from "react";

export class NotePack {
  constructor() {

    this.list = [];
    let f = this;
      // fetch('https://predestination-service.herokuapp.com/clues')
      // .then((response) => response.json())
      // .then((json) => {
      //   this.list = json.map(note => {
      //     return {
      //       ...note,
      //       clue: note.description,
      //       key: note.id,
      //       archived: false,
      //     }
      //   });
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    this.focused = null;
  };     


  getFocused() {
      if (this.focused === null) {
          return null;
      } else {
          return this.list.filter(note => note.key === this.focused)[0];
      }
    }

  get notes() {
      return this.list;
  }

  setFocused(key) {
      this.focused = key;
  }

  foundClue() {
      if (this.focused !== null) {
          this.list.filter(note => note.key === this.focused)[0].archived = true;
          //UPDATE database with this.focused as key
      }
  }

  getPoints() {
      return this.list
      .filter(note => note.archived === true)
      .reduce((acc, curr) => {
          return acc + parseInt(curr.points);
      }, 0);
  };
}

export const GameContext = React.createContext({
  points: 0,
  clueData: [],
  playerData: [],
  gameLog: [],
  selectedClue: null,
  setSelectedClue: () => {},
  findClue: () => {},
  setupGame: () => {},
  playerID: null,
});

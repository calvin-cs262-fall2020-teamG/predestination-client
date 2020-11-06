import React from 'react';

export class NotePack {

    constructor() {
        // todo: add code to make list be fetched data from api
        this.list = [
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '0' },
            { clue: 'The better dining hall\'s entrance.', archived: true, points: 2, key: '1' },
            { clue: 'Not starbucks... Seriously, it isn\'t Starbucks.', archived: false, points: 2, key: '2' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '3' },
            { clue: '', archived: true, points: 5, key: '4' },
            { clue: 'The better dining hall\'s entrance', archived: true, points: 2, key: '5' },
            { clue: 'Not starbucks', archived: false, points: 2, key: '6' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '7' },
            { clue: 'What is holey, made out of metal, and yellow at Calvin?', archived: true, points: 5, key: '8' },
            { clue: 'The worst dining hall\'s entrance', archived: false, points: 5, key: '9' },
            { clue: 'Not starbucks', archived: false, points: 3, key: '10' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '11' },
        ];
        this.focused = null;
    }

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

}

export const NotesContext = React.createContext({
    notePack: null,
});
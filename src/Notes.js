import React from 'react';

export class NotePack {

    constructor() {
        // todo: add code to make list be fetched data from api
        this.list = [
            { clue: 'broken and musty, the color slowly decaying, full of holes but not quite tasty.', archived: true, points: 5, key: '0' },
            { clue: 'music in my ears, echoing throughout the room.', archived: false, points: 2, key: '2' },
            { clue: 'Time gate from urban jungle to the untouched woods. ', archived: true, points: 10, key: '3' },
            { clue: 'Late to class? Better wish you lived here.', archived: true, points: 5, key: '4' },
            { clue: 'Challenge yourself, take the climb.', archived: true, points: 2, key: '5' },
            { clue: 'Not starbucks', archived: false, points: 2, key: '6' },
            { clue: 'Only arcade on campus', archived: true, points: 10, key: '7' },
            { clue: '3 in one, cemeneted for all to see', archived: true, points: 5, key: '8' },
            { clue: 'Youll find ingrained messages upon this electrifying box, left behind in the dust.', archived: false, points: 5, key: '9' },
            { clue: 'lights coming from both directions, suspended above the strip', archived: false, points: 3, key: '10' },
            { clue: 'Spray painted and vandalized, once here, but now removed.', archived: true, points: 10, key: '11' },
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
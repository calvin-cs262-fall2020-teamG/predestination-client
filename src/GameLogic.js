import React from "react";
import io from 'socket.io-client';

// constructor todo:
// 1. log in to game sockets
// 2. get game snapshot which will be clues with people who got each clue
//
// getters
// 1. getPoints
// 2. unlockClue
// 3. getPlayerListSortedByPoints

const SOCKET_SERVER_ADDR;

export class GameAPI {

    data = null;
    clues = null;
    
    constructor(gameCode, playerID) {
        this.playerID = playerID;
        this.gameCode = gameCode;

        this.io = io(SOCKET_SERVER_ADDR); // connect to socket server
        
        // once connected to the server, start sending stuff
        this.io.on('connection', (socket) => {

            socket.emit('join-session', this.gameCode, this.playerID);

            socket.on('players-snapshot', (data, clues) => {
                this.data = data;
                this.clues = clues;
                
                // when another player unlocks a clue, update our local game to show that
                socket.on('update', (otherPlayerID, clueID, timeStamp) => {
                    this.data.push({ playerID: otherPlayerID, timeStamp, clueID });
                });
                
            });
            
        });
    }     

    getPoints() {
        return this.data
            .filter((elem) => { // get entries only pertaining to this user
                return elem.playerID === this.playerID;
            }) 
            .reduce((acc, curr) => { // add up points
                acc += this.clues[curr.clueID].points;
            }, 0);
    }

    foundClue(clueID) {
        this.io.emit('found-clue', this.gameCode, this.playerID, clueID, 100); //todo: figure out datetime
    }
    
    getPlayersRanked() {
        return this.data.reduce((acc, curr) => {

            const index = acc.findIndex((elem) => {
                return elem.playerID === curr.playerID;
            });

            const points = this.clues[curr.clueID].points;
            
            if (index > -1) {
                acc[index].points += points;
                acc[index].clues += 1;
            } else {
                acc.push({
                    playerID: curr.playerID,
                    points: points,
                    clues: 1,
                });
            }
        }, []);
    }
    
}

export const GameContext = React.createContext({
  GameAPI: null,
});


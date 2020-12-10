import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

// constructor todo:
// 1. log in to game sockets
// 2. get game snapshot which will be clues with people who got each clue
//
// getters
// 1. getPoints(): returns points for this user
// 2. unlockClue(): handles updating other people's game log to record this user unlocking a clue
// 3. getPlayerListSortedByPoints(): nice sorted list for leaderboard

const SOCKET_SERVER_ADDR = 'https://predestination-service.herokuapp.com';

export class GameAPI {

    data = [];
    clues = [];
    playerData = [];
    focusedClueID = null;

    constructor(gameCode, playerID) {
        this.playerID = playerID;
        this.gameCode = gameCode;

        this.io = io(SOCKET_SERVER_ADDR); // connect to socket server
        
        // once connected to the server, start sending stuff
	this.io.emit('join-session', this.gameCode, this.playerID);

	this.io.on('players-snapshot', (gameLog, playerData, clueData) => {
	    console.log('Received game snapshot...');
	    this.data = gameLog;
	    this.clues = clueData;
	    this.playerData = playerData;
	    console.log(this.data);
	    console.log(this.clues);
	    console.log(this.playerData);
	});

	this.io.on('update', (playerID, clueID, timeStamp) => {
	    this.data.push({ playerID: otherPlayerID, timeStamp, clueID });
	});
        // this.io.on('connect', (socket) => {
        //     console.log(this.io.id);

        //     socket.emit('join-session', this.gameCode, this.playerID);

        //     socket.on('players-snapshot', (gameLog, playerData, clueData) => {
        //         this.data = gameLog;
        //         this.clues = clueData;
        //         this.playerData = playerData;

        //         // when another player unlocks a clue, update our local game to show that
        //         socket.on('update', (otherPlayerID, clueID, timeStamp) => {
        //             this.data.push({ playerID: otherPlayerID, timeStamp, clueID });
        //         });

        //     });

        // });
    }     

    getPoints() {
        return (this.data === null) ? null : this.data
            .filter((elem) => { // get entries only pertaining to this user
                return elem.playerID === this.playerID;
            })
            .reduce((acc, curr) => { // add up points
                acc += this.clues[curr.clueID].points;
            }, 0);
    }

    setFocusedClue(clueID) {
        this.focusedClueID = clueID;
    }

    getFocusedClue() {
        return (this.focusedClueID === null) ? null : this.clues.filter((clue) => { this.focusedClueID === clue.id })[0];
    }
    
    foundClue() {
        this.io.emit('found-clue', this.gameCode, this.playerID, this.focusedClueID, 100); //todo: figure out datetime
    }
    
    /* getPlayersRanked()
     * returns players in sorted order convenient for leaderboard
     *
     * @returns:
     * array of
     * playerID
     * name
     * profileImageURL
     * points
     * lastUpdated (meaning when they got their last clue)
     * clueCount
     *
     */
    getPlayersRanked() {
        return this.data.reduce((acc, curr) => {

            const index = acc.findIndex((elem) => {
                return elem.playerID === curr.playerID;
            });

            const clue = this.clues[curr.clueID];
            
            if (index > -1) {
                acc[index].points += clue.points;
                acc[index].clueCount += 1;
                acc[index].lastUpdated = (clue.time > acc[index].lastUpdated) ? clue.time : acc[index].lastUpdated;
            } else {
                acc.push({
                    playerID: curr.playerID,
                    name: this.playerData[curr.playerID].name,
                    profileImageURL: this.playerData[curr.playerID].profilePictureURL,
                    points: clue.points,
                    lastUpdated: clue.time,
                    clueCount: 1,                    
                });
            }
        }, []).sort((a, b) => { // sort by points and if difference is zero sort by those who got it first
            const pointDifference = a.points - b.points;
            return (pointDifference === 0) ? b.lastUpdated - a.lastUpdated : a.points - b.points;
        });
    }
    
}

export const GameContext = React.createContext({
  GamePack: null,
});


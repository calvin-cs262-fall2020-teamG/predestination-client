export const PROXIMITY = {
    FAR: 'FAR',
    CLOSE: 'CLOSE',
    AT: 'AT',
    SUCCESS: 'SUCCESS'
}

/**
 * PROXIMITY_MESSAGES are messages sent to the seeker based on their proximity to a clue's location
 */
export const PROXIMITY_MESSAGES = {
    FAR: {
        official: 'Keep looking!',
        silly: [
            'Are we there yet?',
            'Zzzzzzz',
            'How much longer?',
            'I\'m bored',
        ]
    },
    CLOSE: {
        official: 'You are close!',
        silly: [
            'It\'s gotta be around here somewhere, right?',
            'It\'s over there. See?',
            'I told you it\'s over there. Not here. SMH',
        ],
    },
    AT: {
        official: 'You found it!',
        silly: [
            'Finally',
            'If you would\'ve listened to me, we would have gotten here a loooong time ago',
            'Nice one!',
            'And you thought I wasn\'t helpful. lol',
        ],
    },
    SUCCESS: {
        official: 'Congratulations!',
        silly: [
            'Finally',
            'If you would\'ve listened to me, we would have gotten here a loooong time ago',
            'Nice one!',
            'And you thought I wasn\'t helpful. lol',
        ],
    },
}




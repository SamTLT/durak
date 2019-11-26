const initialState = {
    cards: [],
    deck: [],
    enemyCards: [],
    trump: {},
    tableToBeat: [],
    tableBeated: [],
    status: '',
    enemyStatus: 'defense',
    cardsToUse: [],
    winner: null,
    enemyCardsNum: 0,
    cardsLeftInDeck: 0,
    cardSize: {
        width: 100,
        height: 150
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.payload
            };

        case 'SET_CARD_SIZE':
            return {
                ...state,
                cardSize: action.payload
            };


        case 'SET_CARDS':
            return {
                ...state,
                cards: [...action.payload]
            };

        case 'SET_CARDS_LEFT_IN_DECK':
            return {
                ...state,
                cardsLeftInDeck: action.payload
            };

        case 'SET_ENEMY_CARDS_NUMBER':
            return {
                ...state,
                enemyCardsNum: action.payload
            };

        case 'SET_DECK':
            return {
                ...state,
                deck: [...action.payload]
            };

        case 'SET_ENEMY_CARDS':
            return {
                ...state,
                enemyCards: [...action.payload]
            };

        case 'SET_TRUMP':
            return {
                ...state,
                trump: { ...action.payload }
            };

        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            };

        case 'SET_ENEMY_STATUS':
            return {
                ...state,
                enemyStatus: action.payload
            };

        case 'SET_CARDS_TO_USE':
            return {
                ...state,
                cardsToUse: [...action.payload]
            };

        case 'PUT_CARDS_ON_TABLE':
            return {
                ...state,
                tableToBeat: [...action.payload]
            };

        case 'BEAT_CARD_ON_TABLE':
            return {
                ...state,
                tableBeated: [...action.payload]
            };

        case 'CLEAN_TABLE':
            return {
                ...state,
                tableBeated: [],
                tableToBeat: []
            };

        default:
            return state;
    }
};

export default reducer;
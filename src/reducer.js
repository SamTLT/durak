const initialState = {
    cards: [],
    deck: [],
    enemyCards: [],
    trump: {},
    tableToBeat: [],
    tableBeated: [],
    status: 'attack',
    enemyStatus: 'defense',
    cardsToUse: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                cards: action.payload
            };

        case 'SET_DECK':
            return {
                ...state,
                deck: action.payload
            };

        case 'SET_ENEMY_CARDS':
            return {
                ...state,
                enemyCards: action.payload
            };

        case 'SET_TRUMP':
            return {
                ...state,
                trump: action.payload
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
                cardsToUse: action.payload
            };

        case 'PUT_CARD_ON_TABLE':
            return {
                ...state,
                tableToBeat: [...state.tableToBeat, action.payload]
            };

        case 'BEAT_CARD_ON_TABLE':
            return {
                ...state,
                tableBeated: [...state.tableBeated, action.payload]
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
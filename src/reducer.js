const initialState = {
    сards: [],
    trump: {},
    tableToBeat: [],
    tableBeated: [],
    status: 'attack',
    whatCanUse: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                сards: action.payload
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

        case 'SET_WHAT_CAN_USE':
            return {
                ...state,
                whatCanUse: action.payload
            };

        case 'PUT_CARD_ON_TABLE':
            return {
                ...state,
                tableToBeat: [...state.tableToBeat, action.payload]
            };

        default:
            return state;
    }
};

export default reducer;
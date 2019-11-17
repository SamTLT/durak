const initialState = {
    сards: [],
    trump: {},
    tableToBeat: [],
    tableBeated: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                сards: action.payload
            };

        case 'SET_TRUMP':
            return {
                ...state,
                trump: action.payload
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
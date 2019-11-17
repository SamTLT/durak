const initialState = {
    deck: [],
    trump: {},
    users: 2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DECK':
            return {
                ...state,
                deck: action.payload
            };

        case 'SET_TRUMP':
            return {
                ...state,
                trump: action.payload
            };

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            };

        case 'SET_PLAYERS_DECKS':
            return {
                ...state,
                playersDecks: action.payload
            };

        default:
            return state;
    }
};

export default reducer;
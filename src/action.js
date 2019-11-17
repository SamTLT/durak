export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const putCardOnTable = (payload) => {
    return {
        type: 'PUT_CARD_ON_TABLE',
        payload
    }
};

export const removeCard = (cardToRemove) => (dispatch, getState) => {

    const { сards } = getState();
    const key = cardToRemove.key;
    const idx = сards.findIndex(item => item.key === key);

    if (idx === -1) {
        return;
    }

    const newCards = [...сards.slice(0, idx), ...сards.slice(idx + 1)];

    dispatch(setCards(newCards));
}




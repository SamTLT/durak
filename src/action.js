import Logic from './server/logic';

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setWhatCanUse = (payload) => ({ type: 'SET_WHAT_CAN_USE', payload });

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

export const sendCardOnServer = (card) => (dispatch, getState) => {

    const logic = new Logic();

    const { cards, tableToBeat, tableBeated, status } = getState();

    const whatCanUse = logic.whatCanUse(tableToBeat, tableBeated, cards, status);

    dispatch(setWhatCanUse(whatCanUse.cardsToUse));
    dispatch(setStatus(whatCanUse.status));
}




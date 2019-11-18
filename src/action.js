import Logic from './server/logic';

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setCardsToUse = (payload) => ({ type: 'SET_CARDS_TO_USE', payload });

export const putCardOnTable = (payload) => {
    return {
        type: 'PUT_CARD_ON_TABLE',
        payload
    }
};


export const beatCardOnTable = (payload) => {
    return {
        type: 'BEAT_CARD_ON_TABLE',
        payload
    }
};

export const setInitials = (deck) => (dispatch, getState) => {
    dispatch(setCards(deck.myCards));
    dispatch(setEnemyCards(deck._enemyCards));
    dispatch(setTrump(deck.getTrump()));
    dispatch(setCardsToUse(deck.myCards));
}

export const removeEnemyCard = (cardToRemove) => (dispatch, getState) => {

    const { enemyCards } = getState();
    const key = cardToRemove.key;
    const idx = enemyCards.findIndex(item => item.key === key);

    if (idx === -1) {
        return;
    }

    const newCards = [...enemyCards.slice(0, idx), ...enemyCards.slice(idx + 1)];

    dispatch(setEnemyCards(newCards));
}

export const removeCard = (cardToRemove) => (dispatch, getState) => {

    const { cards } = getState();
    const key = cardToRemove.key;
    const idx = cards.findIndex(item => item.key === key);

    if (idx === -1) {
        return;
    }

    const newCards = [...cards.slice(0, idx), ...cards.slice(idx + 1)];

    dispatch(setCards(newCards));
}

export const sendCardOnServer = (card) => (dispatch, getState) => {

    const logic = new Logic();

    const { enemyCards, trump, cards, tableToBeat, tableBeated, status } = getState();

    const whatCanUse = logic.cardsToUse(tableToBeat, tableBeated, cards, status);
    console.log(whatCanUse);

    dispatch(setCardsToUse(whatCanUse.cardsToUse));

    if (status === 'attack') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, trump, tableToBeat, tableBeated, status);

            console.log('lol');
            console.log(response);
            if (response.card) {
                dispatch(beatCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);
                console.log(whatCanUse2);
                console.log(getState().cards);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            }

            // dispatch(setStatus(response.status));
        }, 0);
    }
}




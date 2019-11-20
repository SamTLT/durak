import Logic from './server/logic';

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setDeck = (payload) => ({ type: 'SET_DECK', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setEnemyStatus = (payload) => ({ type: 'SET_ENEMY_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setCardsToUse = (payload) => ({ type: 'SET_CARDS_TO_USE', payload });

export const cleanTable = () => ({ type: 'CLEAN_TABLE' });

export const setWinner = (payload) => ({ type: 'SET_WINNER', payload });

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
    dispatch(setDeck(deck.deck));
    dispatch(setEnemyCards(deck._enemyCards));
    dispatch(setTrump(deck.getTrump()));
    dispatch(setCardsToUse(deck.myCards));
}

export const checkWinner = (user, cards) => (dispatch, getState) => {

    const { deck } = getState();

    if (deck.length === 0 && cards.length === 0) {
        dispatch(setWinner(user));
    }

}

export const endTurn = (status) => (dispatch, getState) => {

    const takeCards = (cards) => {

        const { deck } = getState();

        const cardsToTake = [];
        const cardsNum = 6 - cards.length;

        for (let i = 0; i < cardsNum; i++) {
            const card = deck.pop();
            if (card) {
                cardsToTake.push(card);
            }

        }

        dispatch(setDeck([...deck]));

        return cardsToTake;

    }

    if (status === 'attack') {
        const logic = new Logic();
        const { cards, enemyCards, enemyStatus, tableToBeat, tableBeated } = getState();

        let cardsNew = [...cards, ...takeCards(cards)];
        dispatch(setCards(cardsNew));

        let enemyCardsNew;
        if (enemyStatus === 'defeated') {
            enemyCardsNew = [...enemyCards, ...tableToBeat, ...tableBeated];

            const whatCanUse = logic.cardsToUse([], [], getState().cards, getState().status);
            dispatch(setCardsToUse(whatCanUse.cardsToUse));
            dispatch(setEnemyStatus('defense'));

        }

        if (enemyStatus === 'defense') {
            enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setStatus('defense'));
            dispatch(setEnemyStatus('attack'));
        }

        dispatch(setEnemyCards(enemyCardsNew));

        dispatch(checkWinner('Player', cards));
        dispatch(checkWinner('Enemy', enemyCardsNew));

        dispatch(cleanTable());
        dispatch(receiveCardFromServer());

    }

    if (status === 'defense') {
        const logic = new Logic();
        const { cards, enemyCards, tableToBeat, tableBeated } = getState();

        if (tableToBeat.length === tableBeated.length) {
            let enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setEnemyCards(enemyCardsNew));
            dispatch(checkWinner('Enemy', enemyCardsNew));

            let cardsNew = [...cards, ...takeCards(cards)];
            dispatch(setCards(cardsNew));

            const whatCanUse = logic.cardsToUse([], [], getState().cards, 'attack');
            dispatch(setCardsToUse(whatCanUse.cardsToUse));
            dispatch(setStatus('attack'));
            dispatch(setEnemyStatus('defense'));

            dispatch(cleanTable());
        }

        if (tableToBeat.length > tableBeated.length) {
            let cardsNew = [...cards, ...tableToBeat, ...tableBeated];
            dispatch(setCards(cardsNew));

            let enemyCardsNew = [...enemyCards, ...takeCards(enemyCards)];
            dispatch(setEnemyCards(enemyCardsNew));
            dispatch(checkWinner('Enemy', enemyCardsNew));

            dispatch(cleanTable());
            dispatch(receiveCardFromServer());
        }

        dispatch(checkWinner('Player', cards));




    }



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

    const { enemyCards, enemyStatus, cards, tableToBeat, tableBeated, status } = getState();

    dispatch(checkWinner('Player', cards));

    const whatCanUse = logic.cardsToUse(tableToBeat, tableBeated, cards, status);

    dispatch(setCardsToUse(whatCanUse.cardsToUse));

    if (status === 'attack' &&
        tableToBeat.length <= 6 &&
        enemyCards.length !== 0) {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            if (response.card) {
                dispatch(beatCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));

                if (getState().enemyCards.length === 0) {
                    dispatch(setCardsToUse([]));
                }

            } else {

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);
                dispatch(setCardsToUse(whatCanUse2.cardsToUse));

                dispatch(setEnemyStatus(response.status));

                if ((getState().tableToBeat.length - getState().tableBeated.length) >= getState().enemyCards.length) {
                    dispatch(setCardsToUse([]));
                }

            }

            dispatch(checkWinner('Enemy', enemyCards));

        }, 0);
    } else {
        dispatch(setCardsToUse([]));
        // dispatch(checkWinner('Enemy', enemyCards));
    }

    if (status === 'defense' && tableToBeat.length <= 6 && cards.length !== 0) {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            if (response.card) {

                //PC will not throw cards if I don't have any (checking for winning)
                dispatch(checkWinner('Player', getState().cards));
                dispatch(checkWinner('Enemy', getState().enemyCards));

                dispatch(putCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, getState().tableBeated, getState().cards, getState().status);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));


            } else {
                dispatch(setEnemyStatus(response.status));
                if (tableToBeat.length === tableBeated.length) {
                    dispatch(setCardsToUse([]));
                }

                //PC finishes it's turn automaticaly if does not have ane cards to throw
                setTimeout(() => {
                    dispatch(endTurn(status));
                }, 500);


            }

        }, 0);
    } else {
        dispatch(setCardsToUse([]));
    }
}

export const receiveCardFromServer = () => (dispatch, getState) => {

    const logic = new Logic();

    const { enemyCards, enemyStatus, tableToBeat, tableBeated, status } = getState();

    if (status === 'defense') {
        setTimeout(() => {
            const response = logic.enemyAction(enemyCards, tableToBeat, tableBeated, status, enemyStatus);

            if (response.card) {
                dispatch(putCardOnTable(response.card));
                dispatch(removeEnemyCard(response.card));

                const whatCanUse2 = logic.cardsToUse(getState().tableToBeat, [], getState().cards, getState().status);

                dispatch(setCardsToUse(whatCanUse2.cardsToUse));
            } else {
                dispatch(setEnemyStatus(response.status));
            }

        }, 0);
    }

}




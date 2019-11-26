import Logic from './server/logic';
import Server from './server/server';

const server = new Server();

export const setCards = (payload) => ({ type: 'SET_CARDS', payload });

export const setDeck = (payload) => ({ type: 'SET_DECK', payload });

export const setCardsLeftInDeck = (payload) => ({ type: 'SET_CARDS_LEFT_IN_DECK', payload });

export const setEnemyCards = (payload) => ({ type: 'SET_ENEMY_CARDS', payload });

export const setEnemyCardsNumber = (payload) => ({ type: 'SET_ENEMY_CARDS_NUMBER', payload });

export const setStatus = (payload) => ({ type: 'SET_STATUS', payload });

export const setEnemyStatus = (payload) => ({ type: 'SET_ENEMY_STATUS', payload });

export const setTrump = (payload) => ({ type: 'SET_TRUMP', payload });

export const setCardsToUse = (payload) => ({ type: 'SET_CARDS_TO_USE', payload });

export const cleanTable = () => ({ type: 'CLEAN_TABLE' });

export const setWinner = (payload) => ({ type: 'SET_WINNER', payload });

export const setCardSize = (payload) => ({ type: 'SET_CARD_SIZE', payload });

export const setBtnIsActive = (payload) => ({ type: 'SET_BTN_IS_ACTIVE', payload });

export const putCardsOnTable = (payload) => {
    return {
        type: 'PUT_CARDS_ON_TABLE',
        payload
    }
};

export const beatCardOnTable = (payload) => {
    return {
        type: 'BEAT_CARD_ON_TABLE',
        payload
    }
};

export const setInitials = (width) => (dispatch, getState) => {

    dispatch(setBtnIsActive(false));

    server.start().then(res => {
        dispatch(setWinner(res.winner));
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setTrump(res.trump));
        dispatch(setCardsToUse(res.cardsToUse.cardsToUse));
        dispatch(setCardsLeftInDeck(res.cardsLeft));
        dispatch(setStatus(res.status));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
    });
    dispatch(processCardSize(width));
}

export const processCardSize = (width) => (dispatch, getState) => {

    let size = {
        height: 150,
        width: 100
    }

    if (width >= 992) {
        size.height = 150;
        size.width = 100;
    }


    if (768 <= width && width <= 991) {
        size.height = Math.round(size.height * 0.9);
        size.width = Math.round(size.width * 0.9);
    }

    if (480 <= width && width <= 767) {
        size.height = Math.round(size.height * 0.8);
        size.width = Math.round(size.width * 0.8);
    }

    if (320 <= width && width <= 479) {
        size.height = Math.round(size.height * 0.7);
        size.width = Math.round(size.width * 0.7);
    }

    if (getState().cardSize.height !== size.height) {
        dispatch(setCardSize(size));
    }


}

export const checkWinner = (user, cards) => (dispatch, getState) => {

    const { deck } = getState();

    if (deck.length === 0 && cards.length === 0) {
        dispatch(setWinner(user));
    }

}

export const endTurn = () => (dispatch, getState) => {

    // блокируем выбор карт после нажатия кнопки завершения хода
    dispatch(setCardsToUse([]));
    dispatch(setBtnIsActive(false));

    server.endTurn(getState().status).then(res => {
        dispatch(setWinner(res.winner));
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setCardsToUse(res.cardsToUse));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
        dispatch(setStatus(res.userStatus));
        dispatch(setCardsLeftInDeck(res.cardsLeft));

        dispatch(setBtnIsActive(true));

    });

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

    const { status } = getState();
    if (status === 'attack') {
        dispatch(putCardsOnTable([...getState().tableToBeat, card]));
    }

    if (status === 'defense') {
        dispatch(beatCardOnTable([...getState().tableBeated, card]));
    }

    // блокируем выбор карт после отправки карты
    dispatch(setCardsToUse([]));

    dispatch(setBtnIsActive(false));

    server.sendCard(card).then(res => {
        dispatch(setWinner(res.winner));
        dispatch(setCards(res.cards));
        dispatch(setEnemyCardsNumber(res.enemyCardsNum));
        dispatch(setCardsToUse(res.cardsToUse));
        dispatch(putCardsOnTable(res.tableToBeat));
        dispatch(beatCardOnTable(res.tableBeated));
        dispatch(setStatus(res.userStatus));
        dispatch(setCardsLeftInDeck(res.cardsLeft));

        dispatch(setBtnIsActive(true));
    });
}




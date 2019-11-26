import Deck from './deck';
import Logic from './logic';

const deck = new Deck();
const logic = new Logic();

class Server {
    constructor() {
        this._tableToBeat = [];
        this._tableBeated = [];
        this._userStatus = 'attack';
        this._enemyStatus = 'defense';
        this._enemyCards = deck.getCards(6);
        this._userCards = deck.getCards(6);
        this._winner = null;
    }

    start = () => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialData = {
                    cards: this._userCards,
                    trump: deck.trump,
                    enemyCardsNum: this._enemyCards.length,
                    cardsLeft: deck.cardsLeft(),
                    cardsToUse: logic.cardsToUse([], [], this._userCards, this._userStatus),
                    status: this._userStatus,
                    tableToBeat: this._tableToBeat,
                    tableBeated: this._tableBeated,
                    winner: this._winner,
                    userStatus: this._userStatus
                };
                resolve(initialData);
            }, 500);
        });
    }

    sendCard = (card) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let whatCanUse = { cardsToUse: [] };
                if (this._userStatus === 'attack' &&
                    this._tableToBeat.length <= 6 &&
                    this._enemyCards.length !== 0) {

                    // Удаляем карту из руки
                    this._userCards = deck.removeCard(this._userCards, card);

                    // Кладем эту карту на стол
                    this._tableToBeat.push(card);

                    // Противник думает
                    const enemyAction = logic.enemyAction(this._enemyCards, this._tableToBeat, this._tableBeated, this._enemyStatus);

                    // Если у противника есть карта, которой он может побить
                    if (enemyAction.card) {
                        //Удаляем карту у противника из руки
                        this._enemyCards = deck.removeCard(this._enemyCards, enemyAction.card);

                        // Бъем картой предыдущую карту
                        this._tableBeated.push(enemyAction.card);

                        // если у врага еще остались карты, проверяем карты, которые можем использовать
                        if (this._enemyCards.length !== 0) {
                            whatCanUse = logic.cardsToUse(this._tableToBeat, this._tableBeated, this._userCards, this._userStatus);
                        }

                    } else {
                        // если врагу нечем ответить на мою карту
                        // задаем врагу новый статус
                        this._enemyStatus = enemyAction.status;

                        // проверяем какие карты я могу ему подбросить
                        whatCanUse = logic.cardsToUse(this._tableToBeat, this._tableBeated, this._userCards, this._userStatus);

                        // если число непокрытых карт >= кол-ву карт на столе, то мы не можем больше подкидывать карты
                        if ((this._tableToBeat.length - this._tableBeated.length) >= this._enemyCards.length) {
                            whatCanUse = { cardsToUse: [] };
                        }

                    }

                    // проверяем победу 
                    this.checkWinner('Player', this._userStatus);
                    this.checkWinner('Enemy', this._enemyCards);
                }

                if (this._userStatus === 'defense' &&
                    this._tableToBeat.length <= 6 &&
                    this._enemyCards.length !== 0) {
                    // Удаляем карту из руки
                    this._userCards = deck.removeCard(this._userCards, card);

                    // Кладем эту карту на стол
                    this._tableBeated.push(card);

                    // Противник думает
                    const enemyAction = logic.enemyAction(this._enemyCards, this._tableToBeat, this._tableBeated, this._enemyStatus);

                    // если ему есть чем сходить
                    if (enemyAction.card) {
                        // Удаляем карту из руки
                        this._enemyCards = deck.removeCard(this._enemyCards, enemyAction.card);

                        // Кладем эту карту на стол
                        this._tableToBeat.push(enemyAction.card);

                        // проверяем победу 
                        this.checkWinner('Player', this._userStatus);
                        this.checkWinner('Enemy', this._enemyCards);

                        // проверяем какие карты я могу использовать
                        whatCanUse = logic.cardsToUse(this._tableToBeat, this._tableBeated, this._userCards, this._userStatus);
                    } else {
                        // если врагу нечем сходить
                        // задаем врагу новый статус
                        this._enemyStatus = enemyAction.status;

                        // если я покрыл все на столе, я больше не могу ходить
                        if (this._tableToBeat.length === this._tableBeated.length) {
                            whatCanUse = { cardsToUse: [] };
                        }
                        // PC finishes it's turn automaticaly if it does not have any cards to throw
                        resolve(this._endTurn(this._userStatus));
                    }
                }

                const data = {
                    cards: this._userCards,
                    enemyCardsNum: this._enemyCards.length,
                    cardsToUse: whatCanUse.cardsToUse,
                    tableToBeat: this._tableToBeat,
                    tableBeated: this._tableBeated,
                    winner: this._winner,
                    userStatus: this._userStatus,
                    cardsLeft: deck.cardsLeft()
                };

                resolve(data);
            }, 500);
        });
    }

    checkWinner = (name, cards) => {
        const cardsArr = deck.deck;
        if (cardsArr.length === 0 && cards.length === 0 && this._winner === null) {
            this._winner = name;
        }
    }

    endTurn = (status) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._endTurn(status));
            }, 500);
        });
    }

    _endTurn = (status) => {
        // задаем массив карт, которые мы можем использовать
        let whatCanUse = { cardsToUse: [] };
        const takeCards = (cards) => {
            const cardsToTake = [];
            const cardsNum = 6 - cards.length;

            for (let i = 0; i < cardsNum; i++) {
                const card = deck.deck.pop();
                if (card) {
                    cardsToTake.push(card);
                }
            }

            return cardsToTake;

        }

        if (status === 'attack') {
            // берем карты из колоды
            this._userCards = [...this._userCards, ...takeCards(this._userCards)];
            const enemyStatus = this._enemyStatus;

            if (enemyStatus === 'defeated') {

                this._enemyCards = [...this._enemyCards, ...this._tableToBeat, ...this._tableBeated];

                whatCanUse = logic.cardsToUse([], [], this._userCards, status);
                // задаем врагу статус defense т.к. он проиграл предыдущий раунд
                this._enemyStatus = 'defense';
            }

            if (enemyStatus === 'defense') {
                this._enemyCards = [...this._enemyCards, ...takeCards(this._enemyCards)];

                // задаем игроку статус defense т.к. враг смог отбится в прошлый раз
                this._userStatus = 'defense';

                // задаем врагу статус attack т.к. враг смог отбится в прошлый раз
                this._enemyStatus = 'attack';
            }

            // проверяем победу 
            this.checkWinner('Player', this._userStatus);
            this.checkWinner('Enemy', this._enemyCards);

            // очищаем стол
            this._tableToBeat = [];
            this._tableBeated = [];

            // тут нужно стригерить действие врага
            this.enemyMove();
            // проверяем чем мы можем побить его карту
            whatCanUse = logic.cardsToUse(this._tableToBeat, this._tableBeated, this._userCards, 'defense');

        }

        if (status === 'defense') {
            if (this._tableToBeat.length === this._tableBeated.length) {
                this._enemyCards = [...this._enemyCards, ...takeCards(this._enemyCards)];
                this.checkWinner('Enemy', this._enemyCards);

                this._userCards = [...this._userCards, ...takeCards(this._userCards)];

                whatCanUse = logic.cardsToUse([], [], this._userCards, 'attack');

                this._userStatus = 'attack';
                this._enemyStatus = 'defense';

                // очищаем стол
                this._tableToBeat = [];
                this._tableBeated = [];
            }

            if (this._tableToBeat.length > this._tableBeated.length) {
                this._userCards = [...this._userCards, ...this._tableToBeat, ...this._tableBeated];

                this._enemyCards = [...this._enemyCards, ...takeCards(this._enemyCards)];

                // очищаем стол
                this._tableToBeat = [];
                this._tableBeated = [];

                this.checkWinner('Enemy', this._enemyCards);
                if (this._winner === null) {
                    // тут надо активировать ход врага
                    this.enemyMove();
                    whatCanUse = logic.cardsToUse(this._tableToBeat, this._tableBeated, this._userCards, status);
                }
            }

            this.checkWinner('Player', this._userCards);

        }

        // проверяем победу 
        this.checkWinner('Player', this._userStatus);
        this.checkWinner('Enemy', this._enemyCards);

        const data = {
            cards: this._userCards,
            enemyCardsNum: this._enemyCards.length,
            cardsToUse: whatCanUse.cardsToUse,
            tableToBeat: this._tableToBeat,
            tableBeated: this._tableBeated,
            winner: this._winner,
            userStatus: this._userStatus,
            cardsLeft: deck.cardsLeft()
        };
        return data;
    }

    enemyMove = () => {

        if (this._userStatus === 'defense') {
            // Противник думает
            const enemyAction = logic.enemyAction(this._enemyCards, this._tableToBeat, this._tableBeated, this._enemyStatus);

            if (enemyAction.card) {
                //Удаляем карту у противника из руки
                this._enemyCards = deck.removeCard(this._enemyCards, enemyAction.card);

                // Кидаем карту на стол
                this._tableToBeat.push(enemyAction.card);
            } else {
                this._enemyStatus = enemyAction.status;
            }
        }

    }

}

export default Server;
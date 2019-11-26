import Deck from './deck';

const deck = new Deck();

export default class Logic {
    cardsToUse = (tableToBeat, tableBeated, cards, status) => {
        const table = [...tableToBeat, ...tableBeated];
        let cardsToUse = [];

        if (status === 'attack') {
            if (table.length === 0) {
                cardsToUse = cards;

            } else if (table.length > 0) {
                table.forEach(cardTable => {
                    if (cardTable.rank) {
                        cards.forEach(card => {
                            if ((card.rank === cardTable.rank ||
                                card.rank === cardTable.rank - 100 ||
                                card.rank - 100 === cardTable.rank)) {
                                cardsToUse.push(card);
                            }
                        })
                    }
                })
            }
        }

        if (status === 'hold') {
            cardsToUse = [];
        }

        if (status === 'defeated') {
            cardsToUse = [];
        }

        if (status === 'defense') {
            const cardToBeat = tableToBeat[tableToBeat.length - 1];
            cards.forEach(card => {
                if (
                    (card.rank > cardToBeat.rank && card.type === cardToBeat.type)
                    || (card.rank > cardToBeat.rank && card.rank > 100)) {
                    cardsToUse.push(card);
                }
            })

        }

        return {
            cardsToUse,
            status
        };
    }

    _getAllCards = () => {
        return deck.get32Deck(deck.minRank, deck.maxRank, deck.types);
    }

    enemyAction = (enemyCards, tableToBeat, tableBeated, enemyStatus) => {

        const toUse = this.cardsToUse(tableToBeat, tableBeated, enemyCards, enemyStatus);

        if (enemyStatus === 'defense') {
            if (toUse.cardsToUse.length === 0) {
                return { card: false, status: 'defeated' };

            } else {
                return { card: this._getMinRankedCard(toUse.cardsToUse), status: enemyStatus };
            }

        }

        if (enemyStatus === 'attack') {
            if (toUse.cardsToUse.length === 0) {
                return { card: false, status: 'hold' };

            } else {
                return { card: this._getMinRankedCard(toUse.cardsToUse), status: enemyStatus };
            }
        }

        if (enemyStatus === 'defeated') {
            return { card: false, status: 'defeated' };
        }

    }

    _getMinRankedCard = (cards) => {
        let minRankedCard;
        cards.forEach(card => {
            if (!minRankedCard) {
                minRankedCard = card;
            }
            if (minRankedCard.rank > card.rank) {
                minRankedCard = card;
            }
        });

        return minRankedCard;
    }
} 
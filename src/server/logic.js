import Deck from './deck';

const deck = new Deck();

export default class Logic {
    whatCanUse(tableToBeat, tableBeated, cards, status) {
        const table = [...tableToBeat, ...tableBeated];
        let cardsToUse = [];

        if (status === 'attack') {
            if (table.length === 0) {
                cardsToUse = this._getAllCards();

            } else if (table.length > 0) {
                table.forEach(card => {
                    if (card.rank) {
                        cardsToUse.push(card);
                    }
                })
            }
            status = 'hold';
        }

        if (status === 'hold') {
            cardsToUse = [];
        }

        if (status === 'defense') {
            const cardToBeat = tableToBeat[tableToBeat.length - 1];
            console.log(cardToBeat);
            cards.forEach(card => {
                if ((card.rank > cardToBeat.rank
                    && card.type === cardToBeat.type)
                    || (card.rank > cardToBeat.rank
                        && card.rank > 100)) {
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

    enemyAction(enemyCards, trump, tableToBeat, tableBeated, status) {
        if (status === 'hold') {
            const toUse = this.whatCanUse(tableToBeat, tableBeated, enemyCards, 'defense');

            if (toUse.cardsToUse.length === 0) {
                return false;
            } else {
                let minRankedCard;
                toUse.cardsToUse.forEach(card => {
                    if (!minRankedCard) {
                        minRankedCard = card;
                    }
                    if (minRankedCard.rank > card.rank) {
                        minRankedCard = card;
                    }
                })
                return minRankedCard;
            }
        }
    }
} 
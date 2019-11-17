export default class Deck {

    get52Deck = () => {
        const types = ['clubs', 'diamonds', 'hearts', 'spades'];
        const minRank = 2;
        const maxRank = 14;

        const rankNames = {
            11: 'Jack',
            12: 'Queen',
            13: 'King',
            14: 'Ace'
        }

        return this._createDeck(types, minRank, maxRank, rankNames);

    }

    _createDeck = (types, minRank, maxRank, rankNames) => {
        const deck = [];
        let key = 0;
        types.forEach(type => {
            for (let i = minRank; i <= maxRank; i++) {
                const card = {
                    rank: i,
                    type: type,
                    name: `${rankNames[i] ? rankNames[i] : i} of ${type}`,
                    key: key++
                }
                deck.push(card);
            }
        })
        return deck;
    }

    //Fisher–Yates shuffle
    shuffle = (deck) => {
        const array = [...deck];
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}
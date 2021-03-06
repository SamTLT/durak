export default class Deck {
  constructor() {
    this.types = ["clubs", "diamonds", "hearts", "spades"];
    this._minRank = 6;
    this._maxRank = 14;
    this._initialDeck = this._shuffle(
      this._get32Deck(this._minRank, this._maxRank, this.types)
    );
    this.trump = this._initialDeck[0];
    this.deck = this._setRanksAccordingTrump(
      [...this._initialDeck],
      this.trump
    );
  }

  _setRanksAccordingTrump = (deck, trump) => {
    let newDeck = [];

    deck.forEach(card => {
      if (card.type === trump.type) {
        card.rank += 100;
      }
      newDeck.push(card);
    });

    return newDeck;
  };

  _get32Deck = (minRank, maxRank, types) => {
    const rankNames = {
      11: "Jack",
      12: "Queen",
      13: "King",
      14: "Ace"
    };

    return this._createDeck(types, minRank, maxRank, rankNames);
  };

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
        };
        deck.push(card);
      }
    });
    return deck;
  };

  //Fisher–Yates shuffle
  _shuffle = deck => {
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
  };

  getCards = num => {
    const cards = [];
    for (let i = 0; i < num; i++) {
      cards.push(this.deck.pop());
    }
    return cards;
  };

  cardsLeft = () => {
    return this.deck.length;
  };

  removeCard = (cardArr, card) => {
    const idx = cardArr.findIndex(item => item.key === card.key);
    return idx !== -1
      ? [...cardArr.slice(0, idx), ...cardArr.slice(idx + 1)]
      : cardArr;
  };
}

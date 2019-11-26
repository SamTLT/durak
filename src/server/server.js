import Deck from './deck';
import Logic from './logic';

const deck = new Deck();
const logic = new Logic();

class Server {

    start = () => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const myCards = deck.myCards;
                const initialData = {
                    cards: myCards,
                    trump: deck.getTrump(),
                    enemyCardsNum: deck._enemyCards.length,
                    cardsLeft: deck.cardsLeft(),
                    cardsToUse: logic.cardsToUse([], [], myCards, 'attack')
                };
                resolve(initialData);
            }, 500);
        });
    }

    sendCard = (card) => {
        return {

        }
    }

}

export default Server;
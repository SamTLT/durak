import Deck from "./deck";
import { connect } from "react-redux";

const mapStateToPros = state => {
  return {
    trump: state.trump,
    cardsLeft: state.cardsLeftInDeck
  };
};

export default connect(mapStateToPros)(Deck);

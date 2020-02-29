import App from "./app";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "actions";

const mapStateToPros = state => {
  return {
    cards: state.cards,
    trump: state.trump,
    status: state.status,
    winner: state.winner
  };
};

const mapDispatchToProps = dispatch => {
  const { setInitials, processCardSize } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    setInitials: (deck, width) => {
      setInitials(deck, width);
    },
    setCardSize: width => {
      processCardSize(width);
    }
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(App);

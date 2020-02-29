import Card from "./card";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";

const mapStateToPros = state => {
  return {
    table: state.table,
    cardsToUse: state.cardsToUse,
    status: state.status,
    cardSize: state.cardSize
  };
};

const mapDispatchToProps = dispatch => {
  const { removeCard, sendCardOnServer } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    putCardOnTable: card => {
      removeCard(card);
      sendCardOnServer(card);
    },

    beatCardOnTable: card => {
      removeCard(card);
      sendCardOnServer(card);
    }
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Card);

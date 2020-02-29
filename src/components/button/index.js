import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "actions";

import Button from "./button";

const mapStateToPros = state => {
  return {
    status: state.status,
    toBeat: state.tableToBeat.length,
    isActive: state.isBtnActive
  };
};

const mapDispatchToProps = dispatch => {
  const { endTurn } = bindActionCreators(actions, dispatch);

  return {
    endTurn: status => {
      endTurn(status);
    }
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Button);

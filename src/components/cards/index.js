import Cards from "./cards";
import { connect } from "react-redux";

const mapStateToPros = state => {
  return {
    cardSize: state.cardSize
  };
};

export default connect(mapStateToPros)(Cards);

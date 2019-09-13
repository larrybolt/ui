import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as reducer from "./reducer";

// connect reducer actions to properties
const mapDispatchToProps = {
  add: reducer.add,
};

// connect selectors to props
const mapStateToProps = (state: reducer.RootState) => ({
  counter: reducer.getAmount(state),
});

// actual compentent properties
type Props = {
  title: string;
} & typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

const App: React.FC<Props> = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      <Button
        onClick={(): void => {
          props.add({ amount: 1 });
        }}
      >
        Test
      </Button>
      counter: {props.counter}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../store";
import { actions } from "../store/account";
// import { State } from "../store";

const Home: FC = () => {
  const accounts = useSelector((state: State) => state.account.accounts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.request());
  }, []);

  return (
    <>
      <h2>Accounts</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            {account.name}
            <button onClick={() => dispatch(actions.delete(account.id))}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Home;

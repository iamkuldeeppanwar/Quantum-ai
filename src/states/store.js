import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? sessionStorage.getItem("userInfo")
    : null,
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return {
        ...state,
        userInfo: action.payload.success,
        token: action.payload.success.remember_token,
      };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        token: null,
      };

    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}

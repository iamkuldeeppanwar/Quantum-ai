import axiosInstance from "../utils/axiosUtil";
import { getError } from "../utils/error";

export const login = async (ctxDispatch, dispatch, credentials) => {
  try {
    dispatch({ type: "FETCH_REQUEST" });
    const { data } = await axiosInstance.post(
      "https://quantumhostings.com/projects/websocket/public/api/employ_login",
      credentials
    );

    // console.log("data", data);
    if (data.success.remember_token) {
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      sessionStorage.setItem("myid", data.success.id);
      sessionStorage.setItem("myname", data.success.name);
      sessionStorage.setItem("token", data.success.remember_token);

      dispatch({ type: "FETCH_SUCCESS" });
    } else {
      dispatch({ type: "FETCH_FAIL", payload: getError(data) });
    }
  } catch (err) {
    dispatch({ type: "FETCH_FAIL", payload: getError(err) });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};

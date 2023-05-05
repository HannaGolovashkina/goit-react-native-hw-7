import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
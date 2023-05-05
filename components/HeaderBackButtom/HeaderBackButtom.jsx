import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

export const HeaderBackButton = ({ navigation, style }) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <TouchableOpacity
      onPress={signOut}
      style={{ ...styles.goBackBtn, ...style }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBackBtn: {
    marginRight: 16,
  },
});
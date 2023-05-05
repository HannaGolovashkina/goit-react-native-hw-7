import { StyleSheet, TouchableOpacity, View } from "react-native";

export const CustomTabCreatePost = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.createPostBtn}>
      <View style={styles.createPostIconWrap}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createPostBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  createPostIconWrap: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
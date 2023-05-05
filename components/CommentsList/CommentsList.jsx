import { StyleSheet, Text, View, Image } from "react-native";

export const CommentsItem = (item, index, comments) => {
  // const date = item.date.split(" ");
  // const dateFormat = `${date[2]} ${date[1]}, ${date[3]} | ${date[4].slice(
  //   0,
  //   5
  // )}`;

  // const currentUser = item.userName;
  // const prevUser = comments[index - 1]?.userName;
  // const sameUser = currentUser == prevUser;

  // console.log(sameUser);

  let isItemEven = index % 2 === 0;

  return (
    <View
      style={{
        ...styles.itemWrap,
        flexDirection: isItemEven ? "row" : "row-reverse",
      }}
    >
      <View>
        <Text>{item.login}</Text>
        {/* <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} /> */}
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: isItemEven ? 16 : 0,
          marginRight: isItemEven ? 0 : 16,
          ...styles.commentWrap,
        }}
      >
        <Text style={styles.commentText}>{item.comment}</Text>
        {/* <Text style={styles.commentDate}>{dateFormat}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrap: {
    marginBottom: 24,
  },
  userPhoto: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrap: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
  commentDate: {
    marginLeft: "auto",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
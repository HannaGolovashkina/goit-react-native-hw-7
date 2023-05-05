import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { PostsList } from "./../../components/PostsList/PostsList";

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.userContainer}>
        <View style={styles.userPhotoWrap}>
          <Image
            source={require("../../assets/images/user_photo_default.jpg")}
            style={styles.userPhoto}
          />
        </View>
        <View style={styles.userInfoTextWrap}>
          <Text style={styles.userLoginText}>{login}</Text>
          {/* <Text style={styles.userEmailText}>{email}</Text> */}
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.postsList}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostsList
                item={item}
                onCommentsPress={() => {
                  navigation.navigate("Comments", {
                    img: item.img,
                    postId: item.id,
                  });
                }}
                onMapPress={() => {
                  navigation.navigate("Map", { location: item.locationProps });
                }}
              />
            )}
            keyExtractor={(item, indx) => indx.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#ffffff",
  },
  userContainer: {
    paddingTop: 32,
    paddingBottom: 32,
    flexDirection: "row",
  },
  userPhotoWrap: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  userPhoto: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
  },
  userInfoTextWrap: {
    marginLeft: 8,
    justifyContent: "center",
  },
  userLoginText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmailText: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  postsList: {},
  postItemContainer: {
    marginBottom: 34,
  },
  postItemImgContainer: {
    width: "100%",
    height: 240,
  },
  postItemImg: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    borderRadius: 16,
  },
  postItemTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  postItemInfoContainer: {
    marginTop: 11,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postItemRateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postItemCommentWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  postItemCommentsCount: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  postItemLikeWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 27,
  },
  postItemLikeCount: {
    marginLeft: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  postItemLocationWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  postItemLocationText: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
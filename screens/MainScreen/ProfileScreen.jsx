import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

import { PostsList } from "../../components/PostsList/PostsList";
import { HeaderBackButton } from "./../../components/HeaderBackButtom/HeaderBackButtom";

export const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = await query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={require("../../assets/images/bg_mount.jpg")}
        style={styles.backgroundImg}
      />

      <View style={styles.container}>
        <Image
          source={require("../../assets/images/user_photo_default.jpg")}
          style={styles.userImg}
        />
        <HeaderBackButton
          navigation={navigation}
          style={{ position: "absolute", top: 22, right: 16 }}
        />
        <View style={styles.loginWrap}>
          <Text style={styles.loginText}>{login}</Text>
        </View>
        <View style={styles.listWrap}>
          <SafeAreaView>
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
                    navigation.navigate("Map", {
                      location: item.locationProps,
                    });
                  }}
                />
              )}
              keyExtractor={(item, indx) => indx.toString()}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backgroundImg: {
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  container: {
    position: "relative",
    height: 620,
    width: "100%",
    paddingRight: 16,
    paddingLeft: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    paddingTop: 92,
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -45 }],
  },
  loginWrap: {
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Roboto-Medium",
    fontSize: 35,
    color: "#212121",
  },
  listWrap: {
    flex: 1,
    marginTop: 33,
  },
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
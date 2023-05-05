import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

import { HeaderBackButton } from "../../components/HeaderBackButtom/HeaderBackButtom";
import { CustomTabCreatePost } from "../../components/CustomTabCreatePost/CustomTabCreatePost";

const MainTab = createBottomTabNavigator();

export const Home = ({ navigation, route }) => {
  // const { login, email, image } = route.params;

  return (
    <MainTab.Navigator
      initialRouteName={"Posts"}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
        },
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          letterSpacing: -0.408,
        },
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderTopWidth: 1,
          borderColor: "#F6F6F6",
        },
      }}
    >
      <MainTab.Screen
        // initialParams={{ login, email, image }}
        options={({ route }) => ({
          title: "Posts",
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "Posts";
            if (routeName !== "Posts") {
              return { display: "none" };
            }
            return { height: 88, borderTopWidth: 1, borderColor: "#F6F6F6" };
          })(route),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#FF6C00" : "#212121"}
            />
          ),
        })}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: true,
          title: "Create Post",
          headerLeft: () => null,
          headerRight: () => <HeaderBackButton navigation={navigation} />,
          tabBarIcon: () => <AntDesign name="plus" size={13} color="#ffffff" />,
          tabBarButton: (props) => <CustomTabCreatePost {...props} />,
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        // initialParams={{ login, email, image }}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#FF6C00" : "#212121"}
            />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
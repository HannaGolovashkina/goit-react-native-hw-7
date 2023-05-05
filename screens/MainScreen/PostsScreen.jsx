import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen } from "./../nestedScreens/DefaultPostsScreen";
import { MapScreen } from "./../nestedScreens/MapScreen";
import { CommentsScreen } from "./../nestedScreens/CommentsScreen";

import { HeaderBackButton } from "../../components/HeaderBackButtom/HeaderBackButtom";

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation, route }) => {
  // const { login, email, image, newPost } = route.params;

  return (
    <NestedScreen.Navigator
      screenOptions={{
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
      }}
    >
      <NestedScreen.Screen
        // initialParams={{ login, email, image }}
        name="Posts"
        component={DefaultPostsScreen}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderBackButton navigation={navigation} />,
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
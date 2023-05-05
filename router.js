import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { Home } from "./screens/MainScreen/Home";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  return (
    <AuthStack.Navigator>
      {isAuth ? (
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
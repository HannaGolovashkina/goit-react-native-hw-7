import { useState } from "react";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
} from "react-native";
import { styles } from "./auth-styles";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch();

  Keyboard.addListener("keyboardDidHide", () => {
    setIsKeyboardShown(false);
  });

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (state.password === "" || state.email === "") {
      return alert("Fill in all fields please!");
    }
    dispatch(authSignInUser(state));
    keyboardHide();
    setState(initialState);
  };

  const inputOnFocus = (value) => {
    setIsInputFocus((prevState) => ({ ...prevState, [value]: true }));
  };

  const inputOnBlur = (value) => {
    setIsInputFocus((prevState) => ({ ...prevState, [value]: false }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/images/bg_mount.jpg")}
          style={styles.imgBackground}
        >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              style={{
                ...styles.container,
                height: 489,
              }}
              onPress={keyboardHide}
            >
              <View style={{ ...styles.form, paddingTop: 32 }}>
                <Text style={styles.title}>Sing in</Text>
                <View style={styles.inputsWrap}>
                  <View style={{ marginTop: 16 }}>
                    <TextInput
                      style={{
                        ...styles.input,
                        backgroundColor: isInputFocus.email
                          ? "#ffffff"
                          : "#F6F6F6",
                        borderColor: isInputFocus.email ? "#FF6C00" : "#E8E8E8",
                      }}
                      placeholder={"E-mail address"}
                      placeholderTextColor={"#BDBDBD"}
                      value={state.email}
                      onFocus={() => {
                        setIsKeyboardShown(true);
                        inputOnFocus("email");
                      }}
                      onBlur={() => {
                        inputOnBlur("email");
                      }}
                      onChange={({ nativeEvent: { text } }) => {
                        setState((prevState) => ({
                          ...prevState,
                          email: text,
                        }));
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 16, position: "relative" }}>
                    <TextInput
                      style={{
                        ...styles.input,
                        backgroundColor: isInputFocus.password
                          ? "#ffffff"
                          : "#F6F6F6",
                        borderColor: isInputFocus.password
                          ? "#FF6C00"
                          : "#E8E8E8",
                      }}
                      placeholder={"Password"}
                      placeholderTextColor={"#BDBDBD"}
                      secureTextEntry={isPasswordShown ? false : true}
                      value={state.password}
                      onFocus={() => {
                        setIsKeyboardShown(true);
                        inputOnFocus("password");
                      }}
                      onBlur={() => {
                        inputOnBlur("password");
                      }}
                      onChange={({ nativeEvent: { text } }) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: text,
                        }))
                      }
                    />
                    <TouchableOpacity
                      style={styles.showPasswordBtn}
                      onPress={() =>
                        setIsPasswordShown((prevState) => !prevState)
                      }
                    >
                      <Text style={styles.showPasswordBtnText}>
                        {isPasswordShown ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.formBtn}
                  activeOpacity={0.7}
                  onPress={onSubmit}
                >
                  <Text style={styles.formBtnText}>Sing in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.singInLink}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.singInText}>
                    Don't have an account? Sing up
                  </Text>
                </TouchableOpacity>
              </View>
              <StatusBar style="auto" />
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
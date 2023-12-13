import React, { useState } from "react";

import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Appearance,
} from "react-native";

import {
  HelperText,
  Text,
  TextInput,
  Button,
  IconButton,
  Card,
  Surface,
} from "react-native-paper";

// import { signup } from "../services/auth";

// import { useDispatch } from "react-redux";

// Import custom theme
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { database } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Swtich color scheme based on system settings
let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function HomeScreen({ navigation }) {
  //   const dispatch = useDispatch();
  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  const [secureText, setSecureText] = useState(true);

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signUp = () => {
    if (
      value.email === "" ||
      !value.email.match(regex) ||
      value.password === "" ||
      value.name === ""
    ) {
      value.email === "" || !value.email.match(regex)
        ? setEmailError(true)
        : setEmailError(false);
      value.name === "" ? setNameError(true) : setNameError(false);
      value.password === "" ? setPasswordError(true) : setPasswordError(false);
      return;
    }
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(() => {
        setDoc(doc(database, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          displayName: value.name,
          description: " ",
          chats: [],
          likes: [],
          photoURL: `https://ui-avatars.com/api/?size=150&background=random&name=${
            value.name.includes(" ")
              ? value.name
              : `${value.name} ${value.name[1]}`
          }`,
          menu: false,
        });
        navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        setEmailError(true);
        setPasswordError(true);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
          <View style={styles.container}>
            <Image
              source={require("../assets/background.jpg")}
              resizeMode="cover"
              style={styles.backgroudImg}
              blurRadius={1}
            />
            <View style={styles.filter} />
            <Surface style={styles.logoBackground}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode="cover"
                style={styles.logo}
              />
            </Surface>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Text variant="displayLarge" style={{ textAlign: "center" }}>
                  Sign Up
                </Text>
                <View style={styles.form}>
                  <TextInput
                    theme={{ colors: colorTheme }}
                    label="Name"
                    value={value.name}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={styles.textInput}
                    onChangeText={(text) => {
                      setValue({ ...value, name: text });
                      setNameError(false);
                    }}
                    error={nameError}
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={nameError}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid name
                  </HelperText>
                  <TextInput
                    theme={{ colors: colorTheme }}
                    label="Email"
                    value={value.email}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(text) => {
                      setValue({ ...value, email: text });
                      setEmailError(false);
                    }}
                    error={emailError}
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={emailError}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid email
                  </HelperText>
                  <TextInput
                    secureTextEntry={secureText}
                    theme={{ colors: colorTheme }}
                    label="Password"
                    value={value.password}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(text) => {
                      setValue({ ...value, password: text });
                      setPasswordError(false);
                    }}
                    error={passwordError}
                    right={
                      <TextInput.Icon
                        icon={secureText ? "eye-off" : "eye"}
                        onPress={() => {
                          secureText
                            ? setSecureText(false)
                            : setSecureText(true);
                        }}
                      />
                    }
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={passwordError}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid password
                  </HelperText>
                  <View style={styles.buttonsContainer}>
                    <IconButton
                      icon="arrow-left-thin"
                      theme={{ colors: colorTheme }}
                      style={{ marginHorizontal: 5 }}
                      onPress={() => navigation.goBack()}
                    />
                    <Button
                      theme={{ colors: colorTheme }}
                      mode="contained"
                      style={{ marginHorizontal: 5 }}
                      onPress={() => {
                        signUp();
                      }}
                    >
                      Sign Up
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  filter: {
    position: "absolute",
    backgroundColor: "black",
    opacity: colorScheme === "dark" ? 0.5 : 0,
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  backgroudImg: { zIndex: 0, height: "100%", width: "100%" },
  logoBackground: {
    position: "absolute",
    top: "15%",
    borderRadius: 100,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 2,
  },
  logo: {
    position: "absolute",
    height: 142,
    width: 142,
    shadowColor: "#202020",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  card: {
    flex: 1,
    width: "75%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "40%",
    zIndex: 3,
  },
  cardContent: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  form: {
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  textInput: { marginTop: 15, paddingHorizontal: 10, width: "100%" },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

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
  Card,
  Surface,
} from "react-native-paper";
// import { useDispatch } from "react-redux";
// import { addEmail } from "./reducers/users";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

import React, { useState } from "react";

let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function HomeScreen({ navigation }) {
  const [hasErrors, setHasErrors] = useState(false);
  //   const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  const handleUser = () => {
    // if (!email.match(regex)) {
    //   setHasErrors(true);
    //   return;
    // }
    // dispatch(addEmail(email.toLowerCase()));
    setHasErrors(false);
    navigation.navigate("TabNavigator");
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              source={require("../assets/background.jpg")}
              resizeMode="cover"
              style={{
                position: "absolute",
                zIndex: 0,
                height: "100%",
                width: "100%",
              }}
            />
            <View
              style={{
                position: "absolute",
                backgroundColor: "black",
                opacity: colorScheme === "dark" ? 0.75 : 0,
                zIndex: 1,
                height: "100%",
                width: "100%",
              }}
            />
            <Surface
              style={{
                position: "absolute",
                // backgroundColor: "white",
                top: "15%",
                borderRadius: 100,
                height: 150,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <Image
                source={require("../assets/logo.png")}
                resizeMode="cover"
                style={{
                  position: "absolute",

                  height: 142,
                  width: 142,
                  shadowColor: "#202020",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                }}
              />
            </Surface>
            <Card
              style={{
                flex: 1,
                width: "75%",

                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "40%",
                zIndex: 3,
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  // flexDirection: "row",
                  // flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 20,
                  paddingTop: 30,
                }}
              >
                <Text variant="displayLarge" style={{ textAlign: "center" }}>
                  Sign Up
                </Text>
                <View
                  style={{
                    width: "90%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <TextInput
                    theme={{ colors: colorTheme }}
                    label="Name"
                    value={email}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={{
                      marginTop: 15,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                    onChangeText={(text) => {
                      setEmail(text);
                      setHasErrors(false);
                    }}
                    error={hasErrors}
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={hasErrors}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid email
                  </HelperText>
                  <TextInput
                    theme={{ colors: colorTheme }}
                    label="Email"
                    value={email}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={{
                      marginTop: 15,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                    onChangeText={(text) => {
                      setEmail(text);
                      setHasErrors(false);
                    }}
                    error={hasErrors}
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={hasErrors}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid email
                  </HelperText>
                  <TextInput
                    theme={{ colors: colorTheme }}
                    label="Password"
                    value={email}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50 }}
                    style={{
                      marginTop: 15,
                      paddingHorizontal: 10,
                      width: "100%",
                    }}
                    onChangeText={(text) => {
                      setEmail(text);
                      setHasErrors(false);
                    }}
                    error={hasErrors}
                  />
                  <HelperText
                    theme={{ colors: colorTheme }}
                    type="error"
                    visible={hasErrors}
                    style={{ margin: 0, padding: 0 }}
                  >
                    Must be a valid email
                  </HelperText>
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      theme={{ colors: colorTheme }}
                      mode="contained"
                      style={{ marginHorizontal: 5 }}
                      onPress={() => {
                        handleUser();
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
  },
});

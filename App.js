import * as React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  BottomNavigation,
  configureFonts,
  Provider,
  IconButton,
  Text,
} from "react-native-paper";
import merge from "deepmerge";

import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appearance, Image, View } from "react-native";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";

// import { Provider as StoreProvider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import user from "./screens/reducers/users";
// const store = configureStore({
//   reducer: { user },
// });

const applyLightTheme = {
  colors: lightTheme.colors,
};
const applyDarkTheme = {
  colors: darkTheme.colors,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(applyLightTheme, LightTheme);
const CombinedDarkTheme = merge(applyDarkTheme, DarkTheme);

let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
  colorTheme = CombinedDarkTheme;
} else {
  colorTheme = CombinedDefaultTheme;
}

const TabNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "message",
      title: "Messages",
      focusedIcon: "message-text",
      unfocusedIcon: "message-text-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    message: MessageScreen,
  });
  const [active, setActive] = React.useState("");

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const fontConfig = {
  customVariant: {
    fontFamily: "",
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  },
};

const lightThemeFont = {
  ...lightTheme,
  fonts: configureFonts({ config: fontConfig }),
};

const darkThemeFont = {
  ...darkTheme,
  fonts: configureFonts({ config: fontConfig }),
};

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    // <StoreProvider store={store}>
    <Provider theme={colorTheme}>
      <NavigationContainer theme={colorTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              headerBackVisible: false,
              title: "",
              headerStyle: {
                backgroundColor:
                  colorScheme === "dark"
                    ? "rgb(54, 47, 44)"
                    : "rgb(251, 238, 233)",
              },
              headerLeft: () => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("./assets/logo.png")}
                  />
                  <Text
                    variant="headlineMedium"
                    style={{
                      fontFamily: "Pacifico_400Regular",
                      textAlignVertical: "bottom",
                      height: 50,
                    }}
                  >
                    Croc-Lov
                  </Text>
                </View>
              ),
              headerRight: () => (
                <IconButton
                  icon="account-circle"
                  onPress={() => alert("This is a button!")}
                  size={30}
                  style={{ margin: 0 }}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </StoreProvider>
  );
}

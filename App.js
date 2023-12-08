import * as React from "react";
import merge from "deepmerge";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appearance } from "react-native";

import {
  adaptNavigationTheme,
  BottomNavigation,
  Provider,
} from "react-native-paper";

import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

// Importing custom themes
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";

// Importing screens
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import AccountScreen from "./screens/AccountScreen";

// import { Provider as StoreProvider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// const store = configureStore({
//   reducer: { user },
// });

// Defining the custom system themes
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

// Swtich color scheme based on system settings
let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  colorTheme = CombinedDarkTheme;
} else {
  colorTheme = CombinedDefaultTheme;
}

const TabNavigator = ({ navigation }) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: "account",
      title: "Account",
      focusedIcon: "account-circle",
      unfocusedIcon: "account-circle-outline",
    },
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
      // badge: true,
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    message: MessageScreen,
    account: AccountScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      shifting={true}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
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
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </StoreProvider>
  );
}

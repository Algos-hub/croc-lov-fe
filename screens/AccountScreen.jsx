import React from "react";
import { View, StatusBar, Appearance, Image, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

// Import custom theme
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

// Swtich color scheme based on system settings
let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/background.jpg")}
            resizeMode="cover"
            style={{
              height: 150,
              width: 150,
              borderRadius: 100,
              marginBottom: 20,
            }}
          />
          <Text variant="headlineMedium">ACCOUNT_NAME</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button mode="contained-tonal" style={{ marginBottom: 40 }}>
            Delete Account
          </Button>
          <Button mode="contained" theme={{ colors: colorTheme }}>
            Log Out
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

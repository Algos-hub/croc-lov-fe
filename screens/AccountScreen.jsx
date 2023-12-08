import React from "react";
import { View, StatusBar, Appearance, Image, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

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
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor:
            colorScheme === "dark" ? "rgb(54, 47, 44)" : "rgb(251, 238, 233)",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          width: "100%",
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/logo.png")}
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
      <Text>AccoutScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

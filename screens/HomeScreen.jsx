import React from "react";

import {
  View,
  StyleSheet,
  Appearance,
  ScrollView,
  Image,
  StatusBar,
  Button,
} from "react-native";

import { Card, IconButton, Menu, Text } from "react-native-paper";

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

export default function HomeScreen({ navigation }) {
  const cardArray = [1, 2, 3, 4, 5, 6];

  const displayCardArray = cardArray.map((el, i) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
      <Card
        key={i}
        style={{
          width: "80%",
          height: 400,
          marginVertical: 25,
        }}
        mode="contained"
      >
        <Card.Cover
          style={{
            height: "65%",
          }}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <Card.Title title="Name" subtitle="Short Description" />
        <Card.Content
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Menu
            key={i}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                key={i}
                icon="dots-vertical"
                size={30}
                onPress={() => openMenu()}
                style={{ marginLeft: -10 }}
              />
            }
          >
            <Menu.Item
              onPress={() => closeMenu()}
              leadingIcon="eye-off"
              title="Hide"
            />
          </Menu>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="close-circle-outline"
              size={40}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon="heart-outline"
              size={40}
              onPress={() => console.log("Pressed")}
              style={{ marginRight: -10 }}
            />
          </View>
        </Card.Content>
      </Card>
    );
  });

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
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{
          width: "100%",
        }}
      >
        {displayCardArray}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

import React from "react";

import {
  View,
  StyleSheet,
  Appearance,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";

import { Card, IconButton, Menu, Avatar, Text } from "react-native-paper";

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

export default function MessageScreen({ navigation }) {
  const messagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 2, 5, 2, 3];
  const displayMessagesArray = messagesArray.map((el, i) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
      <Card.Title
        key={i}
        title="Name"
        theme={colorTheme}
        subtitle="Latest Message"
        left={(props) => (
          <Avatar.Image
            {...props}
            source={require("../assets/background.jpg")}
          />
        )}
        right={(props) => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={30}
                onPress={() => openMenu()}
              />
            }
          >
            <Menu.Item
              onPress={() => closeMenu()}
              leadingIcon="close-circle-outline"
              title="Delete"
            />
          </Menu>
        )}
      />
    );
  });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{
          width: "100%",
        }}
      >
        {displayMessagesArray}
      </ScrollView>
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

import { View, StyleSheet, Appearance, ScrollView } from "react-native";
import { Card, IconButton, Menu, Avatar } from "react-native-paper";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

import React from "react";

let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function MessageScreen() {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{
          width: "100%",
        }}
      >
        <Card.Title
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
                onPress={() => {}}
                leadingIcon="eye-off"
                title="Hide"
              />
            </Menu>
          )}
        />
        <Card.Title
          title="Name"
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
                onPress={() => {}}
                leadingIcon="eye-off"
                title="Hide"
              />
            </Menu>
          )}
        />
        <Card.Title
          title="Name"
          onPr
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
                onPress={() => {}}
                leadingIcon="eye-off"
                title="Hide"
              />
            </Menu>
          )}
        />
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

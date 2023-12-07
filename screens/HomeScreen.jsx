import { View, StyleSheet, Appearance, ScrollView } from "react-native";
import { Card, IconButton, Menu } from "react-native-paper";
import React from "react";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function HomeScreen() {
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
        <Card
          style={{
            width: "80%",
            height: 400,
            marginTop: 50,
          }}
          mode="contained"
        >
          <Card.Cover
            style={{
              height: "65%",
            }}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title title="Name" subtitle="Description" />
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={30}
                  onPress={() => openMenu()}
                  style={{ marginLeft: -10 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {}}
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
        <Card
          style={{
            width: "80%",
            height: 400,
            marginTop: 50,
          }}
          mode="contained"
        >
          <Card.Cover
            style={{
              height: "65%",
            }}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title title="Name" subtitle="Description" />
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={30}
                  onPress={() => openMenu()}
                  style={{ marginLeft: -10 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {}}
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
        <Card
          style={{
            width: "80%",
            height: 400,
            marginTop: 50,
          }}
          mode="contained"
        >
          <Card.Cover
            style={{
              height: "65%",
            }}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title title="Name" subtitle="Description" />
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={30}
                  onPress={() => openMenu()}
                  style={{ marginLeft: -10 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {}}
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
        <Card
          style={{
            width: "80%",
            height: 400,
            marginTop: 50,
          }}
          mode="contained"
        >
          <Card.Cover
            style={{
              height: "65%",
            }}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title title="Name" subtitle="Description" />
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={30}
                  onPress={() => openMenu()}
                  style={{ marginLeft: -10 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {}}
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
        <Card
          style={{
            width: "80%",
            height: 400,
            marginTop: 50,
          }}
          mode="contained"
        >
          <Card.Cover
            style={{
              height: "65%",
            }}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title title="Name" subtitle="Description" />
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={30}
                  onPress={() => openMenu()}
                  style={{ marginLeft: -10 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {}}
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

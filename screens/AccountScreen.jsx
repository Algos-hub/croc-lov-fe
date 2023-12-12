import React, { useState, useEffect } from "react";
import { View, StatusBar, Appearance, Image, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Import custom theme
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

// import auth from "@react-native-firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { database } from "../config/firebase";
import {
  collection,
  doc,
  updateDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
// Swtich color scheme based on system settings
let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function AccountScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [changeDescription, setChangeDescription] = useState(false);

  const [avatar, setAvatar] = useState(
    "'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x'"
  );

  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setName(...querySnapshot.docs.map((doc) => doc.data().displayName));
      setAvatar(...querySnapshot.docs.map((doc) => doc.data().photoURL));
      setDescription(
        ...querySnapshot.docs.map((doc) => doc.data().description)
      );
    });

    return () => unsubscribe();
  }, []);

  async function newDescription() {
    const accountRef = doc(database, "users", auth.currentUser.uid);
    await updateDoc(accountRef, {
      description: updateDescription,
    });
    setChangeDescription(false);
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.content}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: avatar }}
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text variant="headlineMedium">{name}</Text>
          <Text
            variant="titleLarge"
            style={{
              display: changeDescription ? "none" : "flex",
              marginTop: 20,
            }}
          >
            Description:
          </Text>
          <Text
            variant="titleMedium"
            style={{ display: changeDescription ? "none" : "flex" }}
          >
            {description}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "70%",
              marginBottom: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              label="Description"
              value={updateDescription}
              mode="outlined"
              outlineStyle={{ borderRadius: 50 }}
              theme={{ colors: colorTheme }}
              style={{
                width: "100%",
                paddingHorizontal: 10,
                marginBottom: 40,
                display: changeDescription ? "flex" : "none",
              }}
              onChangeText={(text) => {
                setUpdateDescription(text);
              }}
            />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Button
                mode="contained"
                theme={{ colors: colorTheme }}
                onPress={() => {
                  changeDescription
                    ? newDescription()
                    : setChangeDescription(true);
                }}
              >
                Change description
              </Button>
              <Button
                mode="outlined"
                theme={{ colors: colorTheme }}
                style={{
                  display: changeDescription ? "flex" : "none",
                  marginTop: 20,
                }}
                onPress={() => {
                  setChangeDescription(false);
                }}
              >
                Cancel
              </Button>
            </View>
          </View>
          <Button
            mode="contained"
            theme={{ colors: colorTheme }}
            style={{ marginBottom: 40 }}
            onPress={() => {
              signOut(auth);
              navigation.navigate("Login");
            }}
          >
            Log Out
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Login")}
          >
            Delete Account
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  avatar: { height: 150, width: 150, borderRadius: 100, marginBottom: 20 },
});

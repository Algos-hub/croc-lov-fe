import React, { useState, useEffect } from "react";
import { View, StatusBar, Appearance, Image, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Import custom theme
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";

// import auth from "@react-native-firebase/auth";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { database, storage } from "../config/firebase";
import {
  collection,
  doc,
  updateDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    handleImagePicked(result);
  };

  async function handleImagePicked(pickerResult) {
    try {
      if (!pickerResult.canceled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        const accountRef = doc(database, "users", auth.currentUser.uid);
        await updateDoc(accountRef, {
          photoURL: uploadUrl,
        });
      }
    } catch (e) {
      alert("Upload failed");
    }
  }

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `userImages/${auth.currentUser.uid}`);
    const result = await uploadBytes(fileRef, blob);
    blob.close();

    return await getDownloadURL(fileRef);
  }

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

  async function deleteAccount() {
    const accountRef = doc(database, "users", auth.currentUser.uid);
    await updateDoc(accountRef, {
      photoURL: null,
      displayName: null,
      description: null,
    });
    const desertRef = ref(storage, `userImages/${auth.currentUser.uid}`);
    deleteObject(desertRef);
    deleteUser(auth.currentUser)
      .then((el) => {
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.content}>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            source={{ uri: avatar }}
            resizeMode="cover"
            style={styles.avatar}
          />
          <Button
            mode="contained"
            theme={{ colors: colorTheme }}
            style={{ marginBottom: 20 }}
            onPress={() => pickImage()}
          >
            Edit image
          </Button>
          <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
            {name}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              display: changeDescription ? "none" : "flex",
              marginTop: 20,
            }}
          >
            Description:
          </Text>
          <View style={{ width: "80%" }}>
            <Text
              variant="titleMedium"
              style={{
                display: changeDescription ? "none" : "flex",
              }}
            >
              {description}
            </Text>
          </View>
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
              label={`Description (${updateDescription.length}/250)`}
              value={updateDescription}
              mode="outlined"
              outlineStyle={{ borderRadius: 25 }}
              theme={{ colors: colorTheme }}
              multiline={true}
              style={{
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 0,
                marginBottom: 40,
                display: changeDescription ? "flex" : "none",
              }}
              onChangeText={(text) => {
                if (updateDescription.length <= 250) {
                  setUpdateDescription(text);
                } else {
                  setUpdateDescription(text.slice(0, -1));
                }
              }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
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
            theme={{ colors: colorTheme }}
            style={{ marginBottom: 40 }}
            onPress={() => {
              deleteAccount();
            }}
          >
            Delete account
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  avatar: { height: 150, width: 150, borderRadius: 100, marginBottom: 20 },
});

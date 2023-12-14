import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  Appearance,
  ScrollView,
  StatusBar,
} from "react-native";

import {
  Card,
  IconButton,
  Menu,
  Avatar,
  TouchableRipple,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { database } from "../config/firebase";

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

export default function MessageScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "!=", auth.currentUser.uid));

    onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          likes: doc.data().likes,
        }))
      );
    });
  }, []);
  useEffect(() => {
    const collectionRef = collection(database, "messages");
    const q = query(
      collectionRef,
      where("recipient", "==", auth.currentUser.uid),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      setLastMessages(
        querySnapshot.docs.map((doc) => ({
          recipient: doc.data().recipient,
          createdAt: doc.data().createdAt,
          sender: doc.data().user._id,
          message: doc.data().text,
        }))
      );
    });
  }, []);
  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "==", auth.currentUser.uid));
    onSnapshot(q, (querySnapshot) => {
      setCurrentUser(
        ...querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          likes: doc.data().likes,
        }))
      );
    });
  }, []);
  const displayMessagesArray = users.map((el, i) => {
    if (
      el.likes.includes(auth.currentUser.uid) &&
      currentUser?.likes?.includes(el.uid) &&
      el.displayName !== null
    ) {
      const lm = lastMessages.find((element) => element.sender === el.uid);

      return (
        <TouchableRipple
          style={{ width: "100%" }}
          onPress={() => navigation.navigate("Discussion", { thread: el })}
          rippleColor="rgba(0, 0, 0, .32)"
          key={i}
        >
          <Card.Title
            title={el.displayName}
            theme={colorTheme}
            subtitleStyle={{ fontStyle: lm ? "normal" : "italic" }}
            subtitle={lm ? lm.message : "Send a message"}
            left={(props) => (
              <Avatar.Image {...props} source={{ uri: el.photoURL }} />
            )}
          />
        </TouchableRipple>
      );
    }
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

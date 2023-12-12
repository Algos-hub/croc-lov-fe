import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  StyleSheet,
  Appearance,
  ScrollView,
  StatusBar,
} from "react-native";

import { Card, IconButton } from "react-native-paper";

import { getAuth } from "firebase/auth";

import {
  collection,
  query,
  where,
  onSnapshot,
  arrayUnion,
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
} from "firebase/firestore";

// Import custom theme
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";
// import firestore from "@react-native-firebase/firestore";
import { database } from "../config/firebase";
// Swtich color scheme based on system settings
let colorTheme;
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  colorTheme = darkTheme.colors;
} else {
  colorTheme = lightTheme.colors;
}

export default function HomeScreen() {
  const auth = getAuth();
  const [userCard, setUserCard] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "!=", auth.currentUser.uid));

    onSnapshot(q, (querySnapshot) => {
      setUserCard(
        querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid,
          description: doc.data().description,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          likes: doc.data().likes,
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
          description: doc.data().description,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          likes: doc.data().likes,
        }))
      );
    });
  }, []);
  async function addLike(el) {
    const accountRef = doc(database, "users", auth.currentUser.uid);
    await updateDoc(accountRef, {
      likes: arrayUnion(el.uid),
    });
    if (
      el.likes.includes(auth.currentUser.uid) &&
      currentUser?.likes?.includes(el.uid)
    ) {
      addDoc(collection(database, "messages"), {
        latestMessage: { createdAt, text },
        users: [el.uid, auth.currentUser.uid],
      });
    }
  }
  async function removeLike(uid) {
    const accountRef = doc(database, "users", auth.currentUser.uid);
    await updateDoc(accountRef, {
      likes: arrayRemove(uid),
    });
  }

  const displayCardArray = userCard.map((el, i) => {
    if (el.uid !== auth.currentUser.uid) {
      return (
        <Card key={i} style={styles.card} mode="contained">
          <Card.Cover
            style={{
              height: "75%",
            }}
            source={{ uri: el.photoURL }}
          />
          <Card.Title title={el.displayName} subtitle={el.description} />
          <Card.Actions>
            <View style={styles.cardButtons}>
              <IconButton
                icon="close-circle-outline"
                size={40}
                onPress={() => {
                  removeLike(el.uid);
                }}
              />
              <IconButton
                icon={
                  !currentUser?.likes?.includes(el.uid)
                    ? "heart-outline"
                    : "heart"
                }
                size={40}
                onPress={() => {
                  addLike(el);
                  // if (
                  //   el.likes.includes(auth.currentUser.uid) &&
                  //   currentUser?.likes?.includes(el.uid)
                  // ) {
                  //   addDoc(collection(database, "messages"), {
                  //     latestMessage: { createdAt, text },
                  //     users: [el.uid, auth.currentUser.uid],
                  //   });
                  // }
                }}
              />
            </View>
          </Card.Actions>
        </Card>
      );
    }
  });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingVertical: 25 }}
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
  card: {
    width: "80%",
    height: 600,
    marginVertical: 25,
  },
  cardButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

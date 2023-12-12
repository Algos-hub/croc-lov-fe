import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, Appearance } from "react-native";

import { TextInput, IconButton } from "react-native-paper";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { getAuth } from "firebase/auth";

import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  onSnapshot,
  or,
  and,
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

export default function DiscussionScreen({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(
    "'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x'"
  );
  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setName(...querySnapshot.docs.map((doc) => doc.data().displayName));
      setAvatar(...querySnapshot.docs.map((doc) => doc.data().photoURL));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const collectionRef = collection(database, "messages");
    const q = query(
      collectionRef,
      or(
        and(
          where("user._id", "==", thread.uid),
          where("recipient", "==", auth.currentUser.uid)
        ),
        and(
          where("user._id", "==", auth.currentUser.uid),
          where("recipient", "==", thread.uid)
        )
      ),
      orderBy("createdAt", "desc")
    );
    console.log(q);
    console.log(thread.uid);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          recipient: doc.data().recipient,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user, recipient } = messages;
    addDoc(collection(database, "messages"), {
      _id,
      createdAt,
      text,
      recipient,
      user,
    });
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colorTheme.primary,
          },
          left: { backgroundColor: colorTheme.surfaceVariant },
        }}
        textStyle={{
          right: {
            color: colorTheme.onPrimary,
          },
          left: { color: colorTheme.onSurfaceVariant },
        }}
      />
    );
  };

  const auth = getAuth();

  const customtInputToolbar = (props) => {
    return (
      <TextInput
        {...props}
        value={text}
        theme={{ colors: colorTheme }}
        placeholder="Type a message"
        underlineStyle={{ width: 0 }}
        onChangeText={(text) => setText(text)}
        style={styles.TextInput}
        right={
          text.length !== 0 ? (
            <TextInput.Icon
              icon="send-outline"
              onPress={() => {
                onSend({
                  _id: Math.round(Math.random() * 1000000),
                  text: text,
                  createdAt: new Date(),
                  recipient: thread.uid,
                  user: {
                    _id: auth?.currentUser?.uid,
                    avatar: avatar,
                    name: name,
                  },
                });
                setText("");
              }}
            />
          ) : (
            ""
          )
        }
      />
    );
  };

  function scrollToBottomComponent() {
    return (
      <IconButton icon="chevron-double-down" size={25} mode="contained-tonal" />
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        dateFormat="lll"
        user={{
          _id: auth.currentUser.uid,
          avatar: "https://i.pravatar.cc/300",
        }}
        renderTime={() => null}
        renderBubble={(props) => renderBubble(props)}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 45,
  },
  TextInput: {
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});

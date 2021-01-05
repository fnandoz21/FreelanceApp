import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { SafeAreaView } from "react-native";

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection("entities");
  const userID = props.extraData.id;

  useEffect(() => {
    const unsub = entityRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );

    return () => {
      unsub();
    };
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const onCheck = () => {
    console.log("check");
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={onCheck}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity> */}
        <Button
          onPress={onCheck}
          title="Check"
          titleStyle={{ color: "white", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: "#788eec",
            height: 48,
            borderRadius: 5,
          }}
          containerStyle={{
            width: 80,
            height: 48,
            marginLeft: 5,
          }}
        />
      </View>
      {entities && (
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
            contentContainerStyle={{ paddingBottom: "30%" }}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

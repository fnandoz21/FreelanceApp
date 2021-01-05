// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   TouchableHighlight,
//   View,
//   Image,
//   Alert,
//   SafeAreaView,
//   Platform,
// } from "react-native";
// import { Button } from "react-native-elements";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useDimensions } from "@react-native-community/hooks";

// export default function App() {
//   const handlePress = () => console.log("mati saltied");
//   console.log(useDimensions());

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text numberOfLines={1} onPress={handlePress} style={styles.malty}>
//         Hello React Native im gonna salty my malties hehe facts word on god no
//         cap salty malty dont fault me
//       </Text>
//       <TouchableHighlight onPress={() => console.log("Image tapped")}>
//         <Image
//           source={{
//             width: 300,
//             height: 300,
//             uri:
//               "https://cdn.vox-cdn.com/thumbor/nRxG0Bw2t_PZEHrvZnHMtAlP-ms=/0x0:7742x5164/920x613/filters:focal(3252x1963:4490x3201):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68451372/1288914647.0.jpg",
//           }}
//           style={styles.jones}
//         />
//       </TouchableHighlight>
//       <Image
//         style={styles.tinyLogo}
//         source={require("./assets/adaptive-icon.png")}
//       />
//       {/* <StatusBar style="auto" /> */}
//       {/* <Button title="Solid Button" raised={true} onPress={handlePress} /> */}
//       <View style={styles.heheButton}>
//         <Button
//           title="hehe"
//           containerStyle={styles.heheButton}
//           buttonStyle={styles.heheColor}
//           raised={true}
//           onPress={() =>
//             Alert.alert("Are you salty?", "hehe", [
//               { text: "word", onPress: () => console.log("word") },
//               { text: "facts", onPress: () => console.log("facts") },
//             ])
//           }
//         />
//       </View>
//       <Icon
//         reverse
//         raised
//         name="angle-down"
//         type="font-awesome"
//         color="#f50"
//         size={100}
//         style={styles.arrow}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "dodgerblue",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   malty: {
//     position: "absolute",
//     top: Platform.OS === "web" ? "2%" : "20%",
//   },
//   tinyLogo: {
//     width: 200,
//     height: 200,
//   },
//   jones: {
//     width: 200,
//     height: 200,
//     alignItems: "center",
//   },
//   heheButton: {
//     position: "absolute",
//     bottom: Platform.OS === "web" ? 0 : "7%",
//     alignItems: "center",
//   },
//   heheColor: {
//     height: 50,
//     width: 60,
//     backgroundColor: "#FF385C",
//   },
//   arrow: {
//     position: "absolute",
//     bottom: Platform.OS === "web" ? "10%" : "13%",
//     alignItems: "center",
//   },
// });

import "react-native-gesture-handler";
import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "./src/firebase/config";
import { AuthContext } from "./src/AuthContext/AuthContext";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
// const AuthContext = createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // if (loading) {
  //   return <></>;
  // }

  //   useEffect(() => {
  //     const usersRef = firebase.firestore().collection("users");
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         usersRef
  //           .doc(user.uid)
  //           .get()
  //           .then((document) => {
  //             const userData = document.data();
  //             console.log("check");
  //             setUser(userData);
  //             setLoading(false);
  //           })
  //           .catch((error) => {
  //             setLoading(false);
  //           });
  //       } else {
  //         setLoading(false);
  //       }
  //     });
  //   }, []);

  //   return loading ? (
  //     <>loading</>
  //   ) : (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
  //         <Stack.Screen name="Home">
  //           {(props) => <HomeScreen {...props} extraData={user} />}
  //         </Stack.Screen>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Registration" component={RegistrationScreen} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  // export default function App({ navigation }) {
  //   const [state, dispatch] = useReducer(
  //     (prevState, action) => {
  //       switch (action.type) {
  //         case "RESTORE_TOKEN":
  //           return {
  //             ...prevState,
  //             userToken: action.token,
  //             isLoading: false,
  //           };
  //         case "SIGN_IN":
  //           return {
  //             ...prevState,
  //             isSignout: false,
  //             userToken: action.token,
  //           };
  //         case "SIGN_OUT":
  //           return {
  //             ...prevState,
  //             isSignout: true,
  //             userToken: null,
  //           };
  //       }
  //     },
  //     {
  //       isLoading: true,
  //       isSignout: false,
  //       userToken: null,
  //     }
  //   );

  //   useEffect(() => {
  //     // Fetch the token from storage then navigate to our appropriate place
  //     const bootstrapAsync = async () => {
  //       let userToken;

  //       try {
  //         userToken = await AsyncStorage.getItem("userToken");
  //       } catch (e) {
  //         // Restoring token failed
  //       }

  //       // After restoring token, we may need to validate it in production apps

  //       // This will switch to the App screen or Auth screen and this loading
  //       // screen will be unmounted and thrown away.
  //       dispatch({ type: "RESTORE_TOKEN", token: userToken });
  //     };

  //     bootstrapAsync();
  //   }, []);

  //   const authContext = useMemo(
  //     () => ({
  //       signIn: async (data) => {
  //         // In a production app, we need to send some data (usually username, password) to server and get a token
  //         // We will also need to handle errors if sign in failed
  //         // After getting token, we need to persist the token using `AsyncStorage`
  //         // In the example, we'll use a dummy token

  //         dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
  //       },
  //       signOut: () => dispatch({ type: "SIGN_OUT" }),
  //       signUp: async (data) => {
  //         // In a production app, we need to send user data to server and get a token
  //         // We will also need to handle errors if sign up failed
  //         // After getting token, we need to persist the token using `AsyncStorage`
  //         // In the example, we'll use a dummy token

  //         dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
  //       },
  //     }),
  //     []
  //   );

  //   return (
  //     <AuthContext.Provider value={authContext}>
  //       <Stack.Navigator>
  //         {state.userToken == null ? (
  //           <>
  //             <Stack.Screen name="Login" component={LoginScreen} />
  //             <Stack.Screen name="Registration" component={RegistrationScreen} />
  //           </>
  //         ) : (
  //           <Stack.Screen name="Home">
  //             {(props) => <HomeScreen {...props} extraData={user} />}
  //           </Stack.Screen>
  //         )}
  //       </Stack.Navigator>
  //     </AuthContext.Provider>
  //   );
  // }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            const uid = response.user.uid;
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .get()
              .then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  alert("User does not exist anymore.");
                  return;
                }
                const userData = firestoreDocument.data();
                setUser(userData);
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      },
      signOut: () => {
        firebase
          .signOut()
          .then(() => {
            setUser(null);
          })
          .catch((error) => {
            alert(error);
          });
      },
      signUp: async (data) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            const uid = response.user.uid;
            const userData = {
              id: uid,
              email: data.email,
              fullName: data.fullName,
            };
            const usersRef = firebase.firestore().collection("users");
            usersRef
              .doc(uid)
              .set(userData)
              .then(() => {
                setUser(userData);
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      },
    }),
    []
  );

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              options={{
                headerRight: () => (
                  <Button
                    onPress={signOut}
                    title="Logout"
                    // titleStyle={{ color: "#788eec" }}
                    buttonStyle={{ backgroundColor: "#788eec" }}
                  />
                ),
              }}
            >
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

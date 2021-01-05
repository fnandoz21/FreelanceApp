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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
                headerStyle: {
                  backgroundColor: "#b3b3b3",
                },
                headerRight: () => (
                  <>
                    <Button
                      onPress={signOut}
                      title="Logout"
                      titleStyle={{ fontSize: 16 }}
                      buttonStyle={{ backgroundColor: "#788eec", width: 80 }}
                      containerStyle={{ marginRight: 5, marginBottom: 5 }}
                    />
                    {/* <Icon
                      reverse
                      raised
                      name="angle-down"
                      type="font-awesome"
                      color="#f50"
                      size={50}
                      containerStyle={{ marginLeft: 100 }}
                      // style={styles.arrow}
                    /> */}
                  </>
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

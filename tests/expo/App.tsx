import { StyleSheet, View } from "react-native";
import { makeSupabase } from "./src/makeSupabase";
import { Button } from "react-native-elements";



export default function App() {

  return (
    <View style={styles.container}>
      <Button
        title={"Click Me"}
        style={{ width: 100, height: 100 }}
        onPress={makeSupabase}
        type={"solid"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

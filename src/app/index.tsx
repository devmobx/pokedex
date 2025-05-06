import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

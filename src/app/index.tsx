import { SafeAreaView } from "react-native";
import { Text, View } from "tamagui";

export default function StartScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={"$4"} color={"brown"}>
          Hello
        </Text>
      </View>
    </SafeAreaView>
  );
}

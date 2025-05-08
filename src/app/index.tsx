import { SafeAreaView } from "react-native";
import { Text, View } from "tamagui";

export default function StartScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} justify="center" items="center">
        <Text
          fontSize="$10"
          color="blueviolet"
          fontFamily="$body"
          fontWeight="700"
        >
          Hello
        </Text>
      </View>
    </SafeAreaView>
  );
}

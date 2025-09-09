import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text>Home Screen!</Text>
      <Button onPress={() => navigation.navigate('JobDetails')}>Details</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
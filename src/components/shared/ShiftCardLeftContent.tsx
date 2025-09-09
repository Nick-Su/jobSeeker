import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const LeftContent = ({imageUri}: { imageUri: string}) => (
  <FastImage
    style={styles.logo}
    source={{
        uri: imageUri,
        priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  }
});

export default LeftContent;

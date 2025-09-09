import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { useGetShiftsListQuery } from "../../api/shiftsApi";
import Geolocation from '@react-native-community/geolocation';
import { useState } from "react";
import { ICoordinates, IShift } from "../../interfaces/shift.interface";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Divider, Card, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [coords, setCoords] = useState<ICoordinates>();

  if (!coords) {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      // Debug!
      setCoords({longitude: 38.987221, latitude: 45.039268});
    });
  }

  const { data, error, isLoading } = useGetShiftsListQuery(
    {latitude: coords?.latitude, longitude: coords?.longitude},
    {skip: !coords}
  )

  const renderItem = (data: { index: number; item: IShift }) => {
    const item = data.item;

    const LeftContent = (props: any) => (
      <FastImage
          style={styles.logo}
          source={{
              uri: item.logo,
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
      />
    );

    const ShiftRating = (
      <>
        {item.customerRating ? (<><FontAwesome name="star" size={15} color="orange" />{item.customerRating} </>) : ''}
        {item.customerFeedbacksCount}
      </>
    );
    
    return (
      <Card style={styles.cardStyle}>
        <Card.Title 
          title={item.workTypes[0].nameOne} 
          subtitle={ShiftRating} 
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">{item.priceWorker}₽</Text>
          <Text variant="bodyMedium">{item.address}</Text>
          <Divider style={styles.divider}/>
          <Text>{item.dateStartByCity} с {item.timeStartByCity} до {item.timeEndByCity}</Text>
        </Card.Content>
      </Card>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )}
      <FlashList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Text>Нет смен в текущей локации</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  cardStyle: {
    marginVertical: 10
  },
  divider: {
    marginVertical: 10
  },
  contentContainerStyle: {
   marginHorizontal: 16
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  }
});

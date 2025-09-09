import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useGetShiftsListQuery } from "../../api/shiftsApi";
import Geolocation from '@react-native-community/geolocation';
import { useState, useCallback } from "react";
import { ICoordinates, IShift } from "../../interfaces/shift.interface";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Divider, Card, Text } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import LeftContent from "../../components/shared/ShiftCardLeftContent";
import ShiftRating from "../../components/shared/ShiftRatingSummary";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [coordinates, setCoordinates] = useState<ICoordinates>();

  if (!coordinates) {
    Geolocation.getCurrentPosition(info => {
      setCoordinates({longitude: info.coords.longitude, latitude: info.coords.latitude});
    });
  }

  const { data, error, isLoading } = useGetShiftsListQuery(
    {latitude: coordinates?.latitude!, longitude: coordinates?.longitude!},
    {skip: !coordinates}
  )

  const renderItem = useCallback((data: { index: number; item: IShift }) => {
    const item = data.item;
        
    return (
      <Card style={styles.cardStyle} onPress={() => navigation.navigate('ShiftDetails', {item})}>
        <Card.Title
          title={item.workTypes[0].nameOne} 
          subtitle={<ShiftRating customerRating={item.customerRating} customerFeedbacksCount={item.customerFeedbacksCount} />} 
          left={() => LeftContent({imageUri: item.logo })}
        />
        <Card.Content>
          <Text variant="titleLarge">{item.priceWorker}₽</Text>
          <Text variant="bodyMedium">{item.address}</Text>
          <Divider style={styles.divider}/>
          <Text>{item.dateStartByCity} с {item.timeStartByCity} до {item.timeEndByCity}</Text>
        </Card.Content>
      </Card>
    )
  }, [data]);
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator animating={true} color={MD2Colors.red800} />}
      {(!isLoading && data && data.length === 0) && <Text>Нет смен в текущей локации.</Text>}
      {error && <Text>Не удалось получить данные.</Text>}

      <FlashList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cardStyle: {
    marginVertical: 10
  },
  divider: {
    marginVertical: 10
  },
});

import React from 'react';
import { StyleSheet } from "react-native";
import { Button, Card, Divider, Text } from 'react-native-paper';
import { IShift } from "../../interfaces/shift.interface";
import LeftContent from "../../components/shared/ShiftCardLeftContent";
import { useNavigation } from "@react-navigation/native";
import ShiftRating from '../../components/shared/ShiftRatingSummary';
import { TShiftDetailsRouteProps } from '../../navigation/Navigation';

export default function ShiftDetails({ route }: TShiftDetailsRouteProps) {
  const navigation = useNavigation();
  const { item }: { item: IShift} = route.params;
  
  return (
    <Card>
      <Card.Title 
        title={item.workTypes[0].nameOne}
        subtitle={<ShiftRating customerRating={item.customerRating} customerFeedbacksCount={item.customerFeedbacksCount} />} 
        left={() => LeftContent({imageUri: item.logo })}
      />
     <Card.Content>
          <Text variant="titleLarge">{item.priceWorker}₽ за смену</Text>
          <Text variant="bodyMedium">{item.address}</Text>
          <Text variant="bodyMedium">{item.companyName}</Text>

          <Text>Набрано {item.currentWorkers} из {item.planWorkers}</Text>
          <Divider style={styles.divider}/>
          <Text>{item.dateStartByCity} с {item.timeStartByCity} до {item.timeEndByCity}</Text>
        </Card.Content>
    
    <Card.Actions>
      <Button onPress={() => navigation.popToTop()}>Назад</Button>
    </Card.Actions>
  </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
  contentContainerStyle: {
   marginHorizontal: 16,
  },
});

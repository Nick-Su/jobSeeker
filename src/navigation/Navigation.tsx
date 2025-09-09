import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/Home';
import ShiftDetails from '../screens/shiftDetails/ShiftDetails';
import { RouteProp } from '@react-navigation/native';
import { IShift } from '../interfaces/shift.interface';

export type RootStackParamList = {
  Home: undefined;
  ShiftDetails: { item: IShift };
};

type TShiftDetailsRouteProp = RouteProp<RootStackParamList, 'ShiftDetails'>;

export type TShiftDetailsRouteProps = {
  route: TShiftDetailsRouteProp;
};

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Доступные смены'
      }
    },
    ShiftDetails: {
      screen: ShiftDetails,
      options: {
        title: 'О смене'
      }
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/Home';

import JobDetails from '../screens/shiftDetails/ShiftDetails';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Доступные смены'
      }
    },
    JobDetails: {
      screen: JobDetails,
      options: {
        title: 'О смене'
      }
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import CustomDrawer from '../components/CustomDrawer';
import Profile from '../pages/Profile';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
  return(
    <AppDrawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} drawerStyle={{width: 280}}>
      <AppDrawer.Screen
        name="Home"
        component={Home}
      />

      <AppDrawer.Screen
        name="Registrar"
        component={New}
      />

      <AppDrawer.Screen
        name="Profile"
        component={Profile}
      />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;
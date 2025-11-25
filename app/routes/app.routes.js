import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
  return(
    <AppDrawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} drawerStyle={{width: 280}}>
      <AppDrawer.Screen
        name="Home"
        component={Home}
      />

      <AppDrawer.Screen
        name="Register"
        component={New}
      />

      <AppDrawer.Screen
        name="Meu Perfil"
        component={Home}
      />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;
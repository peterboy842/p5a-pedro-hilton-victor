import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Container,
  Header,
  Logo,
  Welcome,
  Menu,
  Item,
  ItemText
} from './styles';

export default function CustomDrawer(props){
  const { state, navigation } = props;
  const activeRoute = state && state.routeNames && state.index != null
    ? state.routeNames[state.index]
    : null;

  function handleNavigate(route){
    navigation.navigate(route);
    navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{padding:0}}>
      <Container>
        <Header>
          <Logo source={require('../../../assets/Logo.png')} resizeMode="contain" />
          <Welcome>Bem-vindo</Welcome>
        </Header>

        <Menu>
          <Item active={activeRoute === 'Home'} onPress={() => handleNavigate('Home')}>
            <ItemText active={activeRoute === 'Home'}>Home</ItemText>
          </Item>

          <Item active={activeRoute === 'Register'} onPress={() => handleNavigate('Register')}>
            <ItemText active={activeRoute === 'Register'}>Registrar</ItemText>
          </Item>

          <Item active={activeRoute === 'Meu Perfil'} onPress={() => handleNavigate('Meu Perfil')}>
            <ItemText active={activeRoute === 'Meu Perfil'}>Meu perfil</ItemText>
          </Item>
        </Menu>
      </Container>
    </DrawerContentScrollView>
  )
}

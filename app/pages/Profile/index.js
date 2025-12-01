import React, {useState, useContext, useEffect}  from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { AuthContext } from '../../context/auth';

import {
  Background,
  Container,
  Header,
  MenuButton,
  HeaderTitle,
  Input,
  SubmitButton,
  SubmitText,
  ContainerButton,
  TypeButton,
  TypeButtonText,
  WelcomeText,
  ActionButton,
  ActionButtonText,
} from './styles';


export default function Profile() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);  
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  function openMenu() {
    navigation.openDrawer();
  }

   // Carregar nome do usuário
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get('/me');
        setName(response.data.name);
      } catch (err) {
        console.log("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  function handleRegister() {
    navigation.navigate('Registrar');
  }

  function handleLogout() {
    signOut();
  }

return (
    <Background>
      <Container>

        <Header>
          <TouchableOpacity onPress={openMenu}>
            <MenuButton />
          </TouchableOpacity>

          <HeaderTitle>Perfil</HeaderTitle>
        </Header>

        {loading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : (
          <>
            <WelcomeText>
              Bem-vindo de volta, {name}
            </WelcomeText>

            <ActionButton onPress={handleRegister}>
              <ActionButtonText>Registrar Gastos</ActionButtonText>
            </ActionButton>

            <ActionButton
              style={{ backgroundColor: '#c0392b' }}
              onPress={handleLogout}
            >
              <ActionButtonText>Sair</ActionButtonText>
            </ActionButton>
          </>
        )}

      </Container>
    </Background>
);
}
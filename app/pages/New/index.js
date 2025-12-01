import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

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
  TypeButtonText
} from './styles';

export default function New() {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');

  function openMenu() {
    navigation.openDrawer();
  }

  async function handleRegister() {
    if (!description || !value || !type) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/receive', {
        description,
        value: Number(value),
        type,
        date: new Date().toLocaleDateString('pt-BR')
      });

      navigation.navigate('Home');
      navigation.closeDrawer();

      setValue('');
      setDescription('');
      setType('receita');

    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={openMenu}>
            <MenuButton />
          </TouchableOpacity>

          <HeaderTitle>Novo lançamento</HeaderTitle>
        </Header>

        <Input
          placeholder="Nome"
          value={description}
          onChangeText={setDescription}
        />

        <Input
          placeholder="Valor"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <ContainerButton>
          <TypeButton
            style={{ backgroundColor: type === 'receita' ? '#00b94a' : '#F0F4FF' }}
            onPress={() => setType('receita')}
          >
            <TypeButtonText style={{ color: type === 'receita' ? '#FFF' : '#333' }}>
              Receita
            </TypeButtonText>
          </TypeButton>

          <TypeButton
            style={{ backgroundColor: type === 'despesa' ? '#c0392b' : '#F0F4FF' }}
            onPress={() => setType('despesa')}
          >
            <TypeButtonText style={{ color: type === 'despesa' ? '#FFF' : '#333' }}>
              Despesa
            </TypeButtonText>
          </TypeButton>
        </ContainerButton>

        <SubmitButton onPress={handleRegister}>
          <SubmitText>Registar</SubmitText>
        </SubmitButton>

      </Container>
    </Background>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { AuthContext } from '../../context/auth';

import {
  Background,
  Container,
  Header,
  MenuButton,
  HeaderTitle,
  ListBalance,
  BalanceCard,
  BalanceTitle,
  BalanceValue,
  MovementList,
  MovementCard,
  MovementTag,
  MovementValue,
  MovementDescription,
  SectionTitle,
  Row
} from './styles';

export default function Home(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [balance, setBalance] = useState({ total: 0, entradas: 0, saidas: 0 });
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function loadData(){
      try{
        const respBal = await api.get('/balance');
        // expect respBal.data to contain { total, entradas, saidas }
        setBalance(respBal.data);
      }catch(err){
        // fallback: keep zeros
      }

      try{
        const respMov = await api.get('/receives');
        // expect array of records
        setMovements(respMov.data || []);
      }catch(err){
        // fallback sample data
        setMovements([
          { id: '1', description: 'Supermercado', value: 35.30, type: 'despesa' },
          { id: '2', description: 'Salário', value: 780.30, type: 'receita' },
          { id: '3', description: 'Freelance', value: 50.00, type: 'receita' },
          { id: '4', description: 'Conta luz', value: 155.90, type: 'despesa' }
        ]);
      }
    }

    loadData();
  }, []);

  function openMenu(){
    navigation.openDrawer();
  }

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={openMenu}>
            <MenuButton />
          </TouchableOpacity>

          <HeaderTitle>Minhas movimentações</HeaderTitle>
        </Header>

        <ListBalance
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { key: 'total', title: 'Saldo atual', value: balance.total, color: '#3A3AD8' },
            { key: 'entradas', title: 'Entradas de hoje', value: balance.entradas, color: '#00C851' },
            { key: 'saidas', title: 'Saídas de hoje', value: balance.saidas, color: '#FF5252' }
          ]}
          renderItem={({ item }) => (
            <BalanceCard style={{ backgroundColor: item.color }}>
              <BalanceTitle>{item.title}</BalanceTitle>
              <BalanceValue>R$ {Number(item.value).toFixed(2)}</BalanceValue>
            </BalanceCard>
          )}
          keyExtractor={item => item.key}
        />

        <SectionTitle>Últimas movimentações</SectionTitle>

        <MovementList
          data={movements}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MovementCard>
              <Row>
                <MovementTag type={item.type}>{item.type === 'receita' ? 'receita' : 'despesa'}</MovementTag>
                <MovementDescription>{item.description}</MovementDescription>
              </Row>

              <MovementValue type={item.type}>R$ {Number(item.value).toFixed(2)}</MovementValue>
            </MovementCard>
          )}
        />
      </Container>
    </Background>
  )
}
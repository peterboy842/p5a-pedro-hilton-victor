import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Alert, Modal, View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  Row,
  DeleteIcon
} from './styles';

export default function Home(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [balance, setBalance] = useState({ total: 0, entradas: 0, saidas: 0 });
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


   async function loadData() {
    const dateToday = new Date().toLocaleDateString("pt-BR");

    try {
      const respBal = await api.get('/balance', {
        params: { date: dateToday }
      });
      setBalance(respBal.data || []);
    } catch (err) {}

    try {
      const respMov = await api.get('/receives', {
        params: { date: dateToday }
      });
      setMovements(respMov.data || []);
    } catch (err) {}
  }

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  function openMenu(){
    navigation.openDrawer();
  }

  function handleDeleteItem(item){
    setModalVisible(true)
    setSelectedItem(item);
  }

 
  async function deleteItem(id) {
    try {
      await api.delete(`/receives/delete?item_id=${id}`);

      setMovements(prev => prev.filter(item => item.id !== id));
      setModalVisible(false);
      await loadData();
    } catch (err) {
      console.log("Erro ao deletar:", err);
    }
  }

  function ModalDelete({ visible, onClose, onConfirm }) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
          <View style={{
            width: "80%",
            backgroundColor: "#FFF",
            padding: 20,
            borderRadius: 8
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
              Atenção!
            </Text>

            <Text style={{ marginBottom: 20 }}>
              Você tem certeza que deseja deletar esse registro?
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={onClose}>
                <Text style={{ color: "#555", fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onConfirm}>
                <Text style={{ color: "red", fontSize: 16 }}>Deletar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
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
                <TouchableOpacity onPress={() => handleDeleteItem(item)} >
                  <Icon name="delete" size={28} color="#ff4040" />
                </TouchableOpacity>
                <MovementTag type={item.type}>{item.type === 'receita' ? 'receita' : 'despesa'}</MovementTag>
                <MovementDescription>{item.description}</MovementDescription>
              </Row>

              <MovementValue type={item.type}>R$ {Number(item.value).toFixed(2)}</MovementValue>
            </MovementCard>
          )}
        />
        <ModalDelete
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => deleteItem(selectedItem.id)}
        />
      </Container>
    </Background>
  )
}
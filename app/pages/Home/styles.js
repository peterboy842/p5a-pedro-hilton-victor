import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex:1;
  background-color: #F0F4FF;
`;

export const ListBalance = styled.FlatList`
  max-height: 190px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const MenuButton = styled.View`
  width: 28px;
  height: 18px;
  border-left-width: 2px;
  border-bottom-width: 2px;
  border-color: #333;
  margin-right: 12px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

export const BalanceCard = styled.View`
  width: 260px;
  height: 120px;
  border-radius: 8px;
  padding: 16px;
  margin-right: 12px;
  justify-content: center;
`;

export const BalanceTitle = styled.Text`
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  margin-bottom: 8px;
`;

export const BalanceValue = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
`;

export const SectionTitle = styled.Text`
  margin-top: 18px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 700;
`;

export const MovementList = styled.FlatList`
  margin-bottom: 24px;
`;

export const MovementCard = styled.View`
  background: #fff;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MovementTag = styled.Text`
  background: ${props => props.type === 'receita' ? '#00C851' : '#FF5252'};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  margin-right: 12px;
`;

export const MovementDescription = styled.Text`
  color: #333;
  font-weight: 600;
`;

export const MovementValue = styled.Text`
  color: ${props => props.type === 'receita' ? '#00C851' : '#FF5252'};
  font-weight: 700;
`;

export const DeleteIcon = styled.View`
  width: 22px;
  height: 22px;
  border-left-width: 2px;
  border-bottom-width: 2px;
  border-color: #c0392b;
  transform: rotate(45deg);
  margin-left: 12px;
`;
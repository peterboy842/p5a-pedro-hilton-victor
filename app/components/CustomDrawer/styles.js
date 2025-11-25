import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  padding: 24px 16px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
`;

export const Welcome = styled.Text`
  font-size: 14px;
  color: #333333;
  font-weight: 700;
`;

export const Menu = styled.View`
  margin-top: 8px;
`;

export const Item = styled.TouchableOpacity`
  background: ${props => (props.active ? '#3939D8' : '#F0F4FF')};
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const ItemText = styled.Text`
  color: ${props => (props.active ? '#FFFFFF' : '#333')};
  font-weight: 600;
`;

export const DrawerWidth = Math.min(Math.round(width * 0.75), 320);

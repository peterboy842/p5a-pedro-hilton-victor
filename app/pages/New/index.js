import React from 'react';
import { View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Form,
  Input,
  SubmitButton,
  SubmitText
} from './styles';

export default function New(){
  return (
    <Container>
      <Header>
        <Title>Novo lançamento</Title>
      </Header>

      <Form>
        <Input placeholder="Descrição" />
        <Input placeholder="Valor" keyboardType="numeric" />
        <SubmitButton>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>
      </Form>
    </Container>
  )
}

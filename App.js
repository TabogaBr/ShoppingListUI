import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Input, Header, Button, ListItem } from 'react-native-elements';
import React, { useState } from 'react';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const renderItem = ({ item }) => (
      <ListItem.Swipeable
        rightContent={
          <Button
            title="Delete"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            onPress={() => deleteItem(item)}
          />
        }>
        <ListItem.Content>
          <ListItem.Title>{item.product}</ListItem.Title>
          <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
  );


  const saveItem = () => {
    setList([...list, { product: product, amount: amount }]);
    setProduct('');
    setAmount('');
  }

  const deleteItem = (item) => {
    setList(list.filter((i) => i !== item));
  }

  return (
    <View style={styles.container}>
      <Header
        placement='center'
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }} />
      <Input
        placeholder='Product' label='PRODUCT'
        onChangeText={product => setProduct(product)}
        value={product} />
      <Input
        placeholder='Amount' label='AMOUNT'
        onChangeText={amount => setAmount(amount)}
        value={amount} />
      <Button
        style={styles.button}
        raised icon={{ name: 'save' }} onPress={saveItem} title='SAVE' />
      <View style={styles.list}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Text style={styles.title} > Shopping List </Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
  },
  list: {
    width: '80%',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  title: {
    color: 'blue',
    fontSize: 18,
  },
});

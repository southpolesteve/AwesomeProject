/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CosmosClient} from '@azure/cosmos';

const endpoint = 'https://amos-cosmosdb.documents.azure.com:443/';
const key =
  'k8rrY0TEv8XvllYkJ4PlhSanMkTa9eAQxJjt146Ad5z9RbzDLfjlw8QSVVNUDuqZGniBPmYxIMBYhhSE3h8gJg==';
const databaseId = 'ToDoList';
const containerId = 'Items';

const client = new CosmosClient({endpoint, key});

const querySpec = {
  query: 'SELECT * from c',
};

var loading = true;

const App: () => React$Node = () => {
  const [todos, setTodos] = useState();
  useEffect(() => {
    client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll()
      .then((response) => {
        setTodos(response.resources);
      });
  });
  if (!todos) {
    return (
      <View style={styles.container}>
        <Text>Loading Todos...</Text>
      </View>
    );
  }
  console.log(todos);
  return (
    <View style={styles.container}>
      {todos.map((todo) => {
        return <Text>{todo.name}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

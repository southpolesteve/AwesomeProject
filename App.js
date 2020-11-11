/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  useState, useEffect
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = 'https://amos-cosmosdb.documents.azure.com:443/'
const key = 'k8rrY0TEv8XvllYkJ4PlhSanMkTa9eAQxJjt146Ad5z9RbzDLfjlw8QSVVNUDuqZGniBPmYxIMBYhhSE3h8gJg=='
const databaseId = 'ToDoList'
const containerId = 'Items'

const client = new CosmosClient({ endpoint, key })

const querySpec = {
  query: 'SELECT * from c'
};

var loading = true

const App: () => React$Node = () => {
  var results = client.database(databaseId).container(containerId).items.query(querySpec);
  var resultsString = JSON.stringify(results)
  return (
    <View style={styles.container}>
      <Text>{resultsString}</Text>
    </View>
  )
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

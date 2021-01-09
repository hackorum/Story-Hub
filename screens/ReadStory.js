import React from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import database from '../config';
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class ReadStory extends React.Component {
  state = {
    search: '',
    allStories: [],
    loading: false,
    filteredData: ''
  }
  updateSearch = (search) => {
    this.setState({ search });
  }
  retrieveStories = async () => {
    let allStories = [];
    this.setState({
      loading: true
    });
    await database.collection('stories')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const stories = doc.data();
          allStories.push(stories);
          this.setState({
            loading: false
          });
        });
      });
    this.setState({
      allStories: allStories
    });
    if (this.state.allStories.length === 0) {
      Alert.alert("No Stories Available!", "You Can Write Your Own Stories Too.");
      this.setState({
        loading: false
      });
    }
  }
  searchFilterFunction = text => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      search: text,
      filteredData: newData
    });
  }
  componentDidMount() {
    this.retrieveStories();
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Here..."
          onChangeText={this.updateSearch}
          onChangeText={text => this.searchFilterFunction(text)}
          onClear={text => this.searchFilterFunction('')}
          value={search}
          lightTheme
          round
        />
        <Button title="Refresh Stories" onPress={this.retrieveStories} />
        {this.state.loading ? <ActivityIndicator size="large" color="#abcdff" style={styles.loading} /> :
          this.state.search === '' ?
            <FlatList
              data={this.state.allStories}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemSeparator}>
                  <Text>Story: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.title}
            /> : <FlatList
              data={this.state.filteredData}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemSeparator}>
                  <Text>Story: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.title}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  loading: {
    paddingTop: '50%'
  },
  itemSeparator: {
    borderWidth: 0.3,
    borderRadius: 3,
    borderColor: '#aaa',
    margin: 15,
    paddingLeft: 7,
    paddingVertical: 10
  },
  author: {
    fontSize: 10
  }
});
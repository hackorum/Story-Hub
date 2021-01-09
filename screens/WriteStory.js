import React from 'react';
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, ToastAndroid, StyleSheet } from 'react-native';
import database from '../config';

export default class WriteStory extends React.Component {
  state = {
    title: '',
    author: '',
    story: ''
  };
  submitStory = () => {
    database
      .collection('stories')
      .add({
        title: this.state.title,
        author: this.state.author,
        story: this.state.story
      });
    this.setState({
      title: '',
      author: '',
      story: ''
    });
    ToastAndroid.show("Story Submitted Successfully!", ToastAndroid.SHORT);
    Keyboard.dismiss();
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>Story Hub</Text>
        <TextInput
          style={styles.titleInput}
          placeholder='Enter your story title'
          value={this.state.title}
          onChangeText={(text) => {
            this.setState({
              title: text
            });
          }}
        />
        <TextInput
          style={styles.authorInput}
          placeholder='Enter the author name'
          value={this.state.author}
          onChangeText={(text) => {
            this.setState({
              author: text
            });
          }}
        />
        <TextInput
          style={styles.storyInput}
          placeholder='Write your story here'
          multiline
          value={this.state.story}
          onChangeText={(text) => {
            this.setState({
              story: text
            });
          }}
        />
        <TouchableOpacity style={styles.submitButton} onPress={this.submitStory} >
          <Text>Submit Story</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: 10
  },
  title: {
    fontSize: 29,
    alignSelf: 'center'
  },
  titleInput: {
    height: 50,
    borderWidth: 1.2,
    borderRadius: 6
  },
  authorInput: {
    height: 50,
    borderWidth: 1.2,
    borderRadius: 6
  },
  storyInput: {
    height: 340,
    borderWidth: 1.2,
    borderRadius: 6
  },
  submitButton: {
    backgroundColor: '#2089dc',
    paddingVertical: 12,
    marginHorizontal: 130,
    alignItems: 'center'
  }
});

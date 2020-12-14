import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      requestedBooksList: [],
    };
    this.requestRef = null;
  }

  getRequestedBookslist = () => {
    this.requestRef = db
      .collection('requested_books')
      .onSnapshot((snapshot) => {
        var requestedBooksList = snapshot.docs.map((document) =>
          document.data()
        );
        this.setState({
          requestedBooksList: requestedBooksList,
        });
      });
  };
  componentDidMount() {
    this.getRequestedBookslist();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitle={item.reason_to_request}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('RecieverDetails', {
                details: item,
              });
            }}
          >
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      ></ListItem>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Donate Books" />
        <View style={{ flex: 1 }}>
          {this.state.requestedBooksList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>
                List Of all Requested Books -
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBooksList}
              renderItem={this.renderItem}
            ></FlatList>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
  },
});

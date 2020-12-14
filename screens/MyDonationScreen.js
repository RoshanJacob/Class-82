import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { Card, Icon, ListItem } from 'react-native-elements';

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allDonations: [],
    };
    this.requestRef = null;
  }
  getAllDonations = () => {
    this.requestRef = db
      .collection('all_donations')
      .where('donor_id', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allDonations = snapshot.docs.map((document) => document.data());
        this.setState({
          allDonations: allDonations,
        });
      });
  };
  componentDidMount() {
    this.getAllDonations();
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    <ListItem
      key={i}
      title={item.book_name}
      subtitle={
        'Requested By:' + item.requested_by + '\nstatus:' + item.request_status
      }
      leftElement={
        <Icon name="book" type="font-awesome" color="#696969"></Icon>
      }
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity style={styles.button}>
          <Text>Send Book</Text>
        </TouchableOpacity>
      }
      bottomDivider
    ></ListItem>;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Donations" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitles}>
              <Text style={{ fontSize: 20 }}>List of All Donations - </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

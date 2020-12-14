import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';

const MyHeader = (props) => {
  return (
    <Header
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="#ffff"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        ></Icon>
      }
      centerComponent={{
        text: props.title,
        style: {
          color: /*'#90a5a9'*/ '#ffff',
          fontSize: 20,
          fontWeight: 'bold',
        },
      }}
      background="#eaf8fe"
    />
  );
};
export default MyHeader;


import React, { Component } from 'react';
import { StyleSheet,  Text,  View, TouchableOpacity, Dimensions, Alert } from 'react-native';
const {height, width} = Dimensions.get('window')
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

export default class App extends Component{
  // add this function
  onLoginFB() {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        console.log("Login data: ", data);
      } else {
        console.log("Error: ", error);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLoginFB}> 
          <Text>
            Login Facebook
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

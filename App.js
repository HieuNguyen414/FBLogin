
import React, { Component } from 'react';
import { StyleSheet,  Text,  View, TouchableOpacity, Dimensions, Alert } from 'react-native';
const {height, width} = Dimensions.get('window')
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this._setupGoogleSignin();
  }
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '392989729562-eoa8bj05ehunq84k817honi2m935a3t9.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }
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

        <TouchableOpacity style = {{marginTop:20}} onPress={this._signIn}> 
          <Text>
            Login Google
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

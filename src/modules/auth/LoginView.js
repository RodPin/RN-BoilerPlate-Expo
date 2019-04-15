import React from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";
import { Button, Text, Toast } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import * as colors from "@src/utils/colors";
import { Loading } from "@src/components/Loading";
import * as AuthStateActions from "@src/localRedux/AuthReducer";

const inputs = {
  height: 50,
  width: 300,
  borderWidth: 1,
  borderColor: "grey",
  textAlign: "left",
  marginTop: 5
};

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    // this.handleTextChange = this.handleTextChange.bind(this);
    this.state = { username: "", password: "", showToast: false };
  }

  static navigationOptions = {
    title: "Login",
    headerTitleStyle: { color: "white" },
    headerStyle: {
      backgroundColor: colors.darkBlue
      // elevation: 0 // disable header elevation when TabNavigator visible
    }
  };

  static propTypes = {
    isLoggedIn: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.string
  };

  buttonOrLoading() {
    const { username, password } = this.state;
    if (this.props.loading) {
      return <Loading />;
    } else {
      return (
        <Button
          large
          blue
          center
          rounded
          onPress={() => {
            this.props.authStateActions.submitLoginWithAwsCognito({
              email: username,
              password: password
            });
          }}
          style={{
            backgroundColor: "#005074",
            borderWidth: 1,
            borderColor: "white"
          }}
        >
          <Text style={{ color: "white", marginHorizontal: 50, fontSize: 20 }}>
            Login
          </Text>
        </Button>
      );
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#387CA3" }}
      >
        <View>
          <TextInput
            value={username}
            placeholder="Email"
            onChangeText={text => this.setState({ username: text })}
            style={inputs}
            // backgroundColor="white"
          />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry
            style={inputs}
            // backgroundColor="white"
          />
        </View>

        <View>
          <Text
            style={{
              marginLeft: 200,
              marginTop: 6,
              color: "white"
            }}
          >
            Forgot password
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>{this.buttonOrLoading()}</View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "red", fontSize: 23 }}>{this.props.error}</Text>
        </View>
        <Text style={{ textAlign: "center", marginTop: 15, color: "white" }}>
          or login with
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 25
          }}
        >
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={() => console.log(this.props)}
          />
          <View style={{ marginLeft: 30 }}>
            <Icon.Button name="google" backgroundColor="#dc4e41" />
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Text>Don't have an account?</Text>
          <Text style={{ color: "white" }}> {"  "}Sign Up</Text>
        </View>
      </View>
    );
  }
}
// export default LoginView;
// const mapStateToProps = state => {
//   console.log(state);
//   return { oixau: state.reducer1State.a };
// };

// const mapDispatchToProps = dispatch => {
//   return { o: bindActionCreators(functions, dispatch) };
// };

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    isLoggedIn: auth.isLoggedIn
  };
};

function mapDispatchToProps(dispatch) {
  return { authStateActions: bindActionCreators(AuthStateActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);

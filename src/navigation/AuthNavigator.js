import { createStackNavigator } from "react-navigation";

import LoginView from "@src/modules/auth/LoginView";

export default createStackNavigator({
  Login: { screen: LoginView }
});

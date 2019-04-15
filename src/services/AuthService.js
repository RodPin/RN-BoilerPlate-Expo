import Amplify, { Auth } from "aws-amplify";
import AmplifyServiceConfig from "./AmplifyServiceConfig";

class AmplifyService {
  constructor() {
    Amplify.configure(AmplifyServiceConfig);
  }

  /**
   * AWS Cognito Sign In
   *
   * username   string (required)
   * password   string (required)
   *
   * Exceptions:
   * - UserNotFoundException
   * - UserNotConfirmedException
   */
  signIn = (username, password) => {
    return new Promise((resolve, reject) => {
      Auth.signIn({
        username: username,
        password: password
      })
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito Sign Up
   *
   * username   string (required)
   * password   string (required)
   * name       string (required)
   *
   * Exceptions:
   * - InvalidPasswordException
   * - InvalidParameterException
   * - UsernameExistsException
   */
  signUp = (username, password, name, locale) => {
    return new Promise((resolve, reject) => {
      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          name: name,
          locale: locale
        }
      })
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito Sign Out
   *
   * Exceptions:
   * -
   */
  signOut = () => {
    return new Promise((resolve, reject) => {
      Auth.signOut()
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito Forgot Password
   *
   * username   string (required)
   *
   * Exceptions:
   * - UserNotFoundException
   */
  forgotPassword = username => {
    return new Promise((resolve, reject) => {
      Auth.forgotPassword(username)
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito Forgot Password Submit
   *
   * username       string (required)
   * code           number (required)
   * new_password   string (required)
   *
   * Exceptions:
   * - CodeMismatchException
   */
  newPasswordSubmit = (username, code, password) => {
    return new Promise((resolve, reject) => {
      Auth.forgotPasswordSubmit(username, code, password)
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito Check if user is authenticated
   *
   * Exceptions:
   * -
   */
  isAuthenticatedUser = () => {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  /**
   * AWS Cognito get user attributes
   *
   * user       object CognitoUser
   *
   * Exceptions:
   * -
   */
  getUserAttributes = user => {
    return new Promise((resolve, reject) => {
      Auth.userAttributes(user)
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };
}

const instance = new AmplifyService();

export default instance;

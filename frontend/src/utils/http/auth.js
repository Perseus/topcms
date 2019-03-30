import HTTP from './http';
const _ = require('lodash');

export async function loginUser( { username, password } ) {

  let loginCall = await HTTP.postData('api/auth/login', { username, password } );
  let data = {
    errors: null,
    token: (loginCall.access_token ? loginCall.access_token : '' ),
  };

  if ( _.keys(loginCall.errors).length > 0 ) {
    data.errors = loginCall.errors
  } else if (loginCall.error === 'Unauthorized') {
    data.errors = {
      'credentials': [ 'Please enter a valid username and password' ]
    };
  }
  return data;

}

export async function getUserData ( ) {

  let userDataCall = await HTTP.postData('api/auth/me');
  return userDataCall;

}

export async function logoutUser () {

  let logoutCall = await HTTP.postData('api/auth/logout', {});
  return logoutCall;

}

export async function registerUser ( userDetails ) {

  let registrationCall = await HTTP.postData('api/auth/register', userDetails);

  return registrationCall;
}
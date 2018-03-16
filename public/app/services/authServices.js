
let authServices = angular.module('authServices', [])

.factory('Auth', ($http, AuthToken, $q) => {
  var authFactory = {};

  authFactory.login = (loginData) => {
    return $http.post('/api/authenticate', loginData).then((data) => {
      console.log(data);
      AuthToken.setToken(data.data.token);
      return data;
    });
  }
  // Auth.isLoggedIn();
  authFactory.isLoggedIn = () => {
    if (AuthToken.getToken()) { 
      return true;
    }else {
      return false;
    }
    
  };
 // Auth.getUser();
authFactory.getUser = function() {
  if (AuthToken.getToken()) {
    return $http.post('/api/currentUser');
  } else {
    $q.reject( { message: 'User has no token '});
  }
}

  // Auth.logout();
  authFactory.logout = () => {
    AuthToken.setToken();
  };

  return authFactory;

})

.factory('AuthToken', ($window) => {
  var authTokenFactory = {};
  
  authTokenFactory.setToken = (token) => {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    }
  };
  // AuthToken.getToken(token);
  authTokenFactory.getToken = () => {
    return $window.localStorage.getItem('token');
  };

  return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken) {
  var authInterceptorsFactory = {};

  authInterceptorsFactory.request = (config) => {

    var token = AuthToken.getToken();

    if (token) config.headers['x-access-token'] = token;

    return config;
  };

  return authInterceptorsFactory;
});


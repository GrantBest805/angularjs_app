let userServices = angular.module('userServices', []);

userServices.factory('User', function($http) {
  userFactory = {};

  // User.create(regData);
  userFactory.create = (regData) => {
    return $http.post('/api/users', regData);
  }
  return userFactory;
})
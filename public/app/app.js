console.log('App Started');

let userApp = angular.module('userApp', ['appRoutes', 'userController', 'mainController', 'userServices', 'authServices'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptors');
});

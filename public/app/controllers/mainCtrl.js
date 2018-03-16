
angular.module('mainController', ['authServices'])

.controller('mainCtrl', function( Auth, $timeout, $location, $rootScope) {
  var app = this;

  $rootScope.$on('$routeChangeStart', function(){
    if(Auth.isLoggedIn()) {
      console.log('Success User is logged in.');
      Auth.getUser().then(function(data) {
        console.log(data.data.username);
        app.username = data.data.username;
      });
    } else {
      console.log('Fallure: User in NOT logged in.')
      app.username = null;
    }

  });
  
  

  this.login = (loginData) => {
    app.loading = true;
    app.errorMsg = false;

    Auth.login(app.loginData).then((data) => {
      if(data.data.success) {
        app.loading = false;
        // Reset the form model.
        
        app.successMsg = data.data.message + '..Redirecting';

        $timeout(() => {
          $location.path('/about');
          console.log('User is logged in!')
        }, 2000);
      } else {
        app.loading = false;
        app.errorMsg = data.data.message;
      }
    });
  };
  this.logout = () => {
    Auth.logout();
    app.u
    $location.path('/logout');
    $timeout(() => {
      $location.path('/');
      console.log('User is logged out!')
    }, 2000);
  };

});

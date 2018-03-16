let userCtrl = angular.module('userController', ['userServices']);

userCtrl.controller('regCtrl', function($scope, $location, $timeout, User) {

  var app = this;

  this.regUser = (regData) => {
    app.loading = true;
    app.errorMsg = false;

    User.create(app.regData).then((data) => {
      if (data.data.success) {
        app.loading = false;
        app.successMsg = data.data.message;
        // Redirect to home
        $timeout(() => {
          $location.path('/');
        }, 2000);

      } else {
        app.loading = false;
        app.errorMsg = data.data.message;

      }
    });
  }
});
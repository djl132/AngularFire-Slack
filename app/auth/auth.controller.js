/*Controller that deals with authentication(data, methods) using AuthService*/
angular
  .module('angularfireSlackApp')
  .controller('AuthCtrl', ['Auth','$state' , function(Auth, $state){
    var authCtrl = this;

   authCtrl.user = {
      email: '',
      password: ''
    };
  
    authCtrl.login = function (){
        Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth){
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
      };
  
    authCtrl.register = function (){
            console.log(Auth);

        Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user){

          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
      };
  }]);

/*this contorller isn't correctly encapsulated right? I have access to this controller from the global scope right?*/


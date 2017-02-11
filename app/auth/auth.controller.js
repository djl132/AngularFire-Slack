/*Controller that deals with authentication(data, methods) using AuthService*/
angular
  .module('angularfireSlackApp')
  .controller('AuthCtrl', ['Auth','$state', function(Auth, $state){
    var authCtrl = this;

   authCtrl.user = {
      email: '',
      password: ''
    };
  
    authCtrl.login = function (){
        Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth){
                    debugger;
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
          debugger;
        });
      };
  
    authCtrl.register = function (){
        Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user){
          console.log(user.uid);//create user with a reference name of uid, also stored in  its $id property(accessible through orderbyChild)
          debugger;
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
      };
  }]);

/*this contorller isn't correctly encapsulated right? I have access to this controller from the global scope right?*/


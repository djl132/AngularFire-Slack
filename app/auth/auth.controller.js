angular.module('angularfireSlackApp')
  .controller('AuthCtrl', function(Auth, $state){
    var authCtrl = this;
  
  //when does this information clear? because it is a singleton and how exactly does this info have information 
    authCtrl.user = {
      email: '',
      password:''
    };
      authCtrl.login = function (){
        Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth){ //if authorization sucessful, go to home.
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
      };
  
      authCtrl.register = function (){
        Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user){
          $state.go('home');
        }, function (error){
          authCtrl.error = error;
        });
    };
  
      
  });
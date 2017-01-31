angular
  .module('angularFireSlack')
  .factory('Auth', function($firebaseAuth){
    var auth = $firebaseAuth();
    return auth;  
 });
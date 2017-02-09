
/*create authentication service object for authcontroller to use*/
angular
  .module('angularfireSlackApp')
  .factory('Auth', function(firebase){
    var auth = firebase.auth();
    return auth;  
 });
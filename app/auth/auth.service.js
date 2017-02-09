
/*AngularFire service: create authentication service object for authcontroller to use*/
angular
  .module('angularfireSlackApp')
  .factory('Auth',['$firebaseAuth', function($firebaseAuth{
    var auth = $firebaseAuth();
    return auth;
 }]);
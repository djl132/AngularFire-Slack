//Represents Data of Channel
angular
  .module('angularfireSlackApp')
  .factory('Channels', function($firebaseArray){
    var ref = firebase.database().ref('channels');
    var channels = $firebaseArray(ref);
    return channels;
});
































angular.module('angularfireSlackApp')
  .factory('Channels', function($firebaseArray){
    var ref = firebase.database().ref('channels'); //when was this array created?/....
    var channels = $firebaseArray(ref);

    return channels;
  });

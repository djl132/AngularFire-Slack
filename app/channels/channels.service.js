angular.module('angularfireSlackApp')
  .factory('Channels', function($firebaseArray){
    var ref = firebase.database().ref('channels'); //when was this array created?/....
    var channels = $firebaseArray(ref);

    return channels;
  });

//Represents Data of Channel
angular
  .module('angularfireSlackApp')
  .factory('Channels',['$firebaseArray', function($firebaseArray){
    var ref = firebase.database().ref('channels');
    var channels = $firebaseArray(ref);
    return channels;
}]);

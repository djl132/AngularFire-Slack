angular
  .module('angularfireSlackApp')
  .factory('Messages',function($firebaseArray){
    
    var channelMessagesRef = firebase.database().ref('channelMessages');
    
    return {  
      
      //GET A SPECIFIC CHANNEL'S MESSAGES given the channel's id,
        forChannel: function(channelId){
            return $firebaseArray(channelMessagesRef.child(channelId));
        }
    };    
  
});
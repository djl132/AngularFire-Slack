angular
  .module('angularfireSlackApp')
  .factory('Messages',function($firebaseArray){
    //get or create a Firebase reference to the userMessages node
    var channelMessagesRef = firebase.database().ref('channelMessages');
    var userMessagesRef = firebase.database().ref('userMessages');

    return {  
      
      //GET or CREATE A SPECIFIC CHANNEL'S MESSAGES given the channel's id,
        forChannel: function(channelId){
          //creates a messagesObject for that channel using a specific channelId
            return $firebaseArray(channelMessagesRef.child(channelId)); 
        },
      
      //GET or CREATE A SPECIFIC DIRECT MESSAGES given both user's ids,
        forUsers: function(uid, oid){
          
          //CREATE A DEFINITE STORAGE PLACE FOR DMs BETWEEN TWO USERS
            var path = uid < oid ? uid + '/' + oid : oid + '/' + uid;
            return $firebaseArray(userMessagesRef.child(path));
        }
    };    
  
});
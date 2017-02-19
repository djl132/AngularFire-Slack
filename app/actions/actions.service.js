
angular
  .module('angularfireSlackApp')
  .factory('Actions', function($firebaseArray){
  
  var actions = this;

  actions.upvote = function(message){ 
    var channelMessagesRef = firebase.database().ref('channelMessages');
    var messageRef = channelMessagesRef.child(message.channelId +'/' + message.$id);
    var upvoteRef = messageRef.child('upvote');
    console.log(upvoteRef)
    var voter = message.uid;

    var upvote = $firebaseArray(upvoteRef);
    
    upvote.$loaded().then(function(ref){
      ref.$add({voter: voter});
    });
    
    console.log(upvote)
  }

    
//    if(!upvote.$getRecord(voter)){////this needs to check whether or not the uid has already been added.
//      if(message.downvote)
//        message.downvote.$remove({voter :voter});
    
  actions.downvote = function(message){  
    var ref = firebase.database().ref('channelMessages').child(message.channelId +'/'+ message.$id + '/downvote' );
    var downvote = $firebaseArray(ref);
    var voter = message.uid;

    if(downvote.$getRecord() < 0){ ////this needs to check whether or not the uid has already been added.
      if(message.upvote)
        message.upvote.$remove({voter :voter});
        downvote.$add({voter :voter});
    }
  };
  
 
    return actions
  
  
});
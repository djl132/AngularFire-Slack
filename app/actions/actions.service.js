
angular
  .module('angularfireSlackApp')
  .factory('Actions', function($firebaseArray){
  var channelMessagesRef = firebase.database().ref('channelMessages');

  var actions = this;

  actions.upvote = function(message, uid){ 
  
    //store the value of the upvote object
    var upvoteRef = channelMessagesRef.child(message.channelId +'/' + message.$id + '/upvote');
    var downvoteRef = channelMessagesRef.child(message.channelId +'/' + message.$id + '/downvote');
    
    //get the value of the upvoteref in a firebase array in order to add stuff to the  upvoteRef object
    var upvote = $firebaseArray(upvoteRef);
    var downvote = $firebaseArray(downvoteRef);
    
//    var upvoted = downvoteRef.child('voter').equalTo(uid).$loaded();
//    debugger;
//    var downvoted = upvoteRef.child('voter').equalTo(uid).$loaded();
//    debugger;

    //get promised firebasearray and add to it if user has not upvoted on it yet.
//    if(!upvoted){
        upvote.$loaded().then(function(ref){
          ref.$add({voter: uid}).then(function(vote){
//            if(downvoted){
              downvote.$remove({voter: uid});
//            }
          });
        });
//      }
  };
    
  
  actions.downvote = function(message, uid){ 
    var downvoteRef = channelMessagesRef.child(message.channelId +'/' + message.$id + '/downvote');
    
    var downvote = $firebaseArray(downvoteRef);
    var downvoted = 

    downvote.$loaded().then(function(ref){
      ref.$add({voter: uid}).then(function(vote){
//        ref.$save(vote);
      });
    });
    
  };
  
  
    return actions;
});


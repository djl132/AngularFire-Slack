//messages controller needs
angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', function($scope, Actions, $firebaseObject, messages, channelName, profile, channelId){
  
  var messagesCtrl = this;
  messagesCtrl.actions = Actions;
  messagesCtrl.messages = messages;
  messagesCtrl.channelName = channelName;
  debugger;
    
//real time binding a value to the message 
  $scope.favoringVotes = function(msg) {
     var upvote = 0;
     var downvote = 0;
     if (typeof msg.upvote === "undefined") { upvote = 0; }
     else {
         upvote = Object.keys(msg.upvote).length;
     }
     if (typeof msg.downvote === "undefined") { downvote = 0; }
     else {
         downvote = Object.keys(msg.downvote).length;
     }
   return upvote - downvote///dang this works
};
  
  messagesCtrl.message = '';
  
  messagesCtrl.sendMessage = function(){
   if(messagesCtrl.message.length > 0){
    messages.$add({
      uid: profile.$id,
      body: messagesCtrl.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      channelId: channelId,
      votes: 0 
      }).then(function(){
      messagesCtrl.message = ''; // clear message
    });
    }
  };
  
  
});
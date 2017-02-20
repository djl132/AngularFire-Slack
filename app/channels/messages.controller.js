//messages controller needs
angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', function($scope, Actions, $firebaseObject, messages, channelName, profile, channelId){
  
  var messagesCtrl = this;
  messagesCtrl.actions = Actions;
  messagesCtrl.messages = messages;
  messagesCtrl.channelName = channelName;
  debugger;
    
  $scope.favoringVotes = function(msgs) {
    return (Object.keys(msgs.upvote).length) - (Object.keys(msgs.downvote).length); ///dang this works
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
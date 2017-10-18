

function MessagesCtrl($scope, Actions, $firebaseObject, messages, channelName, profile) {
  var messagesCtrl = this;
  messagesCtrl.actions = Actions;
  messagesCtrl.messages = messages;
  messagesCtrl.channelName = channelName;
  debugger;

//real time binding a value to the message
///dang this works!!!
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
   return upvote - downvote;
};

  messagesCtrl.message = '';

  messagesCtrl.sendMessage = function(){
    debugger;
   if(messagesCtrl.message.length > 0){
    messages.$add({
      uid: profile.$id,
      body: messagesCtrl.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      votes: 0
      }).then(function(){
      messagesCtrl.message = ''; // clear message
    });
    }
  };

  return messagesCtrl;
}

//messages controller needs
angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', ['$scope', 'Actions', '$firebaseObject', 'messages', 'channelName', 'profile', MessagesCtrl]);

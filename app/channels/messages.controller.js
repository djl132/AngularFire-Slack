//messages controller needs
angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', function($firebaseObject, messages, channelName, profile){
  
  var messagesCtrl = this;
  
  messagesCtrl.messages = messages;
  messagesCtrl.channelName = channelName;
  console.log(channelName)
  
  messagesCtrl.message = '';
  
  messagesCtrl.sendMessage = function(){
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
  
  messagesCtrl.upvote = function(message){
    message.votes++;
    messages.$save(message);
  }
  
});
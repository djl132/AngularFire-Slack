//messages controller needs
angular
  .module('angularfireSlackApp')
  .controller('MessagesCtrl', function(messages, channelName, profile){
  
  var messagesCtrl = this;
  
  messagesCtrl.messages = messages;
  messagesCtrl.channelName = channelName;
  
  messagesCtrl.message = '';
  
  messagesCtrl.sendMessage = function(){
    if(messagesCtrl.message.length > 0){
    messages.$add({
      uid: profile.$id,
      body: messagesCtrl.message,
      timestamp: firebase.database.serverValue.TIMESTAMP
    }).then(function(){
      messagesCtrl.message = ''; // clear message
    });
    }
  };
  
})
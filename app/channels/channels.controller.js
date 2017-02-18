(function(){
  
  function ChannelsCtrl(Auth, Users, $state, profile, channels){
    var channelsCtrl = this;
    channelsCtrl.channels = channels;
    channelsCtrl.profile = profile;
    channelsCtrl.getGravatar = Users.getGravatar;
    channelsCtrl.users = Users.all;
    Users.setOnline(profile.$id); //how can you be so sure that profile

    //New Channels Holder
    channelsCtrl.newChannel = {
      name: ''
    };
  
    channelsCtrl.createChannel = function(){
      //creates a $id for channel
      //@{urlParam of state}: tells View of channels.messages channelId of the current channel in order to display channelName and channelMessages.
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref){
          channelsCtrl.newChannel = {
            name: ''
          };
        $state.go('channels.messages',{channelId: ref.key}); 
        });
    }
    
    channelsCtrl.logout = function(){
      channelsCtrl.profile.online = null; //what is this line for? shouldn't onDisconnect already rmeove this?
      channelsCtrl.profile.$save().then(function(){
      Auth.$signOut().then(function(){
        $state.go('home');
      });
      });
    };
    
    return channelsCtrl;
  }
  
  angular
    .module("angularfireSlackApp")
    .controller('ChannelsCtrl', ChannelsCtrl);
})();
//why don't we have to import Channels dependency?, is it because resolve function channels already does?
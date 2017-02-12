(function(){
  
  function ChannelsCtrl(channels, profile, Users, Auth, $state){
    var channelsCtrl = this;
    channelsCtrl.channels = channels;
    console.log(channels);
    channelsCtrl.profile = profile;
    channelsCtrl.getGravatar = Users.getGravatar;

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
        $state.go('channels.messages',{channelId: ref.key()}); 
        });
    }
    
    channelsCtrl.logout = function(){
      Auth.$signOut().then(function(){
        $state.go('home');
      });
    };
    
    
    return channelsCtrl;
  }
  
  angular
    .module("angularfireSlackApp")
    .controller('ChannelsCtrl', ['Auth', 'Users', '$state', ChannelsCtrl]);
})();
//why don't we have to import Channels dependency?, is it because resolve function channels already does?
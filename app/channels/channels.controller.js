(function(){
  
  function ChannelCtrl(channels,profile,Auth, Users, $state){
    var channelsCtrl = this;
    channelsCtrl.channels = channels;
    channelsCtrl.profile = profile;
    channelsCtrl.getGravatar = Users.getGravatar;
    
    //New Channels Holder
    channelsCtrl.newChannel = {
      name: ''
    };
    
    channelsCtrl.createChannel = function(){
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
          channelsCtrl.newChannel = {
            name: ''
          };
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
    .controller('ChannelsCtrl', ['Auth', 'Users', '$state', ChannelCtrl]);
})
//why don't we have to import Channels dependency?, is it because resolve function channels already does?
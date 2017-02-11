
angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', ['Users','Auth','$state', function($state, Auth, Users, profile, channels){
    var channelsCtrl = this;
    
    channelsCtrl.newChannel = {
      name: ''
    };
    channelsCtrl.channels = channels;
    channelsCtrl.profile = profile;
    channelsCtrl.getGravatar = Users.getGravatar;
    channelsCtrl.getDisplayName = Users.getDisplayName;
    
    channelsCtrl.logout = function(){
      Auth.$signOut().then(function(){
        $state.go('home');
      });
    };
      channelsCtrl.createChannel = function(){
        channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
          channelsCtrl.newChannel = {
            name: ''
          };
        });
      };

  }]);


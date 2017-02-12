(function(){

  function ProfileCtrl($state, md5, auth, profile){
    
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    
    profileCtrl.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
debugger;
       profileCtrl.profile.$save().then(function(){
        $state.go('channels');
        });
    }
    
    return profileCtrl;
  }
  
  angular
    .module('angularfireSlackApp')
    .controller('ProfileCtrl', ProfileCtrl);
})();


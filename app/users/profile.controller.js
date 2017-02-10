(function(){

  function ProfileCtrl(auth, profile, md5){
    
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    
    profile.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
      profileCtrl.profile.$save(); //update firebase about new email 
    }
    
    return profileCtrl;
  }
  
  angular
    .module('angularfireSlackApp')
    .controller('ProfileCtrl', ['md5', ProfileCtrl]);
})();
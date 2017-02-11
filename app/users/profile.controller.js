(function(){

  function ProfileCtrl($state, md5, auth, profile){
    
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    
    profile.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
      profileCtrl.profile.$save(); //update firebase about new email and store it as an object {uid: profile object(keys: displayname, emailhash)} 
    }
    
    return profileCtrl;
  }
  
  angular
    .module('angularfireSlackApp')
    .controller('ProfileCtrl', ProfileCtrl);
})();


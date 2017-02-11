(function(){

  function ProfileCtrl($state, md5, auth, profile){
    
    var profileCtrl = this;
    
    profileCtrl.profile = profile;
    
    profileCtrl.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
debugger;
      profileCtrl.profile.$save(); //update firebase about new email and store it as an object {uid: profile object(keys: displayname, emailhash)} 
    }
    
    return profileCtrl;
  }
  
  angular
    .module('angularfireSlackApp')
    .controller('ProfileCtrl', ProfileCtrl);
})();


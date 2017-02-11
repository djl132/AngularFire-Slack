//provides all user-related operations that create values 
//that the MVC of a profile needs
(function (){
  function UserFactory($firebaseArray, $firebaseObject){
    //get ref to users query object --> get child objects --> in order to use $loaded --> resolve method
    //get users array ---> get/manipulate data(child in)
      var usersRef  = firebase.database().ref().child('users');
      var users = $firebaseArray(usersRef);
    
    
    var Users = {
      
      //get user object of a user(with a specific uid)
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid)); //to load it into profile
      },
      
      //get display name of a user(with a specific uid($key of array object))
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      
      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      
      all:users
      
    }
    
    return Users;
  }
  
  
  
  
  angular
  .module('angularfireSlackApp')
  .factory('Users', ['$firebaseArray', '$firebaseObject', UserFactory])
})();




//SERVICE THAT GETS AND SETS USER INFORMATION(CONNECTION, GRAVATAR, DISPLAYNAME, ALL USER PROFILES)
(function (){
  function UserFactory($firebaseArray, $firebaseObject){
    //get ref to users query object --> get child objects --> in order to use $loaded --> resolve method
    //get users array ---> get/manipulate data(child in)
      var usersRef  = firebase.database().ref().child('users'); //shouldn't this be ref('users')? or is it the same thing?
      var users = $firebaseArray(usersRef);

    var connectedRef = firebase.database().ref('.info/connected') //firebase's data that stores client connection information



    var Users = {
      all:  users,
      //get user object of a user(with a specific uid)
      getProfile: function(uid){
        var test = $firebaseObject(usersRef.child(uid));
        return $firebaseObject(usersRef.child(uid)); //to load it into profile
      },

      //get display name of a user(with a specific uid($key of array object))
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },

      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },

      setOnline: function(uid){
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid+'/online')); //adds a key

        //whenver connection status chnages, update the profile's connection array about it
        connected.$watch(function(){
          if (connected.$value == true)
            online.$add(true).then(function(connectedRef){ ///what exactly is connectedRef?
              connectedRef.onDisconnect().remove();
            });
        });
      }

    }



    return Users;


  }




  angular
  .module('angularfireSlackApp')
  .factory('Users', ['$firebaseArray', '$firebaseObject', UserFactory])
})();

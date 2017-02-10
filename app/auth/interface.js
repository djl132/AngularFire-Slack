///*an abstract interface providing every component a firebase method*/
//(function(){
//  
//  function interfaceFactory($firebaseAuth){
//    var interface = this;
//    
////    provides firebase's authorization service object 
//    interface.$firebaseAuth = function(){
//      return $firebaseAuth();
//    }
//      
//    
//    return interface;
//    
//    
//  }
//  
//  
//  
//  
//  angular
//    .module('angularfireSlackApp')
//    .factory('interface', ['$firebaseAuth',interfaceFactory])
//    
//})();
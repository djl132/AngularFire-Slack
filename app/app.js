'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home',{
          url:'/',
          templateUrl:'home/home.html',
      resolve: {
        requireNoAuth: function($state, Auth){
          return Auth.$requireSignIn().then(function(auth){
            $state.go('channels');
          }, function(error){
            return;
          });
          }
      }
    })
        .state('login', {
          url: '/login',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/login.html',
          resolve: {
              requireNoAuth: function($state, Auth){
                debugger;
                return Auth.$requireSignIn().then(function(auth){ /*IF ALREADY SIGNED IN, PREVENT FROM GOING TO THE LOGIN PAGE OR STATE*/
                  $state.go('home'); //why not just go directly to channels?
                }, function(error){
                  return;
                });
              }
            }
          })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          /*IF ALREADY SIGNED IN, PREVENT FROM GOING TO THE REGISTER PAGE OR STATE*/
            requireNoAuth: function($state, Auth){
                return Auth.$requireSignIn().then(function(auth){ 
                $state.go('home');
              }, function(error){
                return;
              });
            }
          }
      })
      .state('profile',{
        url:'/profile',
        controller: "ProfileCtrl as profileCtrl",
        templateUrl: 'users/profile.html',
      
      //why is it that if I change my displayName and update the profile and I'm already logged inc, it would shoot me back to home and 
        resolve: {
          //view profile only if authenticated
          //if authenticated, get auth (email, password, uid) info which contains email
          auth: function(Auth, $state){
            return Auth.$requireSignIn().catch(function(auth){
              $state.go('home');
            })
          }, 
          //profile info
          profile: function(Users, Auth){
              return Auth.$requireSignIn().then(function(auth){
                return Users.getProfile(auth.uid).$loaded();
              });
          }
        }
    })
    .state('channels', {
      url: '/channels',
      controller: 'ChannelsCtrl as channelsCtrl',
      templateUrl:'/channels/index.html',
      resolve:{
        channels: function(Channels){
          return Channels.$loaded(); //WHY USE LOADED?(firebaseArray) why not just retreive the channel firebaseArray immediateley?
        },
        profile: function(Auth, Users, $state){
          //check if profile has a displayName -> set if none., return is there is
           return Auth.$requireSignIn().then(function(auth){
            return Users.getProfile(auth.uid).$loaded().then(function(profile){
              if(profile.displayName)
                  return profile
              else
                  $state.go('profile');
            });
            
          }, function(error){
            $state.go('home');
          });
        }
      }
    })
    .state('channels.create', {
      url: '/create',
      templateUrl: '/channels/create.html',
      controller: 'ChannelsCtrl as channelsCtrl'
    })
    .state('channels.messages',{
      url: '/{channelId}/messages', //pass currexntChannelId to the channels.messages state so that it can access the channelMessages object of that channel.
      templateUrl: 'channels/messages.html',
      controller:'MessagesCtrl as messagesCtrl',
      resolve:{
        //get messages in the current channel using channelId
        messages: function($stateParams, Messages){    
          //get database messages realtime
          return Messages.forChannel($stateParams.channelId).$loaded(); 
        }, 
        //get channelName of the current channel using channelId 
        //WHEN WAS THIS CHANNEL ID CREATED? UNLESS ITS SPECIFIED IN RULES.
        channelName: function($stateParams, channels){
          return '#' + channels.$getRecord($stateParams.channelId).name;
        }
      }
    })
    //is this run every time I send a messages and after it so that it updates the new DMs to the UI
    .state('channels.direct',{
      url:'/{oid}/messages/direct',
      templateUrl: '/channels/messages.html',
      controller: 'MessagesCtrl as messagesCtrl',
      resolve:{
        messages: 
        function($stateParams, Messages, profile){
          return Messages.forUsers($stateParams.oid, profile.$id).$loaded(); //what is this line for?
        },
        channelName: function($stateParams, Users){
          
          //make sure that all users are at realtime-state before you start getting any user's names
           return Users.all.$loaded().then(function(){ //what exactly does this line do????????
            return "@" + Users.getDisplayName($stateParams.oid);
        });
      }
    }
    });
                                      
    $urlRouterProvider
      .otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/');

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
          templateUrl:'home/home.html'
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
      
      //why is it that if I change my displayName and update the profile and I'm already logged in, it would shoot me back to home and 
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
                Users.getProfile(auth.id).$loaded();
              });
          }
        }
    });
                                      
    $urlRouterProvider
      .otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/');

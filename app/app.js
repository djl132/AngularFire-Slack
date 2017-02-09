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
    
        .state('login', 
          {
          url: '/login',
          controller: 'AuthCtrl as authCtrl',
          templateUrl: 'auth/login.html',
          resolve: {
              requireNoAuth: function($state, Auth){
                return Auth.$requireSignIn().then(function(auth){ /*IF ALREADY SIGNED IN, PREVENT FROM GOING TO THE LOGIN PAGE OR STATE*/
                  $state.go('home');
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
      });
  
    $urlRouterProvider
      .otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/');

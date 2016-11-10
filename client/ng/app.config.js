// jshint esversion: 6
import app from './app.module';

function config($mdIconProvider, $mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
     .primaryPalette('blue')
     .accentPalette('red');
}

app.config(config);

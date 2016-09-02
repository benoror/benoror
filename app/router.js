import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pgp');
  this.route('cv');
  this.route('resume');
});

export default Router;

import Ember from 'ember';

export default Ember.Controller.extend({

  init: function() {
    this.set('collapsed', true);
  },

  actions: {
    show: function(/*actionParam, evt, cb*/) {
      this.toggleProperty('collapsed');
    }
  }
});

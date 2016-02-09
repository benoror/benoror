import Ember from 'ember';

export default Ember.Route.extend({

  ajax: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      data: this.get('ajax').request('/assets/data.json'),
      emojis: this.get('ajax').request('/assets/emojis.json')
    });
  }
});

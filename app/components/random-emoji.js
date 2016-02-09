import Ember from 'ember';

export default Ember.Component.extend({
  emojis: [],

  randomEmoji: Ember.computed('emojis', function() {
    var emojis = this.get('emojis');

    return emojis[Math.floor(Math.random() * emojis.length)];
  })
});

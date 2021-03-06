/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    dur: {type: 'number', default: 300},
    action: {type: 'string'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        // read #pic_num
        if (data.action == "forward") {
          var pic_num = (parseInt(document.querySelector('#pic_num').value) + 1) % 10          
        } else if (data.action == "back") {
          var pic_num = (parseInt(document.querySelector('#pic_num').value) - 1) % 10
          if (pic_num < 0) {
            pic_num = 9
          }
        } else if (data.action == "home") {
          var pic_num = 0
        }
        var phi = parseInt(document.querySelector('#pic' + pic_num + "_phi").value)
        data.target.setAttribute('material', 'src', '#pic' + pic_num);
        data.target.setAttribute('phi-start', phi)
        // set new #pic_num
        document.querySelector('#pic_num').value = pic_num
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});
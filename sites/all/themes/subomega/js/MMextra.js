/**
 * @file MMextra.js
 * 
 * Provides my javascript for the front page for switching between map view and list view
 */
(function ($) {
  Drupal.behaviors.MMextra = { 
    attach: function(context,settings) {
      $("h1#page-title").hide();
      //$("h1#page-title").appendTo($("#section-header"));
      $('#block-fboauth-login').append('<div id="fboauth-description" class="description">This is only used to authorize you on Groutshout.</p>');
      $('#block-fboauth-login').after('<p id="login-or">-or-</p>');
      
    }
  };
}) (jQuery);

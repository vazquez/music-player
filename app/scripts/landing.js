jQuery(document).ready(function($) {
  $('.hero-content h3').click(function(){
    var subtext = $(this).text();
    $(this).text(subtext + "!");
  });

  // Creating variables for animation
  var hoverOn = function(){
    $(this).stop().animate({'margin-top': '-10px'});
  };
  var hoverOff = function(){
    $(this).stop().animate({'margin-top': '0px'});
  };

  // Hover function
  $('.selling-points .point').hover(hoverOn, hoverOff);

});

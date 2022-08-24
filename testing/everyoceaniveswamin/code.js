  $("#ocean .g").hover(function () {

    $(this).css("color", "rgba(0,0,0,0.8)");

  });


  // scroll to overwrite
  jQuery.fn.scrollTo = function (elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  // scroll window
  document.body.onkeyup = function (e) {
    var code = e.keyCode;
    let walk = 10; // walk distance in pixels
    let c = $("#ocean");
    let top = c.scrollTop();
    let left = c.scrollLeft();

    if (code === 38 || code == 87) { // up/w
      c.scrollTop(top - walk);
      //      window.scrollTo($container.scrollLeft,
      //        $container.scrollTop + 50);
    }
    if (code === 37 || code == 65) { // left/a
      c.scrollLeft(left - walk);
      //      window.scrollTo($container.scrollLeft + 50,
      //        $container.scrollTop);
    }
    if (code === 39 || code == 83) { // right/d
      c.scrollTop(top + walk);
    }
    if (code === 40 || code == 68) { // down/s
      c.scrollLeft(left + walk);
    }
  };

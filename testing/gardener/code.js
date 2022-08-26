  $("#ocean .g").hover(function () {

    $(this).css("color", "rgba(0,0,0,0.8)");

  });

  const g = {
    WORLD: "#h"

  }


  // generative divs
  const game = {

    // create a x b grid
    generateMap: function (a, b) {

      for (let z = 0; z < b; z++) {
        // all in one row
        for (let i = 0; i < a; i++) {
          $(g.WORLD).append("<div class='g' x=" + i + " y=" + z + ">~</div>");
        }
        $(g.WORLD).append("<!-- ROW -->");
      }
    },

    highlightMap: function (x, y) {
      $(g.WORLD + " .g[x=" + x + "]" + "[y=" + y + "]").attr("highlight", "yes");
    }

  }


  $(document).ready(function () {
    console.log("ready!");

    game.generateMap(10, 10);
    game.highlightMap(0, 7);



    $d = $("#h");

    //    $('#ocean').animate({
    //      scrollTop: $d.offset().top + $d.height() / 2,
    //      scrollLeft: $d.offset().left + $d.width() / 2
    //    }, 1000);
    //    $('#ocean').scroll(function () {//      $('.linked').scrollTop($(this).scrollTop());
    //    })

    $("#ocean").scrollTop(800, function () {
      $(this).scrollLeft(800);
    });

    //    $("#ocean").scrollTop(800);
    //    $("#ocean").scrollLeft(500);

  });


  // scroll to overwrite
  jQuery.fn.scrollTo = function (elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  // moveveent
  document.body.onkeyup = function (e) {
    var code = e.keyCode;
    let walk = 50; // walk distance in pixels
    let c = $("#ocean");
    let top = c.scrollTop();
    let left = c.scrollLeft();

    // find x div

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
      c.scrollLeft(left + walk);
    }
    if (code === 40 || code == 68) { // down/s
      c.scrollTop(top + walk);
    }

    //    if ($("#you"), )

  };


  //div collision
  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    if ((y1 + $div1.outerHeight(true)) < y2 ||
      y1 > (y2 + $div2.outerHeight(true)) ||
      (x1 + $div1.outerWidth(true)) < x2 ||
      x1 > (x2 + $div2.outerWidth(true)))
      return false;
    return true;
  }

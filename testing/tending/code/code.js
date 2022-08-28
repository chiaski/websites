// reveal



// generative divs
const game = {

  loop: function () {

    game.update();

    let day = $(".day").text();
    day = parseInt(day);
    let hr = ($(".hour").text()).substring(0, 2);
    hr = parseInt(hr);


    if (hr == "24:00") {
      day += 1;
      $(".day").text(day);
      $(".hour").text("00:00");
      return;
    }

    hr += 1;
    $(".hour").text(hr + ":00");

  },

  update: function () {

    // check the flowers
    $("#h .g[planted='y']").each(function () {

      let stage = parseInt($(this).attr("stage"));
      let timer = parseInt($(this).attr("timer"));

      // ready to grow!
      if (timer == 0) {
        console.log("next stage!", stage);

        // done growing!
        if ((o.flower_growth).length == stage) {
          $(this)
            .text(pick(o.flower))
            .attr("grown", "y")
            .removeAttr("planted")
            .removeAttr("timer")
            .removeAttr("stage");

          return;
        }

        $(this)
          .text(o.flower_growth[stage])
          .attr("title", o.flower_text[stage])
          .attr("stage", stage + 1);

      } else {

        $(this).attr("timer", timer - g.HOUR);
      }

    });

  },

  // create a x b grid
  generateMap: function (a, b) {

    // create map
    for (let z = 0; z < b; z++) {
      for (let i = 0; i < a; i++) {
        $(g.WORLD).append("<div class='g' x=" + i + " y=" + z + " title='x or click to plant' type='soil'></div>");
      }
      $(g.WORLD).append("<!-- ROW -->");
    }

    // delegate events
    $(g.WORLD).on("mouseenter mouseleave", ".g[highlight]", function () {
      //      console.log("!");
      $(this).css("color", "#dd68b0");
    });

    $(g.WORLD).on("click", ".g[type='soil'][highlight]", function () {
      game.plant($(this), "flower", 1000);
    });

    // things

    // set store
    $(".g[x=" + rng(0, 9) + "][y=" + rng(0, 9) + "]").attr("type", "store");
    $(".g[x='2'][y='2']").attr("type", "store");

    game.generateMapItems();


    console.log("!!");
  },

  generateMapItems: function () {

    $("#h > div").each(function () {

      const expr = $(this).attr("type");
      console.log(expr);

      switch (expr) {

        case "store":

          console.log("STORE");
          $(this).text("/\\\n" + "[]\n");
          break;

      }

    });

  },

  highlightMap: function (x, y) {
    $(g.WORLD + " .g[x=" + x + "]" + "[y=" + y + "]").attr("highlight", "y");
  },

  plant: function (ele, what, duration) {

    let what_title = "";
    let what_stage = 0;
    let stages = 0;
    let rand = ""; // result

    $thing = ele;
    console.log("planted");


    // object planted
    switch (what) {
      case "flower":
        stages = o.flower_growth.length;
        rand = pick(o.flower);
        break;
    }

    $thing
      .attr("plant", what)
      .attr("planted", "y")
      .attr("stage", what_stage)
      .attr("timer", o.flower_duration[what_stage])
      .attr("title", o.flower_text[what_stage])
      .text(o.flower_growth[what_stage]);


    //
    //    $thing.attr("planted", "y");
    //
    //
    //    var growth = function () {
    //
    //      what_stage++;
    //
    //      if (what_stage == o.flower_growth.length) {
    //        $thing.text(rand);
    //        return;
    //      }
    //
    //      $thing
    //        .text(o.flower_growth[what_stage])
    //        .attr("title", o.flower_text[what_stage]);
    //
    //      duration += parseInt(o.flower_duration);
    //
    //      setTimeout(growth, duration);
    //    }
    //
    //    setTimeout(growth, duration);

    //    var growth = setInterval(() => {
    //
    //      what_stage++;
    //
    //      // time to wither
    //      if (what_stage == (o.flower_growth).length) {
    //        // check...  
    //        $thing
    //          .text(rand);
    //        clearInterval(growth);
    //        return false;
    //      }
    //
    //      // grows
    //
    //      $thing
    //        .text(o.flower_growth[what_stage])
    //        .attr("title", o.flower_text[what_stage]);
    //
    //      // delay
    //
    //    }, duration)

  }
}


$(document).ready(function () {
  console.log("ready!");

  $(".day").text("1");
  $(".hour").text("00:00");

  game.generateMap(g.GRID_X, g.GRID_Y);
  game.highlightMap(1, 1);

  setInterval(game.loop, g.MS_PER_HOUR);


  // add tooltip
  $(document).tooltip({
    track: true,
    tooltipClass: "tooltip"
  });

  $d = $("#h");



  //    $("#ocean").scrollLeft($("#ocean").offset().left + ($("#ocean").width() / 2));
  //    $("#ocean").scrollTop($("#ocean").offset().top + ($("#ocean").height() / 2));



  $(".g[highlight]").focus();
  //      $(this).scrollLeft(800);
  //    });

  //    $("#ocean").scrollTop(800);
  //    $("#ocean").scrollLeft(500);

});


// scroll to overwrite
jQuery.fn.scrollTo = function (elem) {
  $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
  return this;
};


const map = {

  checkLocation: function (x, y, event) {

    const expr = $(g.WORLD " > .g[x=" + x + "][y=" + y + "]").attr("type");

    // event = optional
    switch (expr) {
      case "soil":

        break;

      case "store":
        console.log("STORE");
        $(this).text("/\\\n" + "[]\n");
        break;
    }


  },

  enterStore: function () {



  }

}



// moveveent
document.body.onkeyup = function (e) {
  var code = e.keyCode;
  let walk = 120; // walk distance in pixels
  let c = $("#ocean");
  let top = c.scrollTop();
  let left = c.scrollLeft();

  let x = parseInt($("#h .g[highlight]").attr("x"));
  let y = parseInt($("#h .g[highlight]").attr("y"));

  //    console.log(x, y);
  // find x div

  if (code !== 38 && code !== 87 && code !== 37 && code !== 65 && code !== 39 && code !== 68 && code !== 40 && code !== 83) {
    return;
  }

  if (code === 38 || code == 87) { // up/w

    if (y - 1 < 0) return;

    $("#h .g[highlight]").removeAttr("highlight");
    c.scrollTop(top - walk);
    game.highlightMap(x, y - 1);
  } else if (code === 37 || code == 65) { // left/a
    if (x - 1 < 0) return;

    $("#h .g[highlight]").removeAttr("highlight");
    c.scrollLeft(left - walk);
    game.highlightMap(x - 1, y);
  } else if (code === 39 || code == 68) { // right/d

    if (g.GRID_X <= x + 1) return;

    $("#h .g[highlight]").removeAttr("highlight");
    c.scrollLeft(left + walk);
    game.highlightMap(x + 1, y);
  } else if (code === 40 || code == 83) { // down/s

    if (g.GRID_Y <= y + 1) return;

    $("#h .g[highlight]").removeAttr("highlight");
    c.scrollTop(top + walk);
    game.highlightMap(x, y + 1);
  }
};

$("body").keyup(function (e) {

  // till
  if (event.which !== 88) { // x
    return;
  }

  console.log("x");

  //  $tile = $("#h .g[x=" + $("#h .g[highlight]").attr("x") + "][y=" + $("#h .g[highlight]").attr("y") + "]");
  let x = $("#h .g[highlight]").attr("x");
  let y = $("#h .g[highlight]").attr("y");
  //  $("#h .g[x=" + $("#h .g[highlight]").attr("x") + "][y=" + $("#h .g[highlight]").attr("y") + "]");
  $tile = $("#h .g[x=" + x + "][y=" + y + "]");

  if ($tile.attr("type") !== "soil") {
    return false;
    // invalid
  }


  $("#h .g[highlight]").text("planting...");

  game.plant($tile, "flower", 1000);
});

//$(".g").click(function () {
//      
//      
//      });

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

console.log("game.js loaded");


// types


var seen = [];



// growth
var o = {

  flower_growth: [".", ",", "⚘", "ꕤ"],
  flower_text: ["germinating", "growing", "shivering", "blooming", "flower"],
  flower_duration: [1000, 5000, 1000, 4000],
  flower: ["❊", "❋", "❊", "❁", "❀", "✿", "✾", "✽"]
}

function grow(what, duration) {

  // what = what is it growing?
  // duration = how long each stage takes

  /* ~~~ growing time ~~~ */

  var what_stage = 0;
  var stages = 0;
  var rand = "";
  var what_title = "";

  switch (what) {

    case "flower":
      stages = o.flower_growth.length;
      rand = pick(o.flower);
      break;

  }

  // generate object

  var $thing =
    $("<div>")
    .html(o.flower_growth[what_stage])
    .addClass("t flower")
    .attr("title", o.flower_text[what_stage])
    .css({
      left: Math.random() * ($('#area').width()),
      top: Math.random() * ($('#area').height())
    });

  $thing.appendTo("#area").hide().fadeIn(2000);

  $thing.draggable();

  // set a timeout for duration
  var growth = setInterval(() => {

    what_stage++;
    console.log(what_stage);

    // time to wither
    if (what_stage == (o.flower_growth).length) {

      // check...  

      var s = $(".stats-count").text();
      console.log(s);

      $(".stats-count").text(parseInt(s) + 1);

      if (!seen.includes(rand)) {


        seen.push(rand);
        $("#stats-seen").append("<div class='t'>" + rand + "</div>");
      }

      $thing
        .text(rand);
      clearInterval(growth);
      return false;
    }

    $thing
      .text(o.flower_growth[what_stage])
      .attr("title", o.flower_text[what_stage]);

  }, duration)


}

function pick(items) {
  return items[~~(items.length * Math.random())];
}


$("#plant-flower").click(function () {

  grow("flower", 111)

});

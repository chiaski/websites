// HELPERS
function pick(items) {
  return items[~~(items.length * Math.random())];
}


function rng(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



const g = {
  MS_PER_HOUR: 3000, // 1 hour = how many ms
  HOUR: 500, // count per hour
  STARTING_TILES: 3,
  WORLD: "#h",
  GRID_X: 10,
  GRID_Y: 10,
}


// growth
var o = {

  flower_growth: [".", ",", "⚘", "ꕤ"],
  flower_text: ["germinating", "growing", "shivering", "blooming", "flower"],
  flower_duration: [1000, 5000, 1000, 4000],
  flower: ["❊", "❋", "❊", "❁", "❀", "✿", "✾", "✽"]
}

var seeds = {



}

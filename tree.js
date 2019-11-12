// source: https://curran.github.io/HTML5Examples/

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// var centerX = canvas.width / 2;

var trunkHeight = canvas.height / 4;
var branchLengthRatio = 0.78;
var branchAngleDifference = 19.42;
var branchingDepth = 8;

function drawTree(x1, y1, x2, y2, branchLength,
                  branchAngle, depth){
  if(depth == 0)
    return;
  else{
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.closePath();
    c.stroke();

    branchLength *= branchLengthRatio;

    function branch(angle){
      var branchX2 = x2 + branchLength * Math.cos(angle);
      var branchY2 = y2 + branchLength * Math.sin(angle);
      drawTree(x2, y2, branchX2, branchY2, branchLength,
               angle, depth - 1);
    }

    // Right branch
    branch(branchAngle + branchAngleDifference);

    // Left branch
    branch(branchAngle - branchAngleDifference);
  }
}

function redrawTree(){

  c.clearRect(0,0, canvas.width, canvas.height);
  var rect = canvas.getBoundingClientRect();
  var x1 = rect.x;
  var y1 = canvas.height;
  var x2 = x1;
  var y2 = canvas.height - trunkHeight;
  drawTree(x1, y1, x2, y2, trunkHeight,
           - Math.PI / 2, branchingDepth);
}

canvas.addEventListener("mousemove",function(e){
    var rect = canvas.getBoundingClientRect();
    // console.log(rect);
    // console.log('top', rect.top, 'left', rect.left);
    // console.log(e.x, e.y);
    // branchLengthRatio = Math.min(e.x / 400, .85);
    branchLengthRatio = 0.775;
    branchAngleDifference = e.y / (canvas.height - rect.left) * .003 * Math.PI;
    // branchAngleDifference = Math.min(branchAngleDifference, 19.7
    // );
    // branchAngleDifference = Math.max(branchAngleDifference, 18.5);
    redrawTree();
    // console.log("branchLengthRatio = "+branchLengthRatio);
    // console.log("branchAngleDifference = "+branchAngleDifference);
});

redrawTree();

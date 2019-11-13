// source: https://curran.github.io/HTML5Examples/
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const trunkHeight = canvas.height / 4;
let branchLengthRatio = 0.775;
const branchingDepth = 8;
let branchAngleDifference = -.5;

const drawTree = (x1, y1, x2, y2, branchLength,
        branchAngle, depth) => {
    if (depth === 0)
        return;

    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.closePath();
    c.stroke();

    branchLength *= branchLengthRatio;

    function branch(angle){
        var branchX2 = x2 + branchLength * Math.cos(angle);
        var branchY2 = y2 + branchLength * Math.sin(angle);
        drawTree(
            x2, y2, branchX2, branchY2, branchLength,
            angle, depth - 1);
    }

    // Right branch
    branch(branchAngle + branchAngleDifference);

    // Left branch
    branch(branchAngle - branchAngleDifference);
};

const redrawTree = () => {

  c.clearRect(0,0, canvas.width, canvas.height);
  const rect = canvas.getBoundingClientRect();
  const x = canvas.width / 2;
  const y1 = canvas.height;
  const y2 = canvas.height - trunkHeight;
  drawTree(x, y1, x, y2, trunkHeight,
           - Math.PI / 2, branchingDepth);
};

canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    branchAngleDifference = (y + 70) / 300 * -1;
    // const heightDelta = ((y - 100) / 60000);
    // console.log(heightDelta);
    // branchLengthRatio += heightDelta;
    redrawTree();
});

redrawTree();

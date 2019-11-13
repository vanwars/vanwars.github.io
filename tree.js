// source: https://curran.github.io/HTML5Examples/

const Tree = (id, opts) => {
    opts = opts || {};
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const trunkHeight = canvas.height / 6;
    let branchLengthRatio = 0.873; //0.775;
    let branchingDepth = 10;
    let alpha = 1;
    let branchAngleDifference = -0.35;

    const drawTree = (x1, y1, x2, y2, branchLength, branchAngle, depth) => {
        if (depth === 0)
            return;

        ctx.beginPath();
        ctx.lineWidth = opts.lineWidth || 0.5;
        ctx.moveTo(x1, y1);
        if (depth < 3) {
            ctx.strokeStyle = 'rgba(60, 110, 113, ' + alpha + ')';
        } else {
            ctx.strokeStyle = 'black';
        }
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        branchLength *= branchLengthRatio;

        // right branch
        branch(depth, x2, y2, branchLength, branchAngle + branchAngleDifference);

        // left branch
        branch(depth, x2, y2, branchLength, branchAngle - branchAngleDifference);
    };

    const branch = (depth, x, y, branchLength, angle) => {
        const branchX = x + branchLength * Math.cos(angle);
        const branchY = y + branchLength * Math.sin(angle);
        drawTree(
            x, y, branchX, branchY, branchLength,
            angle, depth - 1);
    };

    const redrawTree = () => {

      ctx.clearRect(0,0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();
      const x = canvas.width / 2;
      const y1 = canvas.height;
      const y2 = canvas.height - trunkHeight;
      drawTree(x, y1, x, y2, trunkHeight,
               - Math.PI / 2, branchingDepth);
      // label:
      ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
      ctx.font = "30px Arial";
      ctx.textAlign = 'center';
      ctx.fillText("TR EE", x, y1 - 10);
    };

    canvas.addEventListener("mousemove", e => {
        const rect = canvas.getBoundingClientRect();
        const height = document.querySelector('#' + id).clientHeight;
        const y = e.clientY - rect.top;
        branchAngleDifference = -1 * (y / height * 0.8 + 0.35);
        alpha = Math.abs(1 - y / height);
        branchLengthRatio = alpha * .18 + 0.7;
        console.log('blr', branchLengthRatio);
        console.log(branchAngleDifference);
        if (branchAngleDifference >= -0.5) {
            branchingDepth = 10;
        } else {
            branchingDepth = 10;
        }
        //console.log(y, height, branchAngleDifference);
        // const heightDelta = ((y - 100) / 60000);
        // console.log(heightDelta);
        // branchLengthRatio += heightDelta;
        redrawTree();
    });

    redrawTree();
};
const tree1 = Tree('canvas');
const tree2 = Tree('logo', {
    lineWidth: 2
});

// source: https://curran.github.io/HTML5Examples/

const Tree = (id, opts) => {
    opts = opts || {};
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");

    let isInteractive = true;
    if (opts.isInteractive !== undefined) {
        isInteractive = opts.isInteractive;
    }
    let animationY = canvas.height;
    let branchLengthRatio = 0.873; //0.775;
    let branchingDepth = opts.branchingDepth || 10;
    let trunkHeight = canvas.height / 6;
    let alpha = 1;
    let branchAngleDifference = -0.35;
    let animation = null;
    let fontSize = opts.fontSize || '30px'

    const drawTree = (x1, y1, x2, y2, branchLength, branchAngle, depth) => {
        if (depth === 0)
            return;

        ctx.beginPath();
        ctx.lineWidth = opts.lineWidth || 0.5;
        ctx.moveTo(x1, y1);
        if (depth < 2) {
            ctx.strokeStyle = 'rgba(124, 143, 19, ' + alpha + ')';
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
      ctx.font = fontSize + " Arial";
      ctx.textAlign = 'center';
      ctx.fillText("TR EE", x, y1 - 10);
    };

    const updateTreeOnMousemove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        updateTree(y);
    };

    const setDimensions = () => {
        const height = document.querySelector('#' + id).clientHeight;
        const width = document.querySelector('#' + id).clientWidth;
        canvas.width = width;
        canvas.height = height;
        trunkHeight = canvas.height / 6;
    }

    const updateTree = y => {
        setDimensions();
        branchAngleDifference = -1 * (y / canvas.height * 0.8 + 0.35);
        alpha = Math.abs(1 - y / canvas.height);
        branchLengthRatio = alpha * .18 + 0.7;
        redrawTree();
    };
    this.startAnimation = () => {
        animationY = document.querySelector('#' + id).clientHeight;
        animation = setInterval(animate, opts.speed || 10);
    };

    const animate = () => {
        --animationY;
        if (animationY <= 0) {
            clearInterval(animation);
            console.log('CLEARED');
            return;
        }
        updateTree(animationY);
    }
    const init = () => {
        // attach event handlers:
        if (isInteractive) {
            canvas.addEventListener("mousemove", updateTreeOnMousemove);
        }

        // init animation if requested:
        if (opts.animate) {
            updateTree(document.querySelector('#' + id).clientHeight);
            if (opts.delay) {
                setTimeout(startAnimation, opts.delay);
                return;
            }
            startAnimation();
        } else {
            setDimensions();
            redrawTree();
        }
    }
    init();

};

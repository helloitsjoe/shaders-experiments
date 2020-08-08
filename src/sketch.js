const canvasSketch = require('canvas-sketch');

const GRID_SIZE = 40;
const MARGIN_X = 70;
const MARGIN_Y = 70;

const settings = {
  dimensions: [512, 512],
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const shrinkPctX = (width - MARGIN_X * 2) / width;
    const shrinkPctY = (height - MARGIN_Y * 2) / height;

    const spaceX = (1 / (GRID_SIZE - 1)) * shrinkPctX;
    const spaceY = (1 / (GRID_SIZE - 1)) * shrinkPctY;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const normalX = spaceX * x * width + MARGIN_X;
        const normalY = spaceY * y * width + MARGIN_Y;

        const size = Math.random();
        // const size = 10;

        // context.lineWidth = 3;
        // context.strokeStyle = 'black';
        ctx.save();
        ctx.translate(normalX, normalY);
        ctx.rotate(size);
        ctx.translate(-normalX, -normalY);

        ctx.font = '18px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('I', normalX, normalY);
        ctx.restore();
        // ctx.beginPath();
        // ctx.arc(normalX, normalY, size, 0, 2 * Math.PI);
        // ctx.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);

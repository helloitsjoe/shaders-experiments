const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

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

    const colors = random.pick(palettes);

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const normalX = spaceX * x * width + MARGIN_X;
        const normalY = spaceY * y * width + MARGIN_Y;

        const size = random.noise2D(normalX, normalY, 0.005, 1);

        // context.lineWidth = 3;
        // context.strokeStyle = 'black';
        ctx.save();
        ctx.translate(normalX, normalY);
        ctx.rotate(size);
        ctx.translate(-normalX, -normalY);

        ctx.font = `${20 + size * 4}px Arial`;
        ctx.fillStyle = random.pick(colors);
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

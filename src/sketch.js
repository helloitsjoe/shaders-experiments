const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const GRID_SIZE = 20;
const MARGIN_X = 200;
const MARGIN_Y = 200;

const settings = {
  // fps: 5,
  dimensions: [2048, 2048],
  // animate: true,
};

const colors = random.pick(palettes);

const color = colors[1];

const sketch = () => {
  return ({ context: ctx, width, height, frame }) => {
    ctx.fillStyle = random.pick(colors.slice(4, 5));
    ctx.fillRect(0, 0, width, height);

    const shrinkPctX = (width - MARGIN_X * 2) / width;
    const shrinkPctY = (height - MARGIN_Y * 2) / height;

    const spaceX = (1 / (GRID_SIZE - 1)) * shrinkPctX;
    const spaceY = (1 / (GRID_SIZE - 1)) * shrinkPctY;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const normalX = spaceX * x * width + MARGIN_X;
        const normalY = spaceY * y * width + MARGIN_Y;

        const noiseVal = random.noise3D(
          // normalX * Math.sin(time),
          // normalY * Math.cos(time),
          normalX,
          normalY,
          frame * 20,
          0.0005
        );

        ctx.save();
        ctx.translate(normalX, normalY);
        ctx.rotate(noiseVal);
        ctx.translate(-normalX, -normalY);

        // ctx.font = `${70}px Arial`;
        ctx.font = `${150 + noiseVal * 150}px Arial`;

        // // const color = random.pick(colors.slice(0, 3));

        ctx.fillStyle = color;
        // ctx.fillStyle = random.pick(colors);
        ctx.fillText('+', normalX, normalY);
        ctx.restore();

        // context.lineWidth = 3;
        // context.strokeStyle = 'black';

        // ctx.lineWidth = 3;
        // const size = 0.4;

        // ctx.strokeStyle = color;
        // ctx.fillStyle = `rgba(0,0,0,${noiseVal})`;
        // ctx.beginPath();
        // ctx.arc(normalX, normalY, 150 + noiseVal * 100, 0, 2 * Math.PI);
        // // ctx.stroke();
        // ctx.fill();
      }
    }
  };
};

canvasSketch(sketch, settings);

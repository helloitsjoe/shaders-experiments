const canvasSketch = require('canvas-sketch');

const GRID_SIZE = 40;
const MARGIN_X = 70;
const MARGIN_Y = 70;

const settings = {
  dimensions: [512, 512],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const shrinkPctX = (width - MARGIN_X * 2) / width;
    const shrinkPctY = (height - MARGIN_Y * 2) / height;

    const spaceX = (1 / (GRID_SIZE - 1)) * shrinkPctX;
    const spaceY = (1 / (GRID_SIZE - 1)) * shrinkPctY;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const normalX = spaceX * x * width + MARGIN_X;
        const normalY = spaceY * y * width + MARGIN_Y;

        const size = Math.random() * 10;
        // const size = 10;

        // context.lineWidth = 3;
        // context.strokeStyle = 'black';
        context.font = '18px Arial';
        context.fillStyle = 'black';
        context.fillText('=', normalX, normalY);
        context.translate(normalX, normalY);
        context.rotate(Math.PI / size);
        context.translate(-normalX, -normalY);
        // context.beginPath();
        // context.arc(normalX, normalY, size, 0, 2 * Math.PI);
        // context.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);

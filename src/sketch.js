const canvasSketch = require('canvas-sketch');

const GRID_SIZE = 20;

const settings = {
  dimensions: [512, 512],
};

// const makeGrid = (size = 5) => {
//   const makeRow = () => new Array(size).fill(0);
//   const grid = new Array(size).fill(makeRow());
//   return grid;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const marginX = 70;
    const marginY = 70;

    const shrinkPctX = (width - marginX * 2) / width;
    const shrinkPctY = (height - marginY * 2) / height;

    const spaceX = (width * shrinkPctX) / (GRID_SIZE - 1);
    const spaceY = (height * shrinkPctY) / (GRID_SIZE - 1);

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const normalX = spaceX * x + marginX;
        const normalY = spaceY * y + marginY;

        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.beginPath();
        context.arc(normalX, normalY, 20, 0, 2 * Math.PI);
        context.stroke();
        // console.log(normalX, normalY);
      }
    }

    // console.log(grid);
  };
};

canvasSketch(sketch, settings);

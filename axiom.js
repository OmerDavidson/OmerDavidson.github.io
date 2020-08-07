function singelCentered() {
    grid[grid.length / 2][grid.length / 2][grid.length / 2] = states - 1; //enter a single centered block for the start
}

function randomStart() {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let z = 0; z < grid[0][0].length; z++) {
                //gives either a dead cell or a new cell randomly
                grid[x][y][z] = Math.floor(Math.random() * 2) * (states - 1);
            }
        }
    }
}

function solidBox() {
    for (let x = (grid.length * 3) / 8; x < (grid.length * 5) / 8; x++) {
        for (let y = (grid.length * 3) / 8; y < (grid.length * 5) / 8; y++) {
            for (
                let z = (grid.length * 3) / 8;
                z < (grid.length * 5) / 8;
                z++
            ) {
                grid[x][y][z] = states - 1;
            }
        }
    }
}

function solidSphere() {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let z = 0; z < grid[0][0].length; z++) {
                if (
                    Math.pow(x - grid.length, 2) *
                        Math.pow(y - grid.length, 2) *
                        Math.pow(z - grid.length, 2) <
                    Math.pow(grid.length / 4, 2)
                ) {
                    grid[x][y][z] = states - 1;
                }
            }
        }
    }
}

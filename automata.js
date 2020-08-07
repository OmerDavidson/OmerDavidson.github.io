function makeGrid(size) {
    arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            arr[i][j] = new Array(size).fill(0);
        }
    }
    return arr;
}

function nextLevel() {
    newGrid = makeGrid(grid.length);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            for (let k = 0; k < grid[0][0].length; k++) {
                newGrid[i][j][k] = nextCell(i, j, k);
            }
        }
    }
    grid = newGrid;
}

function nextCell(x, y, z) {
    neighbors = neighborsCount(x, y, z);

    if (
        (grid[x][y][z] == 0 && birthRules[neighbors]) ||
        (grid[x][y][z] == states - 1 && survivalRules[neighbors])
    ) {
        return states - 1; //return the highest state possible
    }
    return Math.max(0, grid[x][y][z] - 1);
}

function mooreCount(x, y, z) {
    count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                if (isValid(i, j, k) && grid[i][j][k] != 0) {
                    count++;
                }
            }
        }
    }
    if (grid[x][y][z] != 0) {
        //I dont want to count the center cell
        count--;
    }
    return count;
}

function vonCount(x, y, z) {
    indexes = [
        [0, 0, 1],
        [0, 0, -1],
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0],
    ];
    count = 0;
    for (let i = 0; i < indexes.length; i++) {
        if (
            isValid(x + indexes[i][0], y + indexes[i][1], z + indexes[i][2]) &&
            grid[x + indexes[i][0]][y + indexes[i][1]][z + indexes[i][2]] != 0
        ) {
            count++;
        }
    }
    // console.log(count);
    return count;
}

function isValid(x, y, z) {
    return (
        x >= 0 &&
        x < grid.length &&
        y >= 0 &&
        y < grid.length &&
        z >= 0 &&
        z < grid.length
    );
}

function makeRules(r) {
    /*
    syntax of rules:a/b/c/d
    a is the number of cells that is required for a cell to survive
    b is the number of cells around an empty cells required to make it alive
    c is the number of different states each cell can have
    d is the way you count the neighbors M means Moore and VN means Von Neumann
    */

    let rules = r.split("/");
    //survival conditions
    a = rules[0];
    if (a.includes("-")) {
        a = a.split("-");
        for (let i = parseInt(a[0]); i <= parseInt(a[1]); i++) {
            survivalRules[i] = true;
        }
    } else {
        let a = r.split(",");
        for (let i = 0; i < a.length; i++) {
            survivalRules[parseInt(a[i])] = true;
        }
    }
    //birth conditions
    b = rules[1];
    if (b.includes("-")) {
        b = b.split("-");
        for (let i = parseInt(b[0]); i <= parseInt(b[1]); i++) {
            birthRules[i] = true;
        }
    } else {
        b = b.split(",");
        for (let i = 0; i < b.length; i++) {
            birthRules[parseInt(b[i])] = true;
        }
    }
    //number of states
    states = rules[2];
    //neighbors count function
    if (rules[3] === "M") {
        neighborsCount = mooreCount;
    } else {
        //VN
        neighborsCount = vonCount;
    }
}

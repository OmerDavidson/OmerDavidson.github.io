function setup() {
    let gameCanvas = createCanvas(900, 900, WEBGL);
    gameCanvas.parent("myCanvas");
    // SWSlider = createSlider(0, 10, 2, 1);
    SWSlider = document.getElementById("strokeRange");
    BSSlider = document.getElementById("sizeRange");

    // colorMode(HSB, 100);
    colorMode(RGB, 256);
    makeRules("4/4/5/M");
    grid = makeGrid(40);
    cam = createCamera();
    const posConst = 50 * grid.length;
    cam.setPosition(
        posConst / 2,
        posConst / 2,
        posConst,
        posConst / 2,
        posConst / 2,
        posConst / 2,
        0,
        1,
        0
    );
    // singelCentered();
    // randomStart();
    solidBox();
    // solidSphere();
}
function draw() {
    background(51);
    drawBorders();
    orbitControl();
    strokeWeight(SWSlider.value);
    ambientLight(100);
    draw3DCells();
}

function draw3DCells() {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let z = 0; z < grid[0][0].length; z++) {
                if (grid[x][y][z] != 0) {
                    push();
                    translate(x * 50, y * 50, z * 50);
                    ambientMaterial.apply(this, RGBcube(x, y, z));
                    box(BSSlider.value);
                    pop();
                }
            }
        }
    }
}

function drawBorders() {
    push();
    translate(
        (50 * grid.length) / 2,
        (50 * grid.length) / 2,
        (50 * grid.length) / 2
    );
    noFill();
    strokeWeight(4);
    stroke(0);
    box(50 * grid.length);
    pop();
}

window.setInterval(() => {
    if (!mouseIsPressed) {
        nextLevel();
    }
}, 1000);

function stateShading(value) {
    //works in color mode HSB 100
    return map(value, 0, states - 1, 0, 100);
}

function RGBcube(x, y, z) {
    // works in color mode rgb 256
    return [RGBcubeConvert(x), RGBcubeConvert(y), RGBcubeConvert(z)];
}

function RGBcubeConvert(x) {
    return map(x, 0, grid.length, 0, 255,true);
}

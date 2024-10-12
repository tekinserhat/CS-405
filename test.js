function multiplyMatrices(matrixA, matrixB) {
    var result = [];

    for (var i = 0; i < 4; i++) {
        result[i] = [];
        for (var j = 0; j < 4; j++) {
            var sum = 0;
            for (var k = 0; k < 4; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}

// Translation Matrix
const translationMatrix = [
    [1, 0, 0, 0.3],
    [0, 1, 0, -0.25],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

// Scaling Matrix
const scalingMatrix = [
    [0.5, 0, 0, 0],
    [0, 0.5, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

// Rotation on X-axis (30 degrees)
const angleX = Math.PI / 6;
const rotationMatrixX = [
    [1, 0, 0, 0],
    [0, Math.cos(angleX), -Math.sin(angleX), 0],
    [0, Math.sin(angleX), Math.cos(angleX), 0],
    [0, 0, 0, 1]
];

// Rotation on Y-axis (45 degrees)
const angleY = Math.PI / 4;
const rotationMatrixY = [
    [Math.cos(angleY), 0, Math.sin(angleY), 0],
    [0, 1, 0, 0],
    [-Math.sin(angleY), 0, Math.cos(angleY), 0],
    [0, 0, 0, 1]
];

// Rotation on Z-axis (60 degrees)
const angleZ = Math.PI / 3;
const rotationMatrixZ = [
    [Math.cos(angleZ), -Math.sin(angleZ), 0, 0],
    [Math.sin(angleZ), Math.cos(angleZ), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

// Multiply the matrices in order
let finalMatrix = multiplyMatrices(translationMatrix, scalingMatrix);
finalMatrix = multiplyMatrices(finalMatrix, rotationMatrixZ);
finalMatrix = multiplyMatrices(finalMatrix, rotationMatrixY);
finalMatrix = multiplyMatrices(finalMatrix, rotationMatrixX);

console.log("Final Transformation Matrix:", finalMatrix);

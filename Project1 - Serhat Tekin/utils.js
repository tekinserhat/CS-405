function multiplyMatrices(matrixA, matrixB) {
    var result = [];

    for (var i = 0; i < 4; i++) {
        result[i] = [];
        for (var j = 0; j < 4; j++) {
            var sum = 0;
            for (var k = 0; k < 4; k++) {
                sum += matrixA[i * 4 + k] * matrixB[k * 4 + j];
            }
            result[i][j] = sum;
        }
    }

    // Flatten the result array
    return result.reduce((a, b) => a.concat(b), []);
}
function createIdentityMatrix() {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}
function createScaleMatrix(scale_x, scale_y, scale_z) {
    return new Float32Array([
        scale_x, 0, 0, 0,
        0, scale_y, 0, 0,
        0, 0, scale_z, 0,
        0, 0, 0, 1
    ]);
}

function createTranslationMatrix(x_amount, y_amount, z_amount) {
    return new Float32Array([
        1, 0, 0, x_amount,
        0, 1, 0, y_amount,
        0, 0, 1, z_amount,
        0, 0, 0, 1
    ]);
}

function createRotationMatrix_Z(radian) {
    return new Float32Array([
        Math.cos(radian), -Math.sin(radian), 0, 0,
        Math.sin(radian), Math.cos(radian), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_X(radian) {
    return new Float32Array([
        1, 0, 0, 0,
        0, Math.cos(radian), -Math.sin(radian), 0,
        0, Math.sin(radian), Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_Y(radian) {
    return new Float32Array([
        Math.cos(radian), 0, Math.sin(radian), 0,
        0, 1, 0, 0,
        -Math.sin(radian), 0, Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function getTransposeMatrix(matrix) {
    return new Float32Array([
        matrix[0], matrix[4], matrix[8], matrix[12],
        matrix[1], matrix[5], matrix[9], matrix[13],
        matrix[2], matrix[6], matrix[10], matrix[14],
        matrix[3], matrix[7], matrix[11], matrix[15]
    ]);
}

const vertexShaderSource = `
attribute vec3 position;
attribute vec3 normal; // Normal vector for lighting

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;

uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vNormal = vec3(normalMatrix * vec4(normal, 0.0));
    vLightDirection = lightDirection;

    gl_Position = vec4(position, 1.0) * projectionMatrix * modelViewMatrix; 
}

`

const fragmentShaderSource = `
precision mediump float;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform float shininess;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vLightDirection);
    
    // Ambient component
    vec3 ambient = ambientColor;

    // Diffuse component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseColor;

    // Specular component (view-dependent)
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Assuming the view direction is along the z-axis
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = spec * specularColor;

    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}

`

/**
 * @WARNING DO NOT CHANGE ANYTHING ABOVE THIS LINE
 */



/**
 * 
 * @TASK1 Calculate the model view matrix by using the chatGPT
 

function getChatGPTModelViewMatrix() {
    const transformationMatrix = new Float32Array([
            
        
            0.1767767, -0.30618622, 0.35355339, 0.3,    // First row
            0.46338835, 0.06341324, -0.1767767, -0.25,  // Second row
            0.12682648, 0.78033009, 0.61237244, 0,      // Third row
            0, 0, 0, 1                                   // Fourth row (homogeneous coordinate)
        





        // calculated with the both python and javascript code piecees 
    ]);

    return new Float32Array(transformationMatrix); 
}*/

/*const transformationMatrix = new Float32Array([
    0.1767767, -0.30618622, 0.35355339, 0.3,    // First row
    0.46338835, 0.06341324, -0.1767767, -0.25,  // Second row
    0.12682648, 0.78033009, 0.61237244, 0,      // Third row
    0, 0, 0, 1                                   // Fourth row (homogeneous coordinate)
]); 


        0.17677669529663692, -0.28661165235168157, 0.36959945987005827, 0.3,    // First row
        0.3061862178478973, 0.3695994598700583, 0.1401650429449553, -0.25,      // Second row
        -0.7071067811865475, 0.35355339059327373, 0.6123724356957946, 0,        // Third row
        0, 0, 0, 1                                                              // Fourth row (homogeneous coordinate) 


*/



/**
 * 
 * @TASK2 Calculate the model view matrix by using the given 
 * transformation methods and required transformation parameters
 * stated in transformation-prompt.txt
 */
// calculate the model view matrix by using the transformation
// methods and return the modelView matrix in this method
function getModelViewMatrix() {
    
    // First, apply translation
    const translationMatrix = createTranslationMatrix(0.3, -0.25, 0); // x=0.3, y=-0.25, z=0
    
    // Then apply scaling
    const scaleMatrix = createScaleMatrix(0.5, 0.5, 1); // scale x by 0.5, y by 0.5, z by 1
    

    // Then apply rotation in the order of X, Y, Z
    const rotationX = createRotationMatrix_X(Math.PI / 6); // 30 degrees
    const rotationY = createRotationMatrix_Y(Math.PI / 4); // 45 degrees
    const rotationZ = createRotationMatrix_Z(Math.PI / 3); // 60 degrees

    // Now multiply them in the correct order: translation * scale * rotationZ * rotationY * rotationX
    let modelViewMatrix = multiplyMatrices(scaleMatrix, createIdentityMatrix()); 

    modelViewMatrix = multiplyMatrices(rotationX, modelViewMatrix); // First rotate by X
    modelViewMatrix = multiplyMatrices(rotationY, modelViewMatrix); // Then by Y
    modelViewMatrix = multiplyMatrices(rotationZ, modelViewMatrix); // Then by Z
    modelViewMatrix = multiplyMatrices(translationMatrix, modelViewMatrix);

    return new Float32Array(modelViewMatrix); // return the transposed matrix 
}




/**
 * 
 * @TASK3 Ask CHAT-GPT to animate the transformation calculated in 
 * task2 infinitely with a period of 10 seconds. 
 * First 5 seconds, the cube should transform from its initial 
 * position to the target position.
 * The next 5 seconds, the cube should return to its initial position.
 */

    // this metdo should return the model view matrix at the given time
    // to get a smooth animation

 
    function getPeriodicMovement(startTime) {
        const duration = 10; // total duration for the animation in seconds
        const currentTime = (Date.now() - startTime) / 1000; // get time in seconds
    
        // Normalize time to a 0 to 1 range for the current period
        const normalizedTime = (currentTime % duration) / duration;
    
        // Use createIdentityMatrix() for the initial matrix (identity matrix)
        const initialMatrix = createIdentityMatrix();
    
        // Use getModelViewMatrix() for the transformation from Task 2
        const task2Matrix = getModelViewMatrix();
    
        let transformationMatrix = new Float32Array(16);
    
        if (normalizedTime < 0.5) {
            // First 5 seconds: transition to Task 2 transformation
            const t = normalizedTime / 0.5; // normalize to 0 to 1 over the first 5 seconds
            for (let i = 0; i < 16; i++) {
                transformationMatrix[i] = initialMatrix[i] + (task2Matrix[i] - initialMatrix[i]) * t;
            }
        } else {
            // Last 5 seconds: transition back to initial position
            const t = (normalizedTime - 0.5) / 0.5; // normalize to 0 to 1 over the last 5 seconds
            for (let i = 0; i < 16; i++) {
                transformationMatrix[i] = task2Matrix[i] + (initialMatrix[i] - task2Matrix[i]) * t;
            }
        }
    
        // Return the interpolated transformation matrix as a Float32Array
        return new Float32Array(transformationMatrix);
    } 
    





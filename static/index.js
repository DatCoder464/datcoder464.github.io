document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("button");
    const gl = canvas.get('webgl');

    if (!gl) {
        console.error('WebGL not supported');
    }

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        // Error checking omitted for brevity
        return shader;
    }

    async function getResource(name) {
        let response = await fetch('https://datcoder464.github.io/style/assets/' + name);
        return response.text();
    }

    const vertexShaderSource = getResource('mandelbrot.vert');
    const fragmentShaderSource = getResource('mandelbrot.frag');

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    // Error checking omitted for brevity
    gl.useProgram(program);
})

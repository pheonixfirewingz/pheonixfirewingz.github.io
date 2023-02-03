const view_port = document.getElementById('openGL');
const gl = view_port.getContext('webgl2');
class RuntimeObjData {
  constructor(
      vertex_buffer, vertex_count, index_buffer, vertex_array, shader_program) {
    this.shader_program = shader_program;
    this.vertex_array = vertex_array;
    this.vertex_buffer = vertex_buffer;
    this.index_buffer = index_buffer;
    this.vertex_count = vertex_count;
  }

  bindObjVertexArray() {
    gl.bindVertexArray(this.vertex_array);
  }

  bindObjProgram() {
    gl.useProgram(this.shader_program);
  }

  getVertCount() {
    return this.vertex_count;
  }

  cleanup() {
    gl.deleteBuffer(this.vertex_buffer);
    gl.deleteBuffer(this.index_buffer);
    gl.deleteVertexArray(this.vertex_array);
    gl.deleteProgram(this.shader_program);
  }
}
// const render_data = setUp();

function clear(r, g, b, a = 1.0, d = 1.0) {
  gl.clearColor(r, g, b, a);
  gl.clearDepth(d);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function setUp() {
  const vert_src =
      `attribute vec4 aVertexPosition; attribute vec4 aVertexColor; uniform mat4 uModelViewMatrix; 
        uniform mat4 uProjectionMatrix; varying lowp vec4 vColor; void main(void) { gl_Position = uProjectionMatrix
         * uModelViewMatrix * aVertexPosition; vColor = aVertexColor; }`;
  const frag_src =
      `varying lowp vec4 vColor; void main(void) { gl_FragColor = vColor; }`;
  const shader_program = gl.createProgram();
  const vertex_array = gl.createVertexArray();
  const vertex_buffer = gl.createBuffer();
  const index_buffer = gl.createBuffer();
  return new RuntimeObjData(
      vertex_buffer, vertex_count = 0, index_buffer, vertex_array,
      shader_program);
}

function draw(delta_time) {
  clear();
  return;
  try {
    render_data.bindObjProgram();
    render_data.bindObjVertexArray();
    gl.drawElements(
        gl.TRIANGLES, render_data.getVertCount(), gl.UNSIGNED_INTEGER, offset);
  } catch (e) {
    // console.warn(e);
  }
}

let then = 0;
function render(now) {
  now *= 0.001;
  draw(now - then);
  then = now;
  requestAnimationFrame(render);
}

window.addEventListener('resize', (event) => {
  let size = view_port.getBoundingClientRect();
  gl.viewport(0, 0, Math.round(size.width), Math.round(size.height));
});

self.addEventListener('beforeunload', (event) => {
  return;
  render_data.cleanup();
});
requestAnimationFrame(render);
// Three.js Scene সেটআপ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// আলো যুক্ত করা
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// GLTF লোডার দিয়ে মডেল লোড করা
const loader = new THREE.GLTFLoader();
fetch('https://indranil55.github.io/traingame/train.glb')
  .then(response => response.blob())
  .then(blob => {
      const url = URL.createObjectURL(blob);
      loader.load(url, function (gltf) {
          const model = gltf.scene;
          model.position.set(0, 0, 0);
          scene.add(model);
          camera.position.z = 5;
          animate();
      });
  })
  .catch(error => console.error("GLB Loading Error:", error));

// অ্যানিমেশন ফাংশন
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// স্ক্রীন রিসাইজ হলে আপডেট
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

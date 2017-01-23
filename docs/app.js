const extId = 'necjgeoojajimfodpdjlpnmkdobdlfia';
chrome.runtime.sendMessage(extId, 'content tab handle');

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
const vid = 'bHQqvYy5KYo';
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 300);
const controls = new THREE.OrbitControls(camera);
const scene = new THREE.Scene();
const obj = new THREE.Mesh();
obj.material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
obj.geometry = new THREE.TorusKnotGeometry(0, 0, 0, 0, 0, 0);
scene.add(camera);
scene.add(obj);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 200,
        width: 200,
        videoId: vid,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    chrome.runtime.sendMessage(extId, 'ready');
    event.target.playVideo();
    DrawGraph();
}

//var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    // }
}

function stopVideo() {
    player.stopVideo();
}

function DrawGraph() {
    requestAnimationFrame(DrawGraph);
    // 非同期なので具体的には1フレームくらいずれる
    chrome.runtime.sendMessage('necjgeoojajimfodpdjlpnmkdobdlfia', 'get audio data', (data) => {
        obj.geometry.dispose();
        console.log('data', data);
        // obj.geometry = new THREE.TorusKnotGeometry( //小数をかけてるのは値を小さくして、3Dオブジェクトのサイズを小さくするため
        //     Math.round(data[0] * 2.0), //全体的な大きさ
        //     Math.round(data[1] * 0.3), //チューブの太さ
        //     Math.round(40), //クネクネの進む方向に対してなん分割するか
        //     Math.round(8), //チューブ方向に何分割するか
        //     Math.round(data[2] * 0.3), //なんかクネクネ具合が変わる数値その1
        //     Math.round(2) //なんかクネクネ具合が変わる数値その2
        // );
    });
    controls.update();
    renderer.render(scene, camera);
}

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
      // キーダウンイベントの定義
      window.addEventListener('keydown', (event) => {
          switch(event.key){
              case 'Escape':
                  run = event.key !== 'Escape';
                  break;
              case ' ':
                  isDown = true;
                  break;
              default:
          }
      }, false);
      window.addEventListener('keyup', (event) => {
          isDown = false;
      }, false);

      // リサイズイベントの定義
      window.addEventListener('resize', () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
      }, false);

      // 初期化処理
      init();
  }, false);

  // 汎用変数
  let run = true;     // レンダリングループフラグ
  let isDown = false; // スペースキーが押されているかどうかのフラグ

  // three.js に関連するオブジェクト用の変数
  let scene;            // シーン
  let camera;           // カメラ
  let renderer;         // レンダラ
  let geometry;         // ジオメトリ
  let materialPoint;    // マテリアル
  let points;           // パーティクル
  let controls;         // カメラコントロール
  let axesHelper;       // 軸ヘルパーメッシュ

  // カメラに関するパラメータ
  const CAMERA_PARAM = {
      fovy: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 100.0,
      x: 0.0,
      y: 5.0,
      z: 10.0,
      lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };
  // レンダラに関するパラメータ
  const RENDERER_PARAM = {
      clearColor: 0,
      width: window.innerWidth,
      height: window.innerHeight,
  };
  const MATERIAL_PARAM_POINT = {
      color: 0xff9933,      // 頂点の色
      size: 0.1,            // 頂点の基本となるサイズ
      sizeAttenuation: true // 遠近感を出すかどうかの真偽値
  };

  function init(){
      // シーン
      scene = new THREE.Scene();

      // レンダラ
      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
      renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
      const wrapper = document.querySelector('.webgl');
      wrapper.appendChild(renderer.domElement);

      // カメラ
      camera = new THREE.PerspectiveCamera(
          CAMERA_PARAM.fovy,
          CAMERA_PARAM.aspect,
          CAMERA_PARAM.near,
          CAMERA_PARAM.far
      );
      camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
      camera.lookAt(CAMERA_PARAM.lookAt);

      materialPoint = new THREE.PointsMaterial(MATERIAL_PARAM_POINT);

      // パーティクルの定義
      geometry = new THREE.BufferGeometry(); // 特定の形状を持たない素体ジオメトリ
      const COUNT = 10000; // パーティクルの純粋な個数
      const SIZE = 20.0;   // どの程度の範囲に配置するかのサイズ
      const vertices = []; // まず頂点情報を格納する単なる配列（Array）

      for(let i = 0; i <= COUNT; ++i){
          // Math.random は 0 以上 1 未満の数値をランダムで返す
          const x = (Math.random() - 0.5) * 2.0 * SIZE;
          const y = (Math.random() - 0.5) * 2.0 * SIZE;
          const z = (Math.random() - 0.5) * 2.0 * SIZE;
          vertices.push(x, y, z);
      }

      // この頂点情報がいくつの要素からなるか（XYZ なので、３を指定）
      const stride = 3;
      // BufferAttribute の生成
      const attribute = new THREE.BufferAttribute(new Float32Array(vertices), stride);
      // position という名前に対して BufferAttribute を割り当てる
      geometry.setAttribute('position', attribute);

      // パーティクルを格納したジオメトリとマテリアルからポイントオブジェクトを生成
      points = new THREE.Points(geometry, materialPoint);
      // シーンにパーティクルを追加
      scene.add(points);

      // 軸ヘルパー
      axesHelper = new THREE.AxesHelper(5.0);
      scene.add(axesHelper);

      // コントロール
      controls = new OrbitControls(camera, renderer.domElement);

      // すべての初期化が完了したら描画を開始する
      run = true;
      render();
  }

  function render(){
      // 再帰呼び出し
      if(run === true){requestAnimationFrame(render);}
      points.rotation.x += 0.00025;
      points.rotation.y += 0.00075;
      renderer.render(scene, camera);
  }
})();


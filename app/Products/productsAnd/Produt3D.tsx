import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function Model() {
  const gltf = useLoader(GLTFLoader, ''); // Your 3D model path
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function Product3DViewer() {
  return (
    <div className="h-[300px] w-full md:h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow">
      <Canvas camera={{ position: [2, 2, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

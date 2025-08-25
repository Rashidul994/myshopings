'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

export default function Product3DViewer() {
  return (
    <div className="w-full h-64 bg-gray-200 rounded">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]}>
          <meshStandardMaterial color="orange" />
        
        </Box>


        <OrbitControls />
      </Canvas>
    </div>
  );
}
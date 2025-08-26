// // components/ThreeImageLink.js
// 'use client'
// import { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// export default function ThreeImageLink({ imageUrl, linkUrl }) {
//   const mountRef = useRef()

//   useEffect(() => {
//     const width = mountRef.current.clientWidth
//     const height = mountRef.current.clientHeight

//     // Scene
//     const scene = new THREE.Scene()

//     // Camera
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
//     camera.position.z = 2

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
//     renderer.setSize(width, height)
//     mountRef.current.appendChild(renderer.domElement)

//     // Texture (image)
//     const loader = new THREE.TextureLoader()
//     loader.load(imageUrl, (texture) => {
//       const geometry = new THREE.PlaneGeometry(1.5, 1)
//       const material = new THREE.MeshBasicMaterial({ map: texture })
//       const plane = new THREE.Mesh(geometry, material)
//       scene.add(plane)

//       // Handle click
//       const raycaster = new THREE.Raycaster()
//       const mouse = new THREE.Vector2()

//       const onClick = (event) => {
//         const bounds = mountRef.current.getBoundingClientRect()
//         mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
//         mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
//         raycaster.setFromCamera(mouse, camera)
//         const intersects = raycaster.intersectObject(plane)
//         if (intersects.length > 0) {
//           window.open(linkUrl, '_blank')
//         }
//       }

//       mountRef.current.addEventListener('click', onClick)

//       // Animate
//       const animate = () => {
//         requestAnimationFrame(animate)
//         plane.rotation.y += 0.003
//         renderer.render(scene, camera)
//       }
//       animate()
//     })

//     return () => {
//       mountRef.current.innerHTML = ''
//     }
//   }, [imageUrl, linkUrl])

//   return (
//     <div
//       ref={mountRef}
//       className="w-full h-64 cursor-pointer rounded-lg overflow-hidden"
//     />
//   )
// }
import React from 'react'

function Produc3Dsss() {
  return (
    <div>Produc3Dsss</div>
  )
}

export default Produc3Dsss
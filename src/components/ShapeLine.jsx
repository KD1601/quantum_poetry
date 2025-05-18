import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
  LineMaterial,
  Wireframe,
  WireframeGeometry2,
} from 'three-stdlib'

// Cần extend để dùng trong JSX
extend({ LineMaterial, Wireframe })

export default function ShapeLine() {
  const wireframeRef = useRef()
  const lineMaterialRef = useRef()

  const { size, gl, camera } = useThree()

  useEffect(() => {
    camera.position.set(-50, 0, 50)
  }, [camera])

  // Cập nhật viewport khi đổi kích thước
  useEffect(() => {
    const onResize = () => {
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
      gl.setSize(size.width, size.height)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [camera, gl, size])

  // Khởi tạo hình học và vật liệu
  const { wireframeGeometry, basicGeometry } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(20, 1)
    return {
      wireframeGeometry: new WireframeGeometry2(geo),
      basicGeometry: new THREE.WireframeGeometry(geo),
    }
  }, [])

  useFrame(() => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <OrbitControls minDistance={10} maxDistance={500} />

      {/* Wireframe dùng LineMaterial */}
      <primitive
        object={new Wireframe(wireframeGeometry, new LineMaterial({
          color: 0x4080ff,
          linewidth: 5,
          dashed: false,
        }))}
        scale={[1, 1, 1]}
        ref={wireframeRef}
      />

      {/* Basic fallback nếu cần */}
      {/* 
      <lineSegments geometry={basicGeometry}>
        <lineBasicMaterial color={0x4080ff} />
      </lineSegments> 
      */}
    </>
  )
}

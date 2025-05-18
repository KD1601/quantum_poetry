import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    Sphere,
    Text,
    OrbitControls,
    Stars,
    QuadraticBezierLine,
    Environment,
} from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const linkedWords = ['mưa', 'gió', 'nắng', 'bụi', 'nước', 'sấm', 'tuyết']
const radius = 1.4

function FacingText({ position, word, fontSize = 0.25, color = 'hotpink', onClick }) {
    const textRef = useRef()
    const { camera } = useThree()

    useFrame(() => {
        if (textRef.current) {
            textRef.current.lookAt(camera.position)
        }
    })

    return (
        <Text
            ref={textRef}
            position={position}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            depthTest={false}
            renderOrder={10}
            onClick={() => onClick(word)} // 👈 Bắt sự kiện click vào từ
        >
            {word}
        </Text>
    )
}

function QuantumSphere() {
    const groupRef = useRef()
    const [centerWord, setCenterWord] = useState('mây')

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()

        if (groupRef.current) {
            // Xoay hỗn loạn nhiều trục
            groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.5
            groupRef.current.rotation.y = t
            groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.5
        }

        // Cập nhật từ trung tâm mỗi π/2 rad
        const index = Math.floor((t / (Math.PI / 2)) % linkedWords.length)
        setCenterWord(linkedWords[index])
    })

    // ✅ Hàm xử lý khi nhấn vào từ
    const handleClickWord = (word) => {
        alert(`Trước khi tạo bài thơ với chủ đề: ${word}. Phân tích cảm xúc ở đây? `)
    }

    return (
        <>
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <Environment preset="sunset" background={false} />

            <group ref={groupRef}>
                <Sphere args={[1, 64, 64]}>
                    <meshPhysicalMaterial
                        color="#0a74b9"
                        transparent={true}
                        opacity={0.2}
                        roughness={0}
                        metalness={0}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        transmission={1}
                        ior={1.5}
                        thickness={0.5}
                        depthWrite={false}
                    />
                </Sphere>

                <Text
                    position={[0, 0, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    depthTest={false}
                    renderOrder={999}
                >
                    {centerWord}
                </Text>

                {linkedWords.map((word, i) => {
                    const angle = (i / linkedWords.length) * Math.PI * 2
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    const z = Math.sin(angle * 1.3) * radius

                    return (
                        <group key={i}>
                            <QuadraticBezierLine
                                start={[0, 0, 0]}
                                end={[x, y, z]}
                                mid={[x * 0.5, y * 0.5 + 0.5, z * 0.5]}
                                color="pink"
                                lineWidth={2}
                                dashed={false}
                            />
                            <FacingText
                                word={word}
                                position={[x, y, z]}
                                onClick={handleClickWord} // 👈 Gửi handler vào prop
                            />
                        </group>
                    )
                })}
            </group>
        </>
    )
}

export default function Feature() {
    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <QuantumSphere />
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

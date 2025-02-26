'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
    const { scene } = useGLTF('/img/cyclorama.glb')
    return (
        <Center scale={2} position={[0, 1, 0]}>
            <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />
        </Center>
    )
}

export function CycloramaModel() {
    return (
        <div className="w-full h-[55vh] pl-3 md:pl-0 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 -mx-4 md:-mx-8 lg:-mx-16 md:w-[40rem] md:h-[55vh] md:pr-32 lg:pr-64 lg:pt-12">
            <Canvas
                camera={{
                    position: [40, 12, 40],
                    fov: 35
                }}
                className="h-full"
            >
                <Suspense fallback={null}>
                    <Stage
                        adjustCamera={false}
                        intensity={0.5}
                        environment="city"
                        shadows={false}
                        preset="rembrandt"
                        position={[0, -1, 0]}
                    >
                        <Model />
                    </Stage>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                        autoRotate
                        autoRotateSpeed={4.5}
                        target={[0, 1, 0]}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

useGLTF.preload('/img/cyclorama.glb') 
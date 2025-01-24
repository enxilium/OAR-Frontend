'use client'
import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, useProgress, Html } from '@react-three/drei'
import { STLLoader } from 'three-stl-loader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress}% loaded</Html>
}

function Model({ url, fileType }) {
    const [model, setModel] = useState(null)

    useEffect(() => {
        if (!url || !fileType) return

        let obj
        try {
            if (fileType === 'stl') {
                const loader = new STLLoader()
                obj = loader.parse(url)
            } else if (fileType === 'obj') {
                const loader = new OBJLoader()
                obj = loader.parse(url)
            }

            if (obj) {
                // Calculate geometry center and scale
                const box = new THREE.Box3().setFromObject(new THREE.Mesh(obj))
                const size = box.getSize(new THREE.Vector3())
                const center = box.getCenter(new THREE.Vector3())
                const maxSize = Math.max(size.x, size.y, size.z)
                const scale = 5 / maxSize

                setModel({
                    geometry: obj,
                    center: center.toArray(),
                    scale
                })
            }
        } catch (error) {
            console.error('Error loading model:', error)
            alert('Error loading model. Please check the file format.')
        }

        return () => {
            if (obj) {
                obj.dispose()
            }
        }
    }, [url, fileType])

    if (!model) return null

    return (
        <group position={[-model.center[0] * model.scale, -model.center[1] * model.scale, -model.center[2] * model.scale]}>
            <mesh geometry={model.geometry} scale={model.scale}>
                <meshStandardMaterial color="#adadad" />
            </mesh>
        </group>
    )
}

export default function ModelViewer({ file }) {
    const [modelData, setModelData] = useState({
        url: null,
        fileType: null
    })

    useEffect(() => {
        if (!file) {
            setModelData({ url: null, fileType: null })
            return
        }

        const reader = new FileReader()
        const fileType = file.name.split('.').pop().toLowerCase()

        reader.onload = (e) => {
            setModelData({
                url: e.target.result,
                fileType: fileType
            })
        }

        reader.onerror = (error) => {
            console.error('File reading error:', error)
            alert('Error reading file')
        }

        if (fileType === 'stl') {
            reader.readAsArrayBuffer(file)
        } else if (fileType === 'obj') {
            reader.readAsText(file)
        } else {
            alert('Unsupported file format')
        }

        return () => {
            if (reader.readyState === 1) {
                reader.abort()
            }
        }
    }, [file])

    return (
        <Canvas
            camera={{ position: [5, 5, 5], fov: 50 }}
            gl={{ antialias: true }}
            style={{ width: '100%', height: '100vh' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Grid
                position={[0, -0.01, 0]}
                args={[10.5, 10.5]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#6f6f6f"
                sectionSize={1}
                sectionThickness={1}
                sectionColor="#9d4b4b"
                fadeDistance={30}
                fadeStrength={1}
            />

            <Suspense fallback={<Loader />}>
                {modelData.url ? (
                    <Model url={modelData.url} fileType={modelData.fileType} />
                ) : (
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                )}
            </Suspense>

            <OrbitControls
                enablePan={true}
                zoomSpeed={0.6}
                minDistance={2}
                maxDistance={20}
                autoRotate={false}
                dampingFactor={0.05}
            />
        </Canvas>
    )
}
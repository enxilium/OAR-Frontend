'use client'
import { useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, useProgress, Html, Line } from '@react-three/drei'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import * as THREE from 'three'

function Loader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div style={{ color: 'white', fontSize: '1.5em' }}>
                Loading: {Math.round(progress)}%
            </div>
        </Html>
    )
}

function Model({ url, fileType }) {
    const [model, setModel] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url || !fileType) return

        let isMounted = true
        let loader = null
        let obj = null

        const loadModel = async () => {
            try {
                if (fileType === 'stl') {
                    loader = new STLLoader()
                    obj = loader.parse(url)

                    if (obj instanceof THREE.BufferGeometry) {
                        const mesh = new THREE.Mesh(obj)
                        obj = mesh.geometry
                    }
                } else if (fileType === 'obj') {
                    loader = new OBJLoader()
                    obj = loader.parse(url)
                }

                if (!obj) throw new Error('Failed to parse model')

                const tempMesh = new THREE.Mesh(obj)
                const box = new THREE.Box3().setFromObject(tempMesh)
                const size = new THREE.Vector3()
                box.getSize(size)
                const center = box.getCenter(new THREE.Vector3())
                const maxSize = Math.max(size.x, size.y, size.z)
                const scale = 5 / maxSize

                if (isMounted) {
                    setModel({
                        geometry: obj,
                        center: center.toArray(),
                        scale,
                        initialPosition: [0, 0, 0]
                    })
                }
            } catch (error) {
                console.error('Model loading error:', error)
                setError(error.message)
            }
        }

        loadModel()

        return () => {
            isMounted = false
            if (obj?.dispose) obj.dispose()
        }
    }, [url, fileType])

    if (error) {
        return (
            <Html center>
                <div style={{ color: 'red' }}>Error: {error}</div>
            </Html>
        )
    }

    if (!model) return <Loader />

    // Create geometry for visualization
    const edges = new THREE.EdgesGeometry(model.geometry)
    const vertices = new THREE.Points(
        model.geometry,
        new THREE.PointsMaterial({
            color: '#ff2155',
            size: 0.15,
            sizeAttenuation: false
        })
    )

    return (
        <group
            position={[
                -model.center[0] * model.scale,
                -model.center[1] * model.scale,
                -model.center[2] * model.scale
            ]}
        >
            {/* Main geometry */}
            <mesh geometry={model.geometry} scale={model.scale}>
                <meshPhongMaterial
                    color="#adadad"
                    specular="#555555"
                    shininess={30}
                    polygonOffset
                    polygonOffsetFactor={1}
                />
            </mesh>

            {/* Edge visualization */}
            <lineSegments geometry={edges} scale={model.scale}>
                <lineBasicMaterial
                    color="#2a2a2a"
                    linewidth={1.5}
                />
            </lineSegments>

            {/* Vertex visualization */}
            <primitive object={vertices} scale={model.scale} />
        </group>
    )
}

export default function ModelViewer({ file }) {
    const [modelData, setModelData] = useState({
        url: null,
        fileType: null,
        key: 0
    })

    useEffect(() => {
        if (!file) {
            setModelData(prev => ({ ...prev, url: null, fileType: null }))
            return
        }

        const reader = new FileReader()
        const fileType = file.name.split('.').pop().toLowerCase()

        reader.onload = (e) => {
            setModelData({
                url: e.target.result,
                fileType,
                key: Date.now()
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
        }

        return () => {
            if (reader.readyState === 1) reader.abort()
        }
    }, [file])

    return (
        <Canvas
            key={modelData.key}
            camera={{ position: [5, 5, 5], fov: 50 }}
            gl={{
                antialias: true,
                logarithmicDepthBuffer: true,
                alpha: true
            }}
            style={{ width: '100%', height: '100vh', background: '#1a1a1a' }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.75} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <spotLight
                position={[-10, 10, -10]}
                angle={0.25}
                intensity={1}
                penumbra={0.5}
                castShadow
            />

            {/* Professional 3D Grid System */}
            <group>
                {/* Main XY Grid */}
                <Grid
                    position={[0, -0.01, 0]}
                    args={[40, 40]}
                    cellSize={0.5}
                    cellThickness={0.5}
                    cellColor="#404040"
                    sectionSize={5}
                    sectionThickness={1}
                    sectionColor="#606060"
                    fadeDistance={100}
                    fadeStrength={2}
                />

                {/* XZ Grid (Vertical) */}
                <Grid
                    position={[0, 0, 0]}
                    args={[40, 40]}
                    cellSize={0.5}
                    cellColor="#404040"
                    sectionSize={5}
                    sectionColor="#606060"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fadeDistance={100}
                />

                {/* Axis Guides */}
                <Line
                    points={[[-20, 0, 0], [20, 0, 0]]}
                    color="#ff3737" // X-axis (Red)
                    lineWidth={1.5}
                />
                <Line
                    points={[[0, -20, 0], [0, 20, 0]]}
                    color="#37ff37" // Y-axis (Green)
                    lineWidth={1.5}
                />
                <Line
                    points={[[0, 0, -20], [0, 0, 20]]}
                    color="#3737ff" // Z-axis (Blue)
                    lineWidth={1.5}
                />

                {/* Origin Indicator */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Model */}
            <Suspense fallback={<Loader />}>
                {modelData.url ? (
                    <Model url={modelData.url} fileType={modelData.fileType} />
                ) : (
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#666" />
                    </mesh>
                )}
            </Suspense>

            {/* Controls */}
            <OrbitControls
                enablePan={true}
                zoomSpeed={1.2}
                rotateSpeed={0.8}
                minDistance={1}
                maxDistance={100}
                dampingFactor={0.1}
                screenSpacePanning={false}
                autoRotate={false}
                enableDamping
                makeDefault
            />
        </Canvas>
    )
}
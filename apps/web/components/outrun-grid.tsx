"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function OutrunGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const container = containerRef.current
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    camera.position.y = 2
    camera.rotation.x = -0.10

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Grid material with glow effect
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        
        void main() {
          // Create pulsing glow effect
          float intensity = 0.8 + 0.2 * sin(time * 2.0);
          
          // Create color gradient based on position
          vec3 color = vec3(1.0, 0.0, 1.0); // Base magenta color
          
          // Add some variation based on position
          color.r = 1.0;
          color.g = 0.0 + 0.2 * sin(vPosition.z * 0.1 + time);
          color.b = 1.0 - 0.2 * cos(vPosition.z * 0.1 + time);
          
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
      wireframe: false,
    })

    // Create the grid
    const gridSize = 40
    const gridDivisions = 20
    const gridGeometry = new THREE.BufferGeometry()
    const gridVertices = []

    // Create horizontal lines (along z-axis)
    for (let i = -gridSize / 2; i <= gridSize / 2; i += gridSize / gridDivisions) {
      gridVertices.push(-gridSize / 2, 0, i)
      gridVertices.push(gridSize / 2, 0, i)
    }

    // Create vertical lines (along x-axis)
    for (let i = -gridSize / 2; i <= gridSize / 2; i += gridSize / gridDivisions) {
      gridVertices.push(i, 0, -gridSize / 2)
      gridVertices.push(i, 0, gridSize / 2)
    }

    gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gridVertices, 3))
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial)
    scene.add(grid)

    // Background gradient
    const gradientGeometry = new THREE.PlaneGeometry(gridSize * 2, gridSize)
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          // Dynamic gradient with time-based animation
          vec3 color1 = vec3(0.0, 0.0, 0.0); // Black at bottom
          vec3 color2 = vec3(0.3, 0.0, 0.5); // Purple at horizon
          
          // Add subtle animation to the gradient
          float t = vUv.y + 0.1 * sin(time * 0.2 + vUv.x * 3.0);
          
          // Add "sun" effect
          float sunRadius = 0.15;
          float sunCenterX = 0.5 + 0.05 * sin(time * 0.3);
          float sunCenterY = 0.7 + 0.05 * cos(time * 0.2);
          vec2 sunCenter = vec2(sunCenterX, sunCenterY);
          float sunDist = distance(vUv, sunCenter);
          
          vec3 finalColor = mix(color1, color2, t);
          
          // Add sun glow
          if (sunDist < sunRadius) {
            float sunIntensity = 1.0 - (sunDist / sunRadius);
            sunIntensity = pow(sunIntensity, 2.0);
            finalColor = mix(finalColor, vec3(1.0, 0.0, 1.0), sunIntensity * 0.8);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide,
    })

    const gradientPlane = new THREE.Mesh(gradientGeometry, gradientMaterial)
    gradientPlane.position.z = -gridSize / 2
    gradientPlane.position.y = gridSize / 4
    scene.add(gradientPlane)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01

      // Update shader uniforms
      if (gridMaterial?.uniforms?.time) {
        gridMaterial.uniforms.time.value = time
      }

      if (gradientMaterial?.uniforms?.time) {
        gradientMaterial.uniforms.time.value = time
      }

      // Move grid forward
      grid.position.z += 0.05
      if (grid.position.z > gridSize / gridDivisions) {
        grid.position.z = 0
      }

      renderer.render(scene, camera)
    }

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      // Dispose resources
      gridGeometry.dispose()
      gridMaterial.dispose()
      gradientGeometry.dispose()
      gradientMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 dark:opacity-90" />
}

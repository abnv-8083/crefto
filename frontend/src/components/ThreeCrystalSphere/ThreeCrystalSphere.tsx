import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeCrystalSphere.css';

export interface ThreeCrystalSphereProps {
  color?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onMouseMoveCoords?: (coords: { x: number; y: number }) => void;
}

export const ThreeCrystalSphere: React.FC<ThreeCrystalSphereProps> = ({
  color = '#840525',
  accentColor = '#FF3838',
  className = '',
  style,
  onMouseMoveCoords
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Custom Shader for Plasma Crystal Core
    const vertexShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        
        // Dynamic procedural surface displacement
        float pulse = sin(position.x * 2.5 + uTime * 2.2) * 
                      cos(position.y * 2.5 + uTime * 1.8) * 
                      sin(position.z * 2.5 + uTime * 2.4);
        
        vec3 displaced = position + normal * (pulse * 0.16);
        vPosition = displaced;

        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorBase;
      uniform vec3 uColorAccent;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

        // Internal energetic swirls
        float wave = sin(vPosition.y * 3.5 + uTime * 2.5) * 0.5 + 0.5;
        float wave2 = cos(vPosition.x * 3.0 - uTime * 1.8) * 0.5 + 0.5;
        float energy = mix(wave, wave2, 0.5);

        vec3 coreColor = mix(uColorBase, uColorAccent, energy);
        vec3 glowColor = mix(uColorAccent, vec3(1.0, 0.75, 0.75), fresnel);

        vec3 finalColor = mix(coreColor, glowColor, fresnel * 0.85);

        gl_FragColor = vec4(finalColor, 0.88 + fresnel * 0.12);
      }
    `;

    const baseColorObj = new THREE.Color(color);
    const accentColorObj = new THREE.Color(accentColor);

    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorBase: { value: baseColorObj },
        uColorAccent: { value: accentColorObj }
      },
      transparent: true,
      blending: THREE.NormalBlending
    });

    const sphereGeometry = new THREE.IcosahedronGeometry(1.8, 32);
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    // 3. Outer Crystal Facet Cage
    const cageGeometry = new THREE.IcosahedronGeometry(2.15, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    scene.add(cageMesh);

    // 4. Orbiting Particle Ring
    const particleCount = 750;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.6; // flattened disk

      particlePositions[i * 3] = radius * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3 + 2] = radius * Math.sin(theta);

      particleScales[i] = Math.random() * 0.04 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(0xff4d4d),
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.rotation.x = 0.35;
    particleSystem.rotation.z = 0.2;
    scene.add(particleSystem);

    // 5. Lights
    const innerLight = new THREE.PointLight(accentColorObj, 3.5, 12);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    const ambientLight = new THREE.AmbientLight(0x22050b, 1.2);
    scene.add(ambientLight);

    // 6. Interactive Mouse Movement
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isHovered = false;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.8;

      if (onMouseMoveCoords) {
        onMouseMoveCoords({ x, y });
      }
    };

    const handlePointerEnter = () => {
      isHovered = true;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetRotationX = 0;
      targetRotationY = 0;
      if (onMouseMoveCoords) {
        onMouseMoveCoords({ x: 0, y: 0 });
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handlePointerEnter);
    container.addEventListener('mouseleave', handlePointerLeave);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 360;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      sphereMaterial.uniforms.uTime.value = elapsedTime;

      // Base idle rotation + smooth mouse lerp
      const lerpSpeed = isHovered ? 0.07 : 0.04;
      sphereMesh.rotation.y += 0.008 + (targetRotationY - sphereMesh.rotation.y) * lerpSpeed;
      sphereMesh.rotation.x += (targetRotationX - sphereMesh.rotation.x) * lerpSpeed;

      // Counter-rotating cage
      cageMesh.rotation.y -= 0.005;
      cageMesh.rotation.x += 0.003;

      // Orbiting particles
      particleSystem.rotation.y += 0.004;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handlePointerEnter);
      container.removeEventListener('mouseleave', handlePointerLeave);

      sphereGeometry.dispose();
      sphereMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [color, accentColor, onMouseMoveCoords]);

  return (
    <div ref={containerRef} className={`three-crystal-sphere-container ${className}`.trim()} style={style}>
      <div className="sphere-ambient-glow" />
      <canvas ref={canvasRef} className="three-crystal-canvas" />
    </div>
  );
};

export default ThreeCrystalSphere;

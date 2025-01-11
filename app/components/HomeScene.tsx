import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function HomeScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
    
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);
    
        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
    
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const positions = new Float32Array(particlesCount * 3);
        const particleColors = new Float32Array(particlesCount * 3);
    
        for(let i = 0; i < particlesCount * 3; i += 3) {
          // Positions
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 1] = (Math.random() - 0.5) * 50;
          positions[i + 2] = (Math.random() - 0.5) * 50;
    
          // Colors
          particleColors[i] = Math.random();
          particleColors[i + 1] = Math.random();
          particleColors[i + 2] = Math.random();
        }
    
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.1,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: 0.6,
        });
    
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
    
        // Neural network nodes
        const nodes: THREE.Mesh[] = [];
        const connections: THREE.Line[] = [];
        const nodesGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        
        // Create nodes with different colors and glowing effect
        const nodeColors = [0xff3366, 0x33ff66, 0x3366ff, 0xff6633, 0x66ff33];
        for (let i = 0; i < 15; i++) {
          const material = new THREE.MeshPhongMaterial({
            color: nodeColors[i % nodeColors.length],
            shininess: 100,
            emissive: nodeColors[i % nodeColors.length],
            emissiveIntensity: 0.3,
          });
          const node = new THREE.Mesh(nodesGeometry, material);
          node.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          );
          nodes.push(node);
          scene.add(node);
        }
    
        // Create glowing connections between nodes
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x00ffff,
          opacity: 0.3,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });
    
        nodes.forEach((node, i) => {
          if (i < nodes.length - 1) {
            const points = [];
            points.push(node.position);
            points.push(nodes[i + 1].position);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            connections.push(line);
            scene.add(line);
          }
        });
    
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const pointLight1 = new THREE.PointLight(0xff3366, 2, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);
    
        const pointLight2 = new THREE.PointLight(0x3366ff, 2, 50);
        pointLight2.position.set(-10, -10, -10);
        scene.add(pointLight2);
    
        // Position camera
        camera.position.z = 20;
    
        // Floating animation variables
        const initialPositions = nodes.map(node => ({
          x: node.position.x,
          y: node.position.y,
          z: node.position.z
        }));
    
        // Animation
        function animate() {
          requestAnimationFrame(animate);
    
          // Rotate particles
          particles.rotation.x += 0.0002;
          particles.rotation.y += 0.0001;
    
          // Animate nodes
          nodes.forEach((node, i) => {
            const time = Date.now() * 0.001;
            node.position.x = initialPositions[i].x + Math.sin(time + i) * 0.5;
            node.position.y = initialPositions[i].y + Math.cos(time + i) * 0.5;
            node.position.z = initialPositions[i].z + Math.sin(time + i) * 0.3;
          });
    
          // Update connections
          connections.forEach((line, i) => {
            const positions = new Float32Array([
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[i + 1].position.x, nodes[i + 1].position.y, nodes[i + 1].position.z
            ]);
            line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            line.geometry.attributes.position.needsUpdate = true;
          });
    
          // Animate lights
          const time = Date.now() * 0.001;
          pointLight1.position.x = Math.sin(time * 0.7) * 15;
          pointLight1.position.y = Math.cos(time * 0.5) * 15;
          pointLight2.position.x = Math.cos(time * 0.3) * 15;
          pointLight2.position.y = Math.sin(time * 0.5) * 15;
    
          controls.update();
          renderer.render(scene, camera);
        }
    
        animate();
    
        // Handle window resize
        function handleResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          mountRef.current?.removeChild(renderer.domElement);
          scene.clear();
        };
      }, []);
    
      return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
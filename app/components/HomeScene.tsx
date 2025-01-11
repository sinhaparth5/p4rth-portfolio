import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const techIcons = [
  { name: 'django', size: 1.2 },
  { name: 'angular', size: 1.3 },
  { name: 'amazonwebservices-original-wordmark', size: 1.2 },
  { name: 'csharp-original', size: 1.1 },
  { name: 'docker-original-wordmark', size: 1.2 },
  { name: 'dot-net-original-wordmark', size: 1.3 },
  { name: 'git-scm-icon', size: 1.2 },
  { name: 'google_cloud-icon', size: 1.3 },
  { name: 'java-original', size: 1.2 },
  { name: 'javascript-original', size: 1.1 },
  { name: 'jenkins-icon', size: 1.2 },
  { name: 'kubernetes-icon', size: 1.3 },
  { name: 'mysql-original-wordmark', size: 1.1 },
  { name: 'nginx-original', size: 1.3 },
  { name: 'opencv-icon', size: 1.1 },
  { name: 'pandas-original', size: 1.2 },
  { name: 'postgresql-original-wordmark', size: 1.2 },
  { name: 'python-original', size: 1.3 },
  { name: 'pytorch-icon', size: 1.1 },
  { name: 'react-original-wordmark', size: 1.3 },
  { name: 'rust-plain', size: 1.1 },
  { name: 'sass-original', size: 1.3 },
  { name: 'Scikit_learn_logo_small', size: 1.1 },
  { name: 'springio-icon', size: 1.2 },
  { name: 'tailwindcss-icon', size: 1.3 },
  { name: 'tensorflow-icon', size: 1.1 },
  { name: 'typescript-original', size: 1.2 },
];

// Function to calculate spacing based on screen size
const calculateSpacing = () => {
  const width = window.innerWidth;
  if (width < 640) { // mobile
    return {
      spread: 10,
      particleSpread: 30,
      cameraDistance: 15
    };
  } else if (width < 1024) { // tablet
    return {
      spread: 15,
      particleSpread: 40,
      cameraDistance: 20
    };
  } else { // desktop
    return {
      spread: 20,
      particleSpread: 50,
      cameraDistance: 25
    };
  }
};

// Function to generate a spherical position
const generateSphericalPosition = (spread: number, index: number, total: number) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  
  return {
    x: spread * Math.cos(theta) * Math.sin(phi),
    y: spread * Math.sin(theta) * Math.sin(phi),
    z: spread * Math.cos(phi)
  };
};

export default function HomeScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        
        let spacing = calculateSpacing();
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);
    
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
    
        // Create particles with adjusted spread
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const positions = new Float32Array(particlesCount * 3);
        const particleColors = new Float32Array(particlesCount * 3);
    
        for(let i = 0; i < particlesCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * spacing.particleSpread;
          positions[i + 1] = (Math.random() - 0.5) * spacing.particleSpread;
          positions[i + 2] = (Math.random() - 0.5) * spacing.particleSpread;
    
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

        // Create sprites with spherical distribution
        const nodes: THREE.Object3D[] = [];
        const connections: THREE.Line[] = [];
        const textureLoader = new THREE.TextureLoader();
        
        techIcons.forEach((icon, index) => {
          const texture = textureLoader.load(`/icons/${icon.name}.svg`);
          texture.colorSpace = THREE.SRGBColorSpace;
          
          const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8,
          });

          const sprite = new THREE.Sprite(spriteMaterial);
          
          // Scale icons based on screen size
          const scaleFactor = window.innerWidth < 640 ? 0.8 : 1;
          sprite.scale.set(icon.size * scaleFactor, icon.size * scaleFactor, 1);
          
          // Position using spherical distribution
          const position = generateSphericalPosition(spacing.spread, index, techIcons.length);
          sprite.position.set(position.x, position.y, position.z);
          
          nodes.push(sprite);
          scene.add(sprite);
        });
    
        // Create connections with adjusted material
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x00ffff,
          opacity: 0.2, // Reduced opacity for better visibility
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
    
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const pointLight1 = new THREE.PointLight(0xff3366, 2, spacing.spread * 3);
        pointLight1.position.set(spacing.spread / 2, spacing.spread / 2, spacing.spread / 2);
        scene.add(pointLight1);
    
        const pointLight2 = new THREE.PointLight(0x3366ff, 2, spacing.spread * 3);
        pointLight2.position.set(-spacing.spread / 2, -spacing.spread / 2, -spacing.spread / 2);
        scene.add(pointLight2);
    
        camera.position.z = spacing.cameraDistance;
    
        const initialPositions = nodes.map(node => ({
          x: node.position.x,
          y: node.position.y,
          z: node.position.z
        }));
    
        function animate() {
          requestAnimationFrame(animate);
    
          particles.rotation.x += 0.0002;
          particles.rotation.y += 0.0001;
    
          nodes.forEach((node, i) => {
            const time = Date.now() * 0.001;
            node.position.x = initialPositions[i].x + Math.sin(time + i) * (spacing.spread * 0.03);
            node.position.y = initialPositions[i].y + Math.cos(time + i) * (spacing.spread * 0.03);
            node.position.z = initialPositions[i].z + Math.sin(time + i) * (spacing.spread * 0.02);
            
            if (node instanceof THREE.Sprite) {
              const spriteMaterial = node.material as THREE.SpriteMaterial;
              spriteMaterial.rotation = -controls.getAzimuthalAngle();
            }
          });
    
          connections.forEach((line, i) => {
            const positions = new Float32Array([
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[i + 1].position.x, nodes[i + 1].position.y, nodes[i + 1].position.z
            ]);
            line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            line.geometry.attributes.position.needsUpdate = true;
          });
    
          const time = Date.now() * 0.001;
          pointLight1.position.x = Math.sin(time * 0.7) * spacing.spread;
          pointLight1.position.y = Math.cos(time * 0.5) * spacing.spread;
          pointLight2.position.x = Math.cos(time * 0.3) * spacing.spread;
          pointLight2.position.y = Math.sin(time * 0.5) * spacing.spread;
    
          controls.update();
          renderer.render(scene, camera);
        }
    
        animate();
    
        function handleResize() {
          spacing = calculateSpacing();
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.position.z = spacing.cameraDistance;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          
          // Update particle positions
          const positions = particlesGeometry.attributes.position.array as Float32Array;
          for(let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * spacing.particleSpread;
            positions[i + 1] = (Math.random() - 0.5) * spacing.particleSpread;
            positions[i + 2] = (Math.random() - 0.5) * spacing.particleSpread;
          }
          particlesGeometry.attributes.position.needsUpdate = true;
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
          mountRef.current?.removeChild(renderer.domElement);
          scene.clear();
        };
      }, []);
    
      return <div ref={mountRef} className="fixed inset-0 z-10" />;
}
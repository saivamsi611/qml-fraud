import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const QuantumLoader = ({ 
  isLoading, 
  message = "Initializing Quantum Fraud Detection...",
  size = 300,
  duration = 3000
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isLoading || !mountRef.current) return;

    // Scene setup with better lighting
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000011, 8, 25);
    
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create quantum fraud detection chamber
    const chamberGroup = new THREE.Group();
    
    // Main Detection Sphere (Holographic)
    const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      emissive: 0x002244,
      shininess: 100
    });
    const detectionSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    chamberGroup.add(detectionSphere);

    // Inner Core - Fraud Detection Engine
    const coreGeometry = new THREE.IcosahedronGeometry(0.4, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
      emissive: 0x330033,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const fraudCore = new THREE.Mesh(coreGeometry, coreMaterial);
    chamberGroup.add(fraudCore);

    // Transaction Data Streams (Flowing Particles)
    const dataStreams = [];
    const streamColors = [0x00ff88, 0xff4444, 0x00aaff, 0xffaa00];
    
    for (let stream = 0; stream < 4; stream++) {
      const streamGroup = new THREE.Group();
      const particles = [];
      
      for (let i = 0; i < 8; i++) {
        const particleGeom = new THREE.SphereGeometry(0.03, 8, 8);
        const particleMat = new THREE.MeshBasicMaterial({
          color: streamColors[stream],
          transparent: true,
          opacity: 0.8
        });
        
        const particle = new THREE.Mesh(particleGeom, particleMat);
        particle.userData = {
          stream,
          index: i,
          speed: 0.02 + Math.random() * 0.01,
          radius: 1.8 + stream * 0.3,
          height: (Math.random() - 0.5) * 2
        };
        
        streamGroup.add(particle);
        particles.push(particle);
      }
      
      chamberGroup.add(streamGroup);
      dataStreams.push(particles);
    }

    // Quantum Scanning Rings
    const scanRings = [];
    for (let i = 0; i < 3; i++) {
      const ringGeom = new THREE.TorusGeometry(1.5 + i * 0.4, 0.02, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00ffff : i === 1 ? 0xff00ff : 0xffff00,
        transparent: true,
        opacity: 0.6,
        emissive: 0x111111
      });
      
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ring.rotation.y = (Math.random() - 0.5) * 0.3;
      ring.userData = { 
        originalScale: 1,
        pulseSpeed: 0.02 + i * 0.01,
        rotSpeed: 0.005 + i * 0.002
      };
      
      chamberGroup.add(ring);
      scanRings.push(ring);
    }

    // Floating Data Cubes (representing transactions)
    const dataCubes = [];
    const cubeStates = ['normal', 'suspicious', 'fraud'];
    const cubeColors = [0x00ff00, 0xffaa00, 0xff0000];
    
    for (let i = 0; i < 12; i++) {
      const cubeGeom = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const state = Math.floor(Math.random() * 3);
      const cubeMat = new THREE.MeshPhongMaterial({
        color: cubeColors[state],
        emissive: cubeColors[state],
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8
      });
      
      const cube = new THREE.Mesh(cubeGeom, cubeMat);
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1;
      
      cube.position.x = Math.cos(angle) * radius;
      cube.position.z = Math.sin(angle) * radius;
      cube.position.y = (Math.random() - 0.5) * 3;
      
      cube.userData = {
        state: cubeStates[state],
        originalPos: cube.position.clone(),
        bobSpeed: 0.01 + Math.random() * 0.02,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        glowIntensity: 0.2 + Math.random() * 0.3
      };
      
      chamberGroup.add(cube);
      dataCubes.push(cube);
    }

    // Neural Network Connections
    const connections = [];
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.3
    });
    
    for (let i = 0; i < dataCubes.length; i++) {
      if (Math.random() > 0.6) { // 40% chance of connection
        const targetIndex = Math.floor(Math.random() * dataCubes.length);
        if (targetIndex !== i) {
          const points = [
            dataCubes[i].position,
            new THREE.Vector3(0, 0, 0), // through center
            dataCubes[targetIndex].position
          ];
          
          const curve = new THREE.CatmullRomCurve3(points);
          const connectionGeom = new THREE.BufferGeometry().setFromPoints(
            curve.getPoints(20)
          );
          
          const connection = new THREE.Line(connectionGeom, connectionMaterial);
          connection.userData = { pulseOffset: Math.random() * Math.PI * 2 };
          chamberGroup.add(connection);
          connections.push(connection);
        }
      }
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 8);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    scene.add(chamberGroup);
    camera.position.set(0, 0, 5);

    // Animation loop
    let time = 0;
    let fraudDetected = false;
    let detectionProgress = 0;

    const animate = () => {
      if (!sceneRef.current) return;
      
      frameRef.current = requestAnimationFrame(animate);
      time += 0.016;
      detectionProgress = Math.min(detectionProgress + 0.005, 1);

      // Rotate entire chamber
      chamberGroup.rotation.y = time * 0.1;
      chamberGroup.rotation.x = Math.sin(time * 0.05) * 0.1;

      // Pulsing detection sphere
      const sphereScale = 1 + Math.sin(time * 3) * 0.1;
      detectionSphere.scale.setScalar(sphereScale);
      detectionSphere.material.opacity = 0.1 + Math.sin(time * 2) * 0.05;

      // Core fraud engine
      fraudCore.rotation.x = time * 0.8;
      fraudCore.rotation.y = time * 1.2;
      fraudCore.rotation.z = time * 0.6;
      
      // Color shifting based on detection
      const hue = (time * 0.1 + detectionProgress * 2) % 1;
      fraudCore.material.color.setHSL(hue, 0.8, 0.5);

      // Data stream animation
      dataStreams.forEach((stream, streamIndex) => {
        stream.forEach((particle, i) => {
          const { speed, radius, height, stream: streamId } = particle.userData;
          const angle = time * speed + (i / stream.length) * Math.PI * 2;
          
          particle.position.x = Math.cos(angle) * radius;
          particle.position.z = Math.sin(angle) * radius;
          particle.position.y = height + Math.sin(time * 2 + i) * 0.2;
          
          // Dynamic opacity based on fraud detection
          particle.material.opacity = 0.6 + Math.sin(time * 4 + i) * 0.3;
          
          // Change color when fraud detected
          if (detectionProgress > 0.7 && streamIndex === 1) {
            particle.material.color.setHex(0xff4444);
          }
        });
      });

      // Scanning rings animation
      scanRings.forEach((ring, i) => {
        const { pulseSpeed, rotSpeed } = ring.userData;
        ring.rotation.z += rotSpeed;
        ring.scale.setScalar(1 + Math.sin(time * pulseSpeed * 10) * 0.1);
        ring.material.opacity = 0.4 + Math.sin(time * pulseSpeed * 5) * 0.2;
      });

      // Data cubes animation
      dataCubes.forEach((cube, i) => {
        const { bobSpeed, rotSpeed, glowIntensity, originalPos } = cube.userData;
        
        cube.rotation.x += rotSpeed;
        cube.rotation.y += rotSpeed * 0.7;
        cube.position.y = originalPos.y + Math.sin(time * bobSpeed * 10 + i) * 0.3;
        
        // Fraud detection effect
        if (detectionProgress > 0.5) {
          cube.material.emissiveIntensity = glowIntensity + Math.sin(time * 8 + i) * 0.2;
        }
      });

      // Neural connections pulsing
      connections.forEach((connection, i) => {
        const { pulseOffset } = connection.userData;
        connection.material.opacity = 0.2 + Math.sin(time * 3 + pulseOffset) * 0.2;
      });

      // Camera subtle movement
      camera.position.x = Math.sin(time * 0.1) * 0.2;
      camera.position.y = Math.cos(time * 0.15) * 0.1;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of all objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isLoading, size]);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(circle at center, rgba(0,20,40,0.95) 0%, rgba(0,0,0,0.98) 100%)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      color: '#ffffff',
      overflow: 'hidden'
    }}>
      {/* Background Grid Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite',
        zIndex: -1
      }} />

      {/* Main 3D Animation */}
      <div 
        ref={mountRef}
        style={{
          filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))',
          marginBottom: '3rem',
          position: 'relative'
        }}
      />
      
      {/* Status Display */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        {/* Main Message */}
        <div style={{
          fontSize: '1.4rem',
          fontFamily: "'Inter', sans-serif",
          fontWeight: '600',
          background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          animation: 'textGlow 3s ease-in-out infinite'
        }}>
          {message}
        </div>
        
        {/* Detection Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.8rem 1.5rem',
          background: 'rgba(0, 255, 255, 0.05)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: '25px',
          backdropFilter: 'blur(10px)',
          fontSize: '0.95rem',
          color: '#00ffff'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff00',
            animation: 'statusBlink 2s ease-in-out infinite'
          }} />
          Quantum Neural Networks Active
        </div>
        
        {/* Progress Indicator */}
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
            borderRadius: '2px',
            animation: 'progressScan 2.5s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.6)'
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes textGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.6));
          }
        }
        
        @keyframes statusBlink {
          0%, 100% { 
            background: #00ff00; 
            box-shadow: 0 0 5px #00ff00;
          }
          50% { 
            background: #ffff00; 
            box-shadow: 0 0 10px #ffff00;
          }
        }
        
        @keyframes progressScan {
          0% { 
            transform: translateX(-100%); 
            width: 0%;
          }
          50% { 
            width: 60%; 
          }
          100% { 
            transform: translateX(300%); 
            width: 10%;
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumLoader;
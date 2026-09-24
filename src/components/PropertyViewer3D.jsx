import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Compass, 
  RotateCw, 
  Sun, 
  Moon, 
  Maximize2, 
  Layers, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function PropertyViewer3D({ onOpenEmailDossier }) {
  const mountRef = useRef(null);
  const [activeTab, setActiveTab] = useState('3d-exterior'); // '3d-exterior' | '360-interior'
  const [isNightMode, setIsNightMode] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isAutoRotatingRef = useRef(true);
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [interiorRoom, setInteriorRoom] = useState('living'); // 'living' | 'master' | 'kitchen'

  // Three.js References
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const houseGroupRef = useRef(null);
  const lightsRef = useRef({});
  const animationFrameIdRef = useRef(null);

  // Mouse interaction state for orbital rotation
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: 0.8, phi: 1.1, radius: 26 });

  // Helper to position camera from spherical angles
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 4, 0);
  }, []);

  // Hotspots definitions
  const hotspots = [
    {
      id: 'rooftop',
      title: 'Rooftop Stargazing Deck & BBQ',
      description: 'Private open-sky terrace featuring weather-resistant teak decking, ambient pergola, and panoramic views of Sector 125 & Shivalik foothills.',
      cameraTarget: { theta: 0.6, phi: 0.8, radius: 20 }
    },
    {
      id: 'master',
      title: 'Master Suite with Cantilevered Balcony',
      description: '14ft ceiling master sanctuary with floor-to-ceiling soundproof acoustic glass, walk-in Italian dressing suite, and private morning balcony.',
      cameraTarget: { theta: 1.2, phi: 1.2, radius: 18 }
    },
    {
      id: 'living',
      title: 'Double-Height Living & Foyer',
      description: '22ft soaring entrance lobby paved with imported Botticino Italian marble, automated bespoke chandelier lift, and central climate control.',
      cameraTarget: { theta: 0.2, phi: 1.3, radius: 22 }
    },
    {
      id: 'pool',
      title: 'Heated Infinity Plunge Pool & Lawn',
      description: 'Custom ceramic mosaic heated swimming pool with filtration plant, poolside sun loungers, and manicured Japanese zen garden.',
      cameraTarget: { theta: -0.5, phi: 1.2, radius: 19 }
    }
  ];

  // Initialize Three.js Scene
  useEffect(() => {
    if (activeTab !== '3d-exterior' || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x050d1a : 0x0a1c36);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x050d1a : 0x0a1c36, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x1d3557 : 0xffffff, 
      isNightMode ? 0.7 : 0.9
    );
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const dirLight = new THREE.DirectionalLight(
      isNightMode ? 0x64b5f6 : 0xfdf0d5, 
      isNightMode ? 0.6 : 1.6
    );
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);
    lightsRef.current.dir = dirLight;

    // Golden architectural warm glow lights
    const interiorPointLight = new THREE.PointLight(0xf59e0b, isNightMode ? 3.5 : 1.2, 28);
    interiorPointLight.position.set(0, 4, 0);
    scene.add(interiorPointLight);
    lightsRef.current.interior = interiorPointLight;

    const poolLight = new THREE.PointLight(0x00f5d4, isNightMode ? 2.5 : 0.8, 20);
    poolLight.position.set(7, 0.5, 6);
    scene.add(poolLight);
    lightsRef.current.pool = poolLight;

    // Build Architectural Villa Geometry
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Materials
    const wallWhiteMat = new THREE.MeshStandardMaterial({ 
      color: 0xf1f5f9, 
      roughness: 0.35, 
      metalness: 0.05 
    });
    const wallCharcoalMat = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b, 
      roughness: 0.5, 
      metalness: 0.2 
    });
    const woodMat = new THREE.MeshStandardMaterial({ 
      color: 0x8b5a2b, 
      roughness: 0.6 
    });
    const glassMat = new THREE.MeshPhysicalMaterial({ 
      color: 0x38bdf8, 
      transparent: true, 
      opacity: 0.45, 
      roughness: 0.1, 
      metalness: 0.8,
      transmission: 0.6,
      ior: 1.5
    });
    const goldMat = new THREE.MeshStandardMaterial({ 
      color: 0xc59b27, 
      metalness: 0.85, 
      roughness: 0.25 
    });
    const waterMat = new THREE.MeshStandardMaterial({ 
      color: 0x0284c7, 
      roughness: 0.1, 
      metalness: 0.8,
      transparent: true,
      opacity: 0.8
    });
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, 
      roughness: 0.9 
    });

    // 1. Manicured Estate Ground
    const ground = new THREE.Mesh(new THREE.BoxGeometry(45, 0.5, 45), groundMat);
    ground.position.y = -0.25;
    ground.receiveShadow = true;
    houseGroup.add(ground);

    // Paved Stone Pathways
    const pathway = new THREE.Mesh(new THREE.BoxGeometry(8, 0.52, 22), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 }));
    pathway.position.set(-6, -0.23, 11);
    pathway.receiveShadow = true;
    houseGroup.add(pathway);

    // 2. Ground Floor Living Pavilion (White Modern Stucco)
    const gfMain = new THREE.Mesh(new THREE.BoxGeometry(14, 5, 11), wallWhiteMat);
    gfMain.position.set(-1, 2.5, 0);
    gfMain.castShadow = true;
    gfMain.receiveShadow = true;
    houseGroup.add(gfMain);

    // Double Height Grand Entrance Glass Curtain
    const glassEntrance = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 0.4), glassMat);
    glassEntrance.position.set(-1, 2.5, 5.55);
    houseGroup.add(glassEntrance);

    // Gold Framing Pillars on Entrance
    const goldPillar1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.2, 0.4), goldMat);
    goldPillar1.position.set(-4.5, 2.5, 5.6);
    houseGroup.add(goldPillar1);

    const goldPillar2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.2, 0.4), goldMat);
    goldPillar2.position.set(2.5, 2.5, 5.6);
    houseGroup.add(goldPillar2);

    // 3. First Floor Cantilevered Master Suite (Charcoal & Teakwood)
    const ffMaster = new THREE.Mesh(new THREE.BoxGeometry(11, 4.5, 13), wallCharcoalMat);
    ffMaster.position.set(2, 7.25, -1);
    ffMaster.castShadow = true;
    ffMaster.receiveShadow = true;
    houseGroup.add(ffMaster);

    // Teakwood Architectural Louvers on Facade
    for (let i = 0; i < 7; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.5, 1.2), woodMat);
      louver.position.set(-3.2 + i * 0.9, 7.25, 5.6);
      louver.castShadow = true;
      houseGroup.add(louver);
    }

    // Panoramic Window on Master
    const masterGlass = new THREE.Mesh(new THREE.BoxGeometry(6, 3.2, 0.3), glassMat);
    masterGlass.position.set(4, 7.25, 5.55);
    houseGroup.add(masterGlass);

    // 4. Rooftop Terrace Pergola & Deck
    const roofDeck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 10), woodMat);
    roofDeck.position.set(2, 9.65, -1);
    houseGroup.add(roofDeck);

    // Modern Gold Pergola Beams
    for (let i = 0; i < 5; i++) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.25, 0.25), goldMat);
      beam.position.set(2, 12, -4 + i * 1.8);
      houseGroup.add(beam);
    }
    const pergolaPost1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), goldMat);
    pergolaPost1.position.set(-2, 10.8, -4);
    houseGroup.add(pergolaPost1);
    const pergolaPost2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), goldMat);
    pergolaPost2.position.set(6, 10.8, -4);
    houseGroup.add(pergolaPost2);

    // 5. Heated Infinity Plunge Pool & Deck
    const poolDeck = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 12), woodMat);
    poolDeck.position.set(9.5, 0.2, 5);
    poolDeck.receiveShadow = true;
    houseGroup.add(poolDeck);

    const poolWater = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 9), waterMat);
    poolWater.position.set(10, 0.25, 5);
    houseGroup.add(poolWater);

    // Luxury Modern Villa Signboard: "WESTERN REAL ESTATES"
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.2, 0.3), wallCharcoalMat);
    signBoard.position.set(-8, 1, 9);
    houseGroup.add(signBoard);

    const signTrim = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.1, 0.35), goldMat);
    signTrim.position.set(-8, 1.6, 9);
    houseGroup.add(signTrim);

    // Hotspot Visual 3D Markers (Gold Pulsing Spheres)
    const markerGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xedd06f });
    
    const m1 = new THREE.Mesh(markerGeometry, markerMaterial);
    m1.position.set(2, 11, -1);
    m1.name = 'rooftop';
    houseGroup.add(m1);

    const m2 = new THREE.Mesh(markerGeometry, markerMaterial);
    m2.position.set(4, 7.5, 5.8);
    m2.name = 'master';
    houseGroup.add(m2);

    const m3 = new THREE.Mesh(markerGeometry, markerMaterial);
    m3.position.set(-1, 3.5, 5.8);
    m3.name = 'living';
    houseGroup.add(m3);

    const m4 = new THREE.Mesh(markerGeometry, markerMaterial);
    m4.position.set(10, 1.2, 5);
    m4.name = 'pool';
    houseGroup.add(m4);

    // Animation Loop
    let pulseScale = 1;
    let pulseDirection = 1;

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotatingRef.current) {
        cameraAngleRef.current.theta += 0.0035;
        updateCameraPosition();
      }

      // Marker pulse animation
      pulseScale += 0.015 * pulseDirection;
      if (pulseScale > 1.35) pulseDirection = -1;
      if (pulseScale < 0.85) pulseDirection = 1;

      m1.scale.set(pulseScale, pulseScale, pulseScale);
      m2.scale.set(pulseScale, pulseScale, pulseScale);
      m3.scale.set(pulseScale, pulseScale, pulseScale);
      m4.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [activeTab, updateCameraPosition, isNightMode]);

  // Mouse Interaction handlers for 3D Orbiting
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsAutoRotating(false);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraAngleRef.current.theta -= deltaX * 0.007;
    cameraAngleRef.current.phi = Math.max(0.3, Math.min(1.48, cameraAngleRef.current.phi - deltaY * 0.005));

    updateCameraPosition();
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cameraAngleRef.current.radius = Math.max(14, Math.min(42, cameraAngleRef.current.radius + e.deltaY * 0.02));
    updateCameraPosition();
  };

  // Switch Day/Night Mode
  const toggleDayNight = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    if (!sceneRef.current) return;

    sceneRef.current.background = new THREE.Color(newMode ? 0x050d1a : 0x0a1c36);
    sceneRef.current.fog = new THREE.FogExp2(newMode ? 0x050d1a : 0x0a1c36, 0.02);

    if (lightsRef.current.ambient) {
      lightsRef.current.ambient.color.setHex(newMode ? 0x1d3557 : 0xffffff);
      lightsRef.current.ambient.intensity = newMode ? 0.7 : 0.9;
    }
    if (lightsRef.current.dir) {
      lightsRef.current.dir.color.setHex(newMode ? 0x64b5f6 : 0xfdf0d5);
      lightsRef.current.dir.intensity = newMode ? 0.5 : 1.6;
    }
    if (lightsRef.current.interior) {
      lightsRef.current.interior.intensity = newMode ? 4.5 : 1.2;
    }
    if (lightsRef.current.pool) {
      lightsRef.current.pool.intensity = newMode ? 3.0 : 0.8;
    }
  };

  // Jump to specific Hotspot
  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    setIsAutoRotating(false);
    cameraAngleRef.current = { ...hotspot.cameraTarget };
    updateCameraPosition();
  };

  // Room tour details for 360 viewer
  const roomData = {
    living: {
      title: "Double-Height Botticino Marble Living Hall",
      specs: "22ft Ceiling • Italian Botticino • Smart Chandelier • Sunny Enclave Sec 125",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      description: "Sunlight cascades through automated motorized louvers across double-height living spaces. Seamlessly connects to the private garden veranda."
    },
    master: {
      title: "Presidential Master Sanctuary & Spa Suite",
      specs: "14ft Hardwood Master • Walk-In Dressing • Private Balcony • Jacuzzi Bath",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      description: "Designed for effortless luxury with customized walnut woodwork, ambient warm perimeter LEDs, and floor-to-ceiling glass looking toward the mountains."
    },
    kitchen: {
      title: "German Island Modular Kitchen & Breakfast Bar",
      specs: "Blum Soft-Close • Quartz Countertop • Bosch Appliances • Pantry Room",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      description: "A culinary showpiece equipped with integrated dishwasher, smart refrigerator cavity, high-suction chimney, and continuous quartz island bar."
    }
  };

  return (
    <section id="3d-experience" className="section-padding" style={{
      background: 'linear-gradient(180deg, #050d1a 0%, #08162b 50%, #050d1a 100%)',
      borderTop: '1px solid rgba(197, 155, 39, 0.25)',
      borderBottom: '1px solid rgba(197, 155, 39, 0.25)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Compass size={14} />
            <span>Exclusive Interactive Architectural Showcase</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Experience Your Future Home in <span className="text-gold-gradient">Interactive 3D</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Explore Western Real Estates' flagship architectural concepts in Sector 125, Mohali. Rotate, zoom, inspect day & night lighting, or step inside high-definition 360° panoramic rooms.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Tab Switcher: 3D Exterior vs 360 Interior */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button 
            onClick={() => setActiveTab('3d-exterior')}
            className={`btn ${activeTab === '3d-exterior' ? 'btn-gold' : 'btn-navy'}`}
            style={{ padding: '0.75rem 1.6rem' }}
          >
            <Layers size={17} />
            <span>3D Architectural Model (Interactive)</span>
          </button>

          <button 
            onClick={() => setActiveTab('360-interior')}
            className={`btn ${activeTab === '360-interior' ? 'btn-gold' : 'btn-navy'}`}
            style={{ padding: '0.75rem 1.6rem' }}
          >
            <Eye size={17} />
            <span>360° Interior Room Tour</span>
          </button>
        </div>

        {/* TAB 1: 3D THREE.JS EXTERIOR ARCHITECTURAL EXPLORER */}
        {activeTab === '3d-exterior' && (
          <div className="luxury-card" style={{
            padding: 0,
            overflow: 'hidden',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
          }}>
            {/* Top Controls Toolbar */}
            <div style={{
              background: 'rgba(7, 19, 36, 0.9)',
              padding: '0.9rem 1.5rem',
              borderBottom: '1px solid rgba(197, 155, 39, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  display: 'inline-block',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 10px #22c55e'
                }} />
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#fae7a5' }}>
                  Live 3D Estate Canvas • Drag with Mouse/Touch to Rotate
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button 
                  onClick={toggleDayNight}
                  className="btn btn-navy"
                  style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', border: '1px solid rgba(197, 155, 39, 0.3)' }}
                >
                  {isNightMode ? <Sun size={15} color="#fae7a5" /> : <Moon size={15} color="#93c5fd" />}
                  <span>{isNightMode ? 'Day Mode' : 'Night Lighting Mode'}</span>
                </button>

                <button 
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="btn btn-navy"
                  style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', border: '1px solid rgba(197, 155, 39, 0.3)' }}
                >
                  <RotateCw size={15} color="#fae7a5" />
                  <span>{isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}</span>
                </button>

                <button 
                  onClick={() => {
                    cameraAngleRef.current = { theta: 0.8, phi: 1.1, radius: 26 };
                    updateCameraPosition();
                    setSelectedHotspot(null);
                  }}
                  className="btn btn-navy"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                  title="Reset View"
                >
                  <Maximize2 size={15} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* 3D Canvas Mount */}
            <div 
              ref={mountRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              style={{
                width: '100%',
                height: '520px',
                cursor: 'grab',
                position: 'relative'
              }}
            />

            {/* Hotspot Pills Selection Row */}
            <div style={{
              background: 'rgba(5, 13, 26, 0.95)',
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(197, 155, 39, 0.25)'
            }}>
              <div style={{ 
                fontSize: '0.82rem', 
                textTransform: 'uppercase', 
                color: '#edd06f', 
                fontWeight: '700', 
                letterSpacing: '0.06em', 
                marginBottom: '0.75rem' 
              }}>
                Interactive Hotspots (Click to Inspect Architecture):
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleHotspotClick(spot)}
                    style={{
                      background: selectedHotspot?.id === spot.id ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                      color: selectedHotspot?.id === spot.id ? '#071324' : '#ffffff',
                      border: selectedHotspot?.id === spot.id ? 'none' : '1px solid rgba(197, 155, 39, 0.3)',
                      padding: '0.6rem 1.15rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: selectedHotspot?.id === spot.id ? '#071324' : '#edd06f'
                    }} />
                    <span>{spot.title}</span>
                  </button>
                ))}
              </div>

              {/* Selected Hotspot Description Banner */}
              {selectedHotspot && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.1rem 1.4rem',
                  background: 'rgba(197, 155, 39, 0.1)',
                  border: '1px solid rgba(197, 155, 39, 0.4)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ color: '#fae7a5', fontSize: '1.05rem', marginBottom: '0.35rem', fontFamily: 'var(--font-serif)' }}>
                      {selectedHotspot.title}
                    </h4>
                    <p style={{ color: '#e2e8f0', fontSize: '0.9rem', maxWidth: '750px', lineHeight: 1.5 }}>
                      {selectedHotspot.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => onOpenEmailDossier({ title: selectedHotspot.title, price: "Custom Architectural Specification", location: "Sector 125 Mohali" })}
                    className="btn btn-gold"
                    style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
                  >
                    <span>Request Floor Plan & Specs</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: 360° INTERIOR ROOM VIRTUAL TOUR */}
        {activeTab === '360-interior' && (
          <div className="luxury-card" style={{
            padding: 0,
            overflow: 'hidden',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
          }}>
            {/* Room Selector Tabs */}
            <div style={{
              background: 'rgba(7, 19, 36, 0.95)',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(197, 155, 39, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={() => setInteriorRoom('living')}
                  className={`btn ${interiorRoom === 'living' ? 'btn-gold' : 'btn-navy'}`}
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Grand Living Hall
                </button>
                <button
                  onClick={() => setInteriorRoom('master')}
                  className={`btn ${interiorRoom === 'master' ? 'btn-gold' : 'btn-navy'}`}
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Royal Master Suite
                </button>
                <button
                  onClick={() => setInteriorRoom('kitchen')}
                  className={`btn ${interiorRoom === 'kitchen' ? 'btn-gold' : 'btn-navy'}`}
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Designer Kitchen
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fae7a5', fontSize: '0.85rem' }}>
                <Sparkles size={15} color="#c59b27" />
                <span>4K Architectural Photography View</span>
              </div>
            </div>

            {/* Room Image Display with Luxury Overlay */}
            <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
              <img 
                src={roomData[interiorRoom].image} 
                alt={roomData[interiorRoom].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.92)'
                }}
              />

              {/* Gradient Vignette */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7, 19, 36, 0.4) 0%, rgba(7, 19, 36, 0.2) 50%, rgba(5, 13, 26, 0.85) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Room Details Overlay Box */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(7, 19, 36, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(197, 155, 39, 0.4)',
                borderRadius: '12px',
                padding: '1.25rem 1.6rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '0.78rem', 
                    color: '#edd06f', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em',
                    marginBottom: '0.2rem'
                  }}>
                    {roomData[interiorRoom].specs}
                  </div>
                  <h3 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.35rem', 
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '0.35rem' 
                  }}>
                    {roomData[interiorRoom].title}
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', maxWidth: '720px' }}>
                    {roomData[interiorRoom].description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => onOpenEmailDossier({
                      title: roomData[interiorRoom].title,
                      price: "Starting ₹ 82 Lakhs - ₹ 1.85 Cr",
                      location: "Sunny Enclave, Sector 125, Mohali"
                    })}
                    className="btn btn-gold"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    <span>Email Me Specifications</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

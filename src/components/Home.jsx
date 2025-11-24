import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import FeaturedProducts from './Home/FeaturedProducts';
import Navbar from './Navbar';
const ThreeDScene = lazy(() => import('./ThreeDScene/index.jsx'));

const Home = () => {
    const lenisRef = useRef(null);
    const scrollRef = useRef(0);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            direction: 'vertical',
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ({ scroll, limit, progress }) => {
            scrollRef.current = progress;
        });

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <div className="relative overflow-x-hidden bg-black">
            {/* Rasta Gradient Background - Fixed */}
             <div className="fixed inset-0 opacity-30 pointer-events-none animate-rasta-radial" style={{
                backgroundImage: 'radial-gradient(circle at center, #E03A3E, #F7D046, #34B44A, #F7D046, #E03A3E)',
                backgroundSize: '300% 300%',
                filter: 'blur(100px)',
                zIndex: -2
            }}></div>

            {/* 3D Scene Container - Fixed */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
                <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white rasta-body animate-pulse">Loading Vibes...</div>}>
                    <ThreeDScene variant="original" scrollRef={scrollRef} lenisRef={lenisRef} />
                </Suspense>
            </div>

            {/* Content Layer - Scrollable */}
            <div className="relative min-h-[300vh]">

                {/* Section 1: Hero (Top) */}
                <div className="h-screen relative flex flex-col justify-between">
                     <Navbar />

                     <div className="container mx-auto p-8 text-center mb-20">
                        <h1 className="sr-only">Rasta Rock Store</h1>
                     </div>
                </div>

                {/* Section 2: Narrative Dive (Middle) */}
                <div className="h-screen flex items-center justify-center pointer-events-none">
                     <h2 className="text-4xl md:text-6xl font-bold text-white text-shadow-lg opacity-90 tracking-wider">
                         Siente el Ritmo
                     </h2>
                </div>

                {/* Section 3: Alignment & CTA (Bottom of Narrative) */}
                <div className="h-screen relative flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg md:text-xl lg:text-2xl text-rastaLight mt-4 mb-8 text-shadow rasta-body text-white">
                            Encuentra los accesorios y la moda más auténtica.
                        </p>
                        <Link to="/products" className="inline-block font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider transition-duration-500 animate-gradient-shift
                                                   bg-gradient-to-r from-rastaYellow to-rastaGreen-500 bg-clip-border hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 focus:ring-opacity-75 transform hover:scale-105 motion-reduce:transform-none
                                                   text-white shadow-md hover:shadow-lg border border-rastaYellow bg-opacity-90 font-sans"
                              style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                            Explora Ahora
                        </Link>
                    </div>

                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                         <a href="#lo-mas-deseado" className="animate-bounce text-white block">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                             </svg>
                         </a>
                    </div>
                </div>

            </div>

            {/* Products Section */}
            <div className="relative bg-black bg-opacity-90 backdrop-blur-sm py-10">
                 <FeaturedProducts />
                 <section className="py-4 text-center z-10">
                    <p className="text-lg md:text-xl lg:text-2xl text-white mt-2 mb-4 text-shadow rasta-body">
                        ¡Aprovecha ofertas exclusivas en Colombia y renueva tu estilo hoy!
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Home;

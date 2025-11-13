import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from './Home/FeaturedProducts';
import Navbar from './Navbar';
const ThreeDScene = lazy(() => import('./ThreeDScene/index.jsx'));

const Home = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress(currentScroll / maxScroll);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative overflow-x-hidden">
            <div className="absolute inset-0 opacity-95 animate-rasta-radial" style={{
                backgroundImage: 'radial-gradient(circle at center, #E03A3E, #F7D046, #34B44A, #F7D046, #E03A3E)',
                backgroundSize: '300% 300%',
                filter: 'blur(50px)',
                zIndex: -1
            }}></div>

            <div className="min-h-screen relative">
                <Navbar />

                <div className="fixed inset-0" style={{ zIndex: -1 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ThreeDScene variant="original" scrollProgress={scrollProgress} />
                    </Suspense>
                </div>

                <div className="absolute bottom-24 md:bottom-32 lg:bottom-40 left-1/2 transform -translate-x-1/2">
                    <div className="container mx-auto p-8 text-center">
                        <h1 className="sr-only">
                            Rasta Rock Store
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-rastaLight mt-4 mb-8 text-shadow rasta-body">
                            Encuentra los accesorios y la moda más auténtica.
                        </p>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 0 }}>
                            <a href="#lo-mas-deseado" className="flex justify-center animate-ping">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12l7 7 7-7"/>
                                </svg>
                            </a>
                        </div>

                        <div>
                            <Link to="/products" className="font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider transition-duration-500 animate-gradient-shift
                                                       bg-gradient-to-r from-rastaYellow to-rastaGreen-500 bg-clip-border hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 focus:ring-opacity-75 transform hover:scale-105 motion-reduce:transform-none
                                                       text-white shadow-md hover:shadow-lg border border-rastaYellow bg-opacity-90 font-sans"
                                  style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', zIndex: 1, marginBottom: '2rem' }}>
                                Explora Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <FeaturedProducts />

            <section className="py-4 bg-transparent text-center z-10">
                <p className="text-lg md:text-xl lg:text-2xl text-white mt-2 mb-4 text-shadow rasta-body">
                    ¡Aprovecha ofertas exclusivas en Colombia y renueva tu estilo hoy!
                </p>
            </section>
        </div>
    );
};

export default Home;
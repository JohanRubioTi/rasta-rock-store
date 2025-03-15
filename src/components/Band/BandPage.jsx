import React from 'react';
import KyrieScene from './KyrieScene';

const KyriePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
      <KyrieScene />
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center text-white mb-12 text-shadow-rasta" style={{ fontFamily: 'Great Vibes', fontSize: '4rem' }}>KYRIE</h1>
          <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-rastaYellow text-shadow product-card-readable-title">
                  UNA BANDA DE ROCK DE LAS ENTRAÑAS DE LA MONTAÑA
                </h2>
                <p className="text-rastaLight text-lg leading-relaxed mb-6 font-medium">
                  En el corazón de Icononzo, Tolima, emerge la banda de rock KYRIE que se ha ganado el respeto y la admiración de su comunidad y más allá. Con un estilo único y una energía desbordante, esta virtuosa agrupación se ha dedicado a rendir homenaje a grandes bandas de la historia del rock, interpretando sus clásicos con una autenticidad que cautiva a su audiencia.
                </p>
                <p className="text-rastaLight text-lg leading-relaxed mb-6 font-medium">
                  A través de sus covers, la banda no solo revive los himnos más emblemáticos del género, sino que también transmite su pasión por la música y su compromiso con la cultura.
                </p>
                <p className="text-rastaLight text-lg leading-relaxed font-medium">
                  Lo que distingue a KYRIE no es solo su habilidad técnica, sino su profundo respeto por la diversidad. En cada presentación, promueven el valor de la inclusión y la tolerancia, invitando a su público a reflexionar sobre la importancia de respetar las diferencias.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img src="/NF4_00059_.png" alt="Kyrie Band Logo" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div className="mt-12">
              <p className="text-rastaLight text-lg leading-relaxed mb-6 font-medium">
                La música se convierte en un lenguaje universal que une a personas de diferentes edades, géneros y creencias, creando un espacio de convivencia armónica.
              </p>
              <p className="text-rastaLight text-lg leading-relaxed font-medium">
                Además de su talento en el escenario, la banda se involucra activamente en proyectos comunitarios, fomentando el arte y la cultura local. Su presencia en Icononzo es un testimonio de que la música, más que un simple entretenimiento, tiene el poder de transformar y enriquecer la sociedad, dejando una huella profunda en todos aquellos que tienen el privilegio de escucharla.
              </p>
                <div className="mt-12">
                    <img src="/Untitled.png" alt="Kyrie Band Members" className="w-full h-auto object-cover rounded-xl" />
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KyriePage;

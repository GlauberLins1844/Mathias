
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import SeaBackground from './components/SeaBackground';
import AudioPlayer from './components/AudioPlayer';
import Guestbook from './components/Guestbook';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-50 to-amber-50 relative overflow-x-hidden font-fredoka">
      <SeaBackground />
      <AudioPlayer />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section */}
        <header className="text-center mb-16 mt-8">
            <div className="relative inline-block mb-6 group animate-float">
                <div className="absolute inset-0 bg-amber-300 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse-slow"></div>
                <img 
                    src="./image5.jpeg" 
                    alt="Mathias Sorrindo" 
                    className="relative w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-8 border-white shadow-[0_0_30px_rgba(59,130,246,0.3)] transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg border-2 border-amber-200 animate-bounce-slow">
                    <span className="text-5xl">🦀</span>
                </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl text-blue-500 drop-shadow-sm mb-4 tracking-wide relative z-10">
                Mathias <span className="text-amber-400 font-normal">faz 2 anos!</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-800/80 font-medium max-w-lg mx-auto leading-relaxed px-6 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
                Venha mergulhar nessa aventura com a gente no fundo do mar! 🐳
            </p>
        </header>

        {/* Info Cards Grid */}
        <section className="grid md:grid-cols-2 gap-6 mb-24 px-2 relative z-10 max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border-b-8 border-blue-300 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:bg-white">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-4 shadow-inner">
                    <Calendar size={40} />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 fancy-font mb-2">Quando?</h3>
                <p className="text-xl text-gray-600 font-semibold">13 de Dezembro de 2025</p>
                <p className="text-md text-blue-400 font-bold mt-1 uppercase tracking-wider">Sábado</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border-b-8 border-amber-300 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:bg-white mt-8 md:mt-0">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-400 mb-4 shadow-inner">
                    <Clock size={40} />
                </div>
                <h3 className="text-3xl font-bold text-amber-500 fancy-font mb-2">Que horas?</h3>
                <p className="text-xl text-gray-600 font-semibold">A partir das 15:00h</p>
                <p className="text-md text-amber-400 font-bold mt-1 uppercase tracking-wider">Chegue cedo!</p>
            </div>
        </section>

        {/* Photos Grid */}
        <section className="mb-24 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            
            <h2 className="text-4xl md:text-5xl text-center text-blue-600 fancy-font mb-10 drop-shadow-sm">Momentos do Peixinho</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[180px] md:auto-rows-[220px] p-4">
                {/* Main large photo */}
                <div className="row-span-2 col-span-2 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white rotate-1 hover:rotate-0 transition-all duration-500 group">
                    <img src="./image1.jpeg" alt="Mathias Batendo Palmas" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                {/* Side photo 1 */}
                <div className="rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white -rotate-2 hover:rotate-0 transition-all duration-500 hover:z-10 hover:scale-105 group">
                     <img src="./image2.jpeg" alt="Mathias Comendo Bolo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                {/* Sticker block */}
                <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white/50 bg-blue-300/20 backdrop-blur-sm flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
                     <span className="text-6xl animate-bounce">🐳</span>
                </div>
                
                {/* Side photo 2 */}
                <div className="rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white rotate-2 hover:rotate-0 transition-all duration-500 hover:z-10 hover:scale-105 group">
                     <img src="./image3.jpeg" alt="Mathias no Banquinho" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                {/* Side photo 3 */}
                <div className="rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white -rotate-1 hover:rotate-0 transition-all duration-500 hover:z-10 hover:scale-105 group">
                     <img src="./image4.jpeg" alt="Mathias em pé" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
            </div>
        </section>

        {/* Guestbook Section */}
        <section id="guestbook" className="mb-24 scroll-mt-20">
            <Guestbook />
        </section>

        <footer className="text-center pb-8 text-blue-800/60 font-medium">
            <p className="text-lg">Feito com amor para o Mathias 💙</p>
            <p className="text-sm mt-2 opacity-70">© 2025</p>
        </footer>

      </main>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-bounce-slow {
             animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;

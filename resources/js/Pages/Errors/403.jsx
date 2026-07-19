import { Head, Link } from "@inertiajs/react";

export default function Forbidden() {
    return (
        <>
            <Head title="403 Akses Ditolak" />
            <div className="min-h-screen text-black relative overflow-hidden flex flex-col">
                <div className="relative z-10 flex-1 flex flex-col w-full">
                    <div
                        className="flex-1 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
                        style={{
                            backgroundImage: "url('/assets/images/home-bg-2.jpg')",
                        }}
                    >
                        {/* Glassmorphism Card */}
                        <div className="relative bg-white/30 backdrop-blur-xl overflow-hidden p-10 sm:p-16 rounded-[40px] shadow-2xl border-2 border-white/50 text-center max-w-2xl w-full mx-4 animate-fade-in-up">
                            
                            {/* Error Icon */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/40">
                                <svg 
                                    className="w-10 h-10 sm:w-12 sm:h-12 text-white" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                                    />
                                </svg>
                            </div>

                            <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-2">
                                403
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                Akses Ditolak
                            </h2>
                            <p className="text-base sm:text-lg text-gray-900 mb-8 leading-relaxed font-medium">
                                Maaf, Anda tidak memiliki hak akses untuk melihat halaman ini. 
                                Silakan kembali ke halaman sebelumnya.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:opacity-90 transition-all duration-300 hover:shadow-lg shadow-pink-500/30"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="RKS - Sistem Pendukung Keputusan" />
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 text-white relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none"></div>

                <div className="relative z-10">
                    {/* Navigation */}
                    <nav className="container mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-white">RKS DSS</span>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-8">
                                <Link href="/" className="text-white hover:text-pink-200 transition-colors duration-300 font-medium">
                                    Beranda
                                </Link>

                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-300 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-300 font-medium border border-white border-opacity-30"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/* Hero Section */}
                    <div className="container mx-auto px-6 py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                    RKS adalah cara terbaik untuk membuat
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white"> keputusan cerdas</span>
                                    untuk bisnis Anda!
                                </h1>

                                <p className="text-xl text-purple-100 leading-relaxed max-w-lg">
                                    Sistem Pendukung Keputusan RKS dirancang untuk mengelola keputusan bisnis yang kompleks,
                                    menganalisis pola data, dan mendukung organisasi modern dengan wawasan cerdas.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center"
                                        >
                                            Buka Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center"
                                        >
                                            Mulai Sekarang
                                        </Link>
                                    )}

                                    <button className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm px-8 py-4 rounded-full text-white border border-white border-opacity-30 hover:bg-opacity-20 transition-all duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                        <span>Tonton Demo</span>
                                    </button>
                                </div>

                                {/* Platform Icons */}
                                <div className="flex items-center space-x-4 pt-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
                                        </svg>
                                    </div>
                                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - 3D Illustration */}
                            <div className="relative">
                                <div className="relative z-10">
                                    {/* Main Dashboard Mockup */}
                                    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                        <div className="space-y-4">
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex space-x-2">
                                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                </div>
                                                <div className="text-xs text-white opacity-70">Analitik Keputusan</div>
                                            </div>

                                            {/* Charts */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-3 backdrop-blur-sm">
                                                    <div className="text-xs text-white mb-2">Analisis Pendapatan</div>
                                                    <div className="flex items-end space-x-1 h-12">
                                                        <div className="bg-blue-400 w-2 h-6 rounded-sm"></div>
                                                        <div className="bg-blue-400 w-2 h-8 rounded-sm"></div>
                                                        <div className="bg-blue-400 w-2 h-10 rounded-sm"></div>
                                                        <div className="bg-blue-400 w-2 h-7 rounded-sm"></div>
                                                        <div className="bg-blue-400 w-2 h-12 rounded-sm"></div>
                                                    </div>
                                                </div>

                                                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-lg p-3 backdrop-blur-sm">
                                                    <div className="text-xs text-white mb-2">Tingkat Keberhasilan</div>
                                                    <div className="relative w-12 h-12 mx-auto">
                                                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                                            <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
                                                            <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ff6b9d" strokeWidth="3" strokeDasharray="75, 100"/>
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-xs text-white font-semibold">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decision Matrix */}
                                            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg p-3 backdrop-blur-sm">
                                                <div className="text-xs text-white mb-2">Matriks Keputusan</div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-white opacity-80">Opsi A</span>
                                                        <div className="flex space-x-1">
                                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-white opacity-80">Opsi B</span>
                                                        <div className="flex space-x-1">
                                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl p-4 shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>

                                    <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full p-3 shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Background Elements */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container mx-auto px-6 py-20">
                        <h2 className="text-4xl font-bold text-white text-center mb-16">Fitur Unggulan RKS</h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Data Analytics */}
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Analisis Data</h3>
                                <p className="text-purple-100 leading-relaxed">
                                    Alat analitik canggih untuk memproses dan memvisualisasikan data bisnis Anda,
                                    memberikan wawasan bermakna untuk proses pengambilan keputusan yang lebih baik.
                                </p>
                            </div>

                            {/* Decision Matrix */}
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h2M9 5a2 2 0 012 2v10a2 2 0 01-2 2M9 5a2 2 0 012-2h2a2 2 0 012 2M15 5a2 2 0 012 2v10a2 2 0 01-2 2" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Matriks Keputusan</h3>
                                <p className="text-purple-100 leading-relaxed">
                                    Alat matriks keputusan cerdas yang membantu Anda mengevaluasi berbagai alternatif
                                    terhadap berbagai kriteria untuk membuat pilihan bisnis yang optimal.
                                </p>
                            </div>

                            {/* AI Recommendations */}
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Rekomendasi AI</h3>
                                <p className="text-purple-100 leading-relaxed">
                                    Sistem rekomendasi cerdas yang didukung oleh pembelajaran mesin
                                    untuk menyarankan tindakan terbaik berdasarkan pola data historis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="container mx-auto px-6 py-8 text-center">
                        <div className="text-purple-200 text-sm">
                            Sistem Pendukung Keputusan RKS v{laravelVersion} (PHP v{phpVersion}) - Membuat Keputusan Cerdas Menjadi Mudah
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

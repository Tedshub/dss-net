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
            <div className="min-h-screen text-black relative overflow-hidden">
                <div className="relative z-10 mx-auto">
                    <div
                        className="home-area bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/images/home-bg-2.jpg')",
                        }}
                    >
                        {/* Navigation */}
                        <nav className="container mx-auto px-20 py-4 flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/images/dss.png"
                                    alt="Arribo Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="text-xl font-bold text-white">
                                    RKS
                                </span>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-8">
                                <Link
                                    href="/"
                                    className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                                >
                                    Beranda
                                </Link>

                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-300 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route("login")}
                                            className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="bg-gradient-to-r from-pink-500 to-purple-700 px-6 py-2 rounded-full text-white shadow-lg hover:opacity-90 transition-all"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Hero Section */}
                        <div className="container mx-auto px-20 py-20">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <div className="space-y-8">
                                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                        RKS adalah cara terbaik untuk membuat
                                        keputusan cerdas untuk bisnis Anda!
                                    </h1>

                                    <p className="text-xl text-black-100 leading-relaxed max-w-lg">
                                        Sistem Pendukung Keputusan RKS dirancang
                                        untuk mengelola keputusan bisnis yang
                                        kompleks, menganalisis pola data, dan
                                        mendukung organisasi modern dengan
                                        wawasan cerdas.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center"
                                            >
                                                Buka Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route("register")}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center"
                                            >
                                                Mulai Sekarang
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div
                        className="feature-area shadow-xl min-h-[600px]" // tinggi section
                        style={{
                            backgroundImage:
                                "url('/assets/images/feature-bg-3.png')",
                            backgroundSize: "contain", // coba dulu contain
                            backgroundPosition: "right",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                        }}
                    >
                        <div className="container mx-auto px-20 py-20">
                            <h2 className="text-4xl font-bold text-black text-center mb-16 drop-shadow-lg">
                                Fitur Unggulan RKS
                            </h2>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Data Analytics */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
                                        <svg
                                            className="w-8 h-8 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4">
                                        Analisis Data
                                    </h3>
                                    <p className="text-black/80 leading-relaxed">
                                        Alat analitik canggih untuk memproses
                                        dan memvisualisasikan data bisnis Anda,
                                        memberikan wawasan bermakna untuk proses
                                        pengambilan keputusan yang lebih baik.
                                    </p>
                                </div>

                                {/* Decision Matrix */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
                                        <svg
                                            className="w-8 h-8 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h2M9 5a2 2 0 012 2v10a2 2 0 01-2 2M9 5a2 2 0 012-2h2a2 2 0 012 2M15 5a2 2 0 012 2v10a2 2 0 01-2 2"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4">
                                        Matriks Keputusan
                                    </h3>
                                    <p className="text-black/80 leading-relaxed">
                                        Alat matriks keputusan cerdas yang
                                        membantu Anda mengevaluasi berbagai
                                        alternatif terhadap berbagai kriteria
                                        untuk membuat pilihan bisnis yang
                                        optimal.
                                    </p>
                                </div>

                                {/* AI Recommendations */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
                                        <svg
                                            className="w-8 h-8 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4">
                                        Rekomendasi AI
                                    </h3>
                                    <p className="text-black/80 leading-relaxed">
                                        Sistem rekomendasi cerdas yang didukung
                                        oleh pembelajaran mesin untuk
                                        menyarankan tindakan terbaik berdasarkan
                                        pola data historis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
                        <div className="container mx-auto px-6 py-8 text-center">
                            <div className="text-purple-200 text-sm">
                                Sistem Pendukung Keputusan RKS v{laravelVersion}{" "}
                                (PHP v{phpVersion}) - Membuat Keputusan Cerdas
                                Menjadi Mudah
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

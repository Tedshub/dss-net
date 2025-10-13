import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
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
                        <nav className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/assets/images/dss.png"
                                    alt="RKS Logo"
                                    className="h-8 sm:h-10 w-auto"
                                />
                            </div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-3 sm:space-x-6 md:space-x-8">
                                <Link
                                    href="/"
                                    className="text-sm sm:text-base text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                                >
                                    Beranda
                                </Link>

                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="bg-white bg-opacity-20 backdrop-blur-sm px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-300 font-medium text-sm sm:text-base"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <Link
                                            href={route("login")}
                                            className="text-sm sm:text-base text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="bg-gradient-to-r from-pink-500 to-purple-700 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-white shadow-lg hover:opacity-90 transition-all text-sm sm:text-base"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Hero Section */}
                        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-16 md:py-20">
                            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                                {/* Left Content */}
                                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
                                        RKS adalah cara terbaik untuk membuat
                                        keputusan cerdas untuk sekolah Anda!
                                    </h1>

                                    <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed max-w-lg bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
                                        Sistem Pendukung Keputusan RKS dirancang
                                        untuk mengelola Rencana Kerja Sekolah,
                                        menganalisis pola data, dan mendukung
                                        pengambilan keputusan pendidikan dengan
                                        wawasan cerdas.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center text-sm sm:text-base"
                                            >
                                                Buka Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route("register")}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 text-center text-sm sm:text-base"
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
                        className="feature-area shadow-xl min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
                        style={{
                            backgroundImage:
                                "url('/assets/images/feature-bg-3.png')",
                            backgroundSize: "contain",
                            backgroundPosition: "right",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                        }}
                    >
                        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-16 md:py-20">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-8 sm:mb-12 md:mb-16 drop-shadow-lg">
                                Fitur Unggulan RKS
                            </h2>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {/* Data Analytics */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                                        <svg
                                            className="w-6 h-6 sm:w-8 sm:h-8 text-black"
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
                                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                                        Analisis Data Sekolah
                                    </h3>
                                    <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                                        Alat analitik canggih untuk memproses
                                        dan memvisualisasikan data sekolah,
                                        memberikan wawasan bermakna untuk
                                        perencanaan dan evaluasi program
                                        pendidikan yang lebih baik.
                                    </p>
                                </div>

                                {/* Decision Matrix */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                                        <svg
                                            className="w-6 h-6 sm:w-8 sm:h-8 text-black"
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
                                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                                        Matriks Keputusan
                                    </h3>
                                    <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                                        Alat matriks keputusan cerdas yang
                                        membantu mengevaluasi berbagai program
                                        dan kegiatan sekolah terhadap kriteria
                                        untuk membuat prioritas Rencana Kerja
                                        Sekolah yang optimal.
                                    </p>
                                </div>

                                {/* TOPSIS Method */}
                                <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/40 shadow-lg hover:scale-105 hover:bg-white/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                                        <svg
                                            className="w-6 h-6 sm:w-8 sm:h-8 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                                        Metode TOPSIS
                                    </h3>
                                    <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                                        Sistem perankingan dengan metode TOPSIS
                                        (Technique for Order Preference by
                                        Similarity to Ideal Solution) untuk
                                        menentukan prioritas program kerja
                                        sekolah berdasarkan kriteria yang telah
                                        ditetapkan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
                        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
                            <div className="text-purple-200 text-xs sm:text-sm">
                                Sistem Pendukung Keputusan RKS - Membuat Keputusan Cerdas
                                Menjadi Mudah
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

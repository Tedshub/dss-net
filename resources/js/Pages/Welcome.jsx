import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (ref.current) observer.unobserve(ref.current);
            }
        }, { threshold });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, inView];
}

export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [featRef, featInView]   = useInView();
    const [stepsRef, stepsInView] = useInView();
    const [ctaRef, ctaInView]     = useInView();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const features = [
        {
            icon: (
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
            ),
            title: 'Analisis Data Real-time',
            desc: 'Proses dan visualisasikan data sekolah secara instan untuk memberikan wawasan bermakna bagi perencanaan pendidikan.'
        },
        {
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
            ),
            title: 'Matriks Keputusan',
            desc: 'Evaluasi berbagai program dan kegiatan sekolah terhadap kriteria yang ditetapkan untuk menghasilkan prioritas yang optimal.'
        },
        {
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
            ),
            title: 'Peringkat TOPSIS',
            desc: 'Teknik perangkingan berbasis TOPSIS yang objektif dan terukur untuk menentukan prioritas Rencana Kerja Sekolah.'
        },
        {
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            ),
            title: 'Multi Stakeholder',
            desc: 'Dukungan peran berlapis — admin, kepala sekolah, dan stakeholder — untuk kolaborasi pengambilan keputusan yang inklusif.'
        },
        {
            icon: (
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
            ),
            title: 'Akurat & Terukur',
            desc: 'Perhitungan matematika yang terstandarisasi memastikan setiap keputusan didasarkan pada data yang valid dan dapat dipertanggungjawabkan.'
        },
        {
            icon: (
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
            ),
            title: 'Panduan Lengkap',
            desc: 'Dilengkapi manual book interaktif yang memandu pengguna langkah demi langkah agar penggunaan sistem berjalan optimal.'
        },
    ];

    const steps = [
        { no: '01', title: 'Daftar & Masuk', desc: 'Buat akun sebagai Kepala Sekolah, lalu undang stakeholder sekolah Anda ke dalam sistem.' },
        { no: '02', title: 'Input Kriteria & Opsi', desc: 'Tentukan kriteria penilaian dan masukkan semua opsi kebijakan yang akan dievaluasi.' },
        { no: '03', title: 'Penilaian Kolaboratif', desc: 'Stakeholder memberikan penilaian pada setiap opsi berdasarkan kriteria yang telah ditetapkan.' },
        { no: '04', title: 'Lihat Hasil Peringkat', desc: 'Sistem secara otomatis menghitung dan menampilkan peringkat prioritas kebijakan terbaik.' },
    ];

    const stats = [
        { value: '98%', label: 'Tingkat Akurasi' },
        { value: 'TOPSIS', label: 'Metode SPK' },
        { value: '3 Peran', label: 'Manajemen Akses' },
        { value: 'Real-time', label: 'Pembaruan Data' },
    ];

    return (
        <>
            <Head title="RKS - Sistem Pendukung Keputusan" />

            <div className="min-h-screen bg-white text-gray-900 font-sans">

                {/* Sticky Navigation */}
                <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-transparent'}`}>
                    <div className="container mx-auto px-5 sm:px-8 lg:px-20 py-3 sm:py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="/assets/images/dss.png" alt="RKS Logo" className="h-8 sm:h-9 w-auto" />
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-5">
                            <a href="#fitur" className={`hidden sm:inline text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-pink-600' : 'text-white/90 hover:text-white'}`}>
                                Fitur
                            </a>
                            <a href="#cara-kerja" className={`hidden sm:inline text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-pink-600' : 'text-white/90 hover:text-white'}`}>
                                Cara Kerja
                            </a>

                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'sub_guest' ? route("alternatives.index") : route("dashboard")}
                                    className="bg-pink-500 hover:bg-pink-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white text-sm font-semibold transition-colors duration-200 shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <Link href={route("login")} className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-pink-600' : 'text-white/90 hover:text-white'}`}>
                                        Masuk
                                    </Link>
                                    <Link href={route("register")} className="bg-pink-500 hover:bg-pink-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white text-sm font-semibold transition-colors duration-200 shadow-sm">
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section
                    className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat pt-16"
                    style={{ backgroundImage: "url('/assets/images/home-bg-2.jpg')" }}
                >


                    <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-20 py-20 sm:py-28">
                        <div className="max-w-2xl">
                            <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wider animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Sistem Pendukung Keputusan
                            </span>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                Keputusan Lebih Cerdas untuk Sekolah Anda
                            </h1>

                            <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                                RKS menghadirkan platform Sistem Pendukung Keputusan berbasis TOPSIS untuk membantu sekolah merencanakan, mengevaluasi, dan memprioritaskan kebijakan pendidikan secara objektif.
                            </p>

                            <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                {auth.user ? (
                                    <Link
                                        href={auth.user.role === 'sub_guest' ? route("alternatives.index") : route("dashboard")}
                                        className="inline-flex items-center px-7 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-md text-sm sm:text-base"
                                    >
                                        Buka Dashboard
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center px-7 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-md text-sm sm:text-base"
                                    >
                                        Mulai Sekarang
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                    </Link>
                                )}
                                <button
                                    onClick={() => window.open('/assets/pdf/manual_book_rks.pdf', '_blank')}
                                    className="inline-flex items-center px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-md text-sm sm:text-base"
                                >
                                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                    </svg>
                                    Manual Book
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </section>

                {/* Stats Strip */}
                <section className="bg-gray-900 text-white py-10 sm:py-12">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-20">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                            {stats.map((s, i) => (
                                <div key={i} className="px-4">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-pink-400 mb-1">{s.value}</p>
                                    <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="fitur" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-20">
                        <div
                            ref={featRef}
                            className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                        >
                            <span className="inline-block text-pink-600 font-semibold text-xs uppercase tracking-widest mb-3">Kemampuan Platform</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Fitur Unggulan RKS
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                Dibangun khusus untuk kebutuhan perencanaan sekolah modern, setiap fitur dirancang agar pengambilan keputusan menjadi lebih mudah, cepat, dan dapat dipertanggungjawabkan.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                            {features.map((f, i) => (
                                <div
                                    key={i}
                                    className={`bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-5 border border-gray-100">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="cara-kerja" className="py-16 sm:py-20 lg:py-24 bg-white">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-20">
                        <div
                            ref={stepsRef}
                            className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                        >
                            <span className="inline-block text-pink-600 font-semibold text-xs uppercase tracking-widest mb-3">Alur Penggunaan</span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Cara Kerja Sistem RKS
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                Empat langkah sederhana untuk menghasilkan keputusan yang akurat dan kolaboratif.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div className="text-center sm:text-left lg:text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-50 border-2 border-pink-100 mb-4">
                                            <span className="text-lg font-extrabold text-pink-500">{step.no}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20 bg-gray-900 text-white">
                    <div
                        ref={ctaRef}
                        className={`container mx-auto px-5 sm:px-8 lg:px-20 text-center max-w-3xl transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    >
                        <span className="inline-block text-pink-400 font-semibold text-xs uppercase tracking-widest mb-4">Mulai Hari Ini</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                            Tingkatkan Kualitas Keputusan Sekolah Anda Sekarang
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                            Bergabunglah dengan sekolah-sekolah yang telah menggunakan RKS untuk membuat Rencana Kerja Sekolah yang lebih terstruktur, objektif, dan tepat sasaran.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'sub_guest' ? route("alternatives.index") : route("dashboard")}
                                    className="inline-flex items-center justify-center px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg text-sm sm:text-base"
                                >
                                    Buka Dashboard
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg text-sm sm:text-base"
                                    >
                                        Daftar Gratis
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all duration-200 text-sm sm:text-base"
                                    >
                                        Sudah Punya Akun? Masuk
                                    </Link>
                                </>
                            )}
                        </div>

                        <p className="mt-6 text-gray-500 text-xs">
                            Butuh panduan?{' '}
                            <button
                                onClick={() => window.open('/assets/pdf/manual_book_rks.pdf', '_blank')}
                                className="text-pink-400 hover:text-pink-300 underline underline-offset-2 transition-colors"
                            >
                                Unduh Manual Book
                            </button>
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-950 text-gray-400">
                    <div className="container mx-auto px-5 sm:px-8 lg:px-20 py-12 sm:py-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">

                            {/* Brand Column */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <img src="/assets/images/dss.png" alt="RKS Logo" className="h-9 w-auto mb-4 brightness-0 invert opacity-70" />
                                <p className="text-sm leading-relaxed text-gray-500 mb-5">
                                    Platform Sistem Pendukung Keputusan untuk Rencana Kerja Sekolah berbasis metode TOPSIS yang objektif dan terukur.
                                </p>
                                <button
                                    onClick={() => window.open('/assets/pdf/manual_book_rks.pdf', '_blank')}
                                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-400 border border-gray-700 hover:border-pink-500 px-3 py-1.5 rounded-full transition-all duration-200"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                    </svg>
                                    Manual Book
                                </button>
                            </div>

                            {/* Navigasi */}
                            <div>
                                <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigasi</h4>
                                <ul className="space-y-2.5 text-sm">
                                    <li><a href="#" className="hover:text-pink-400 transition-colors">Beranda</a></li>
                                    <li><a href="#fitur" className="hover:text-pink-400 transition-colors">Fitur</a></li>
                                    <li><a href="#cara-kerja" className="hover:text-pink-400 transition-colors">Cara Kerja</a></li>
                                    {!auth.user && (
                                        <>
                                            <li><Link href={route("login")} className="hover:text-pink-400 transition-colors">Masuk</Link></li>
                                            <li><Link href={route("register")} className="hover:text-pink-400 transition-colors">Daftar</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Metode */}
                            <div>
                                <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Metode SPK</h4>
                                <ul className="space-y-2.5 text-sm">
                                    <li className="text-gray-500">Teknik TOPSIS</li>
                                    <li className="text-gray-500">Normalisasi Matriks</li>
                                    <li className="text-gray-500">Pembobotan Kriteria</li>
                                    <li className="text-gray-500">Solusi Ideal Positif</li>
                                    <li className="text-gray-500">Peringkat Alternatif</li>
                                </ul>
                            </div>

                            {/* Tentang */}
                            <div>
                                <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Tentang Sistem</h4>
                                <ul className="space-y-2.5 text-sm">
                                    <li className="text-gray-500">Versi 1.0</li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
                                        <span className="text-gray-500">Sistem Aktif</span>
                                    </li>
                                    <li className="text-gray-500">Dioptimalkan untuk Chrome, Edge, Firefox</li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-xs text-gray-600">
                                &copy; {new Date().getFullYear()} Sistem Pendukung Keputusan RKS. Hak cipta dilindungi.
                            </p>
                            <p className="text-xs text-gray-600">
                                Dibangun dengan <span className="text-pink-500">♥</span> menggunakan Laravel &amp; React
                            </p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}

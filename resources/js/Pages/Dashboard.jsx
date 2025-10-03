// resources/js/Pages/Dashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ criterias = [], alternatives = [] }) {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size - consistent with Values/Index.jsx
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Menghitung statistik berdasarkan data real dari database
    const totalCriteria = criterias.length;
    const totalAlternatives = alternatives.length;
    const costCriteria = criterias.filter(c => c.type === 'cost').length;
    const benefitCriteria = criterias.filter(c => c.type === 'benefit').length;
    const averageWeight = totalCriteria > 0 ? (criterias.reduce((sum, c) => sum + parseFloat(c.weight), 0) / totalCriteria).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Layout Container */}
            <div className="fixed inset-0 flex flex-col">
                {/* AuthenticatedLayout with overlay behavior */}
                <AuthenticatedLayout>
                    <Head title="Dashboard - DSS RKS" />

                    {/* Main Content Area - scrollable */}
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            {/* Header */}
                            <div className="mb-4 sm:mb-6">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Dashboard</h1>
                                <div className="text-xs sm:text-sm lg:text-base">
                                    <p className="text-gray-600 mb-1">Metode yang digunakan:</p>
                                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Metode TOPSIS</h2>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                {/* Jumlah Criteria Card - Sekarang mengambil data dari database */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Jumlah Criteria</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalCriteria}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Jumlah Alternatif Card - Sekarang mengambil data dari database */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Jumlah Opsi Kebijakan</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalAlternatives}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Analisis Card */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Status Analisis</p>
                                            <p className="text-sm sm:text-base lg:text-xl font-semibold text-green-600 truncate">Siap</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Akurasi Card */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Akurasi</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">98%</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {/* Method Description */}
                                <div className="xl:col-span-2">
                                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                                        <div className="mb-4 sm:mb-6">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Penjelasan Metode</h3>
                                            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Metode TOPSIS</h4>
                                        </div>

                                        <div className="prose max-w-none text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed space-y-3 sm:space-y-4">
                                            <p>
                                                Metode SPK TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) adalah suatu
                                                teknik yang digunakan dalam pengambilan keputusan multi-kriteria untuk memilih alternatif terbaik
                                                dari sejumlah pilihan yang tersedia. Langkah-langkah dalam metode ini dimulai dengan
                                                mengidentifikasi kriteria yang relevan, normalisasi matriks keputusan untuk membandingkan nilai
                                                kriteria secara objektif, dan pembobotan kriteria berdasarkan tingkat kepentingannya.
                                            </p>

                                            <p>
                                                Setelah itu, dilakukan perhitungan matriks solusi ideal positif dan negatif untuk menentukan nilai ideal dari setiap
                                                kriteria. Kemudian, dihitung jarak setiap alternatif terhadap solusi ideal positif dan negatif, serta skor
                                                proksimitas relatif untuk menentukan kedekatan setiap alternatif terhadap solusi ideal.
                                            </p>

                                            <p>
                                                Dari perhitungan ini, alternatif dengan skor proksimitas terbesar atau terdekat dengan solusi ideal positif
                                                dan terjauh dari solusi ideal negatif akan diurutkan sebagai alternatif terbaik. Metode TOPSIS ini sering
                                                digunakan dalam berbagai bidang untuk membantu pengambilan keputusan yang lebih terukur dan objektif.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Sidebar */}
                                <div className="xl:col-span-1 space-y-4 sm:space-y-6">
                                    {/* Visualization Card */}
                                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Panduan Penggunaan</h3>
                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="flex items-start space-x-2 sm:space-x-3">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs sm:text-sm font-semibold">1</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm leading-relaxed">Input Kriteria (Untuk kriteria hanya admin yang dapat melakukannya)</span>
                                                </div>
                                                <div className="flex items-start space-x-2 sm:space-x-3">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs sm:text-sm font-semibold">2</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm leading-relaxed">Tambahkan opsi dan jawab pertanyaan setelahnya pada menu Opsi kebijakan</span>
                                                </div>
                                                <div className="flex items-start space-x-2 sm:space-x-3">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs sm:text-sm font-semibold">3</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm leading-relaxed">Anda dapat mengedit nilai pada menu Matriks Penilaian (jika diperlukan)</span>
                                                </div>
                                                <div className="flex items-start space-x-2 sm:space-x-3">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs sm:text-sm font-semibold">4</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm leading-relaxed">Ranking hasil dan detailnya akan otomatis muncul pada menu Hitung</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Background Illustration */}
                                        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 opacity-20">
                                            <div className="relative w-full h-full">
                                                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-12 xl:h-12 bg-white/20 rounded-lg transform rotate-12"></div>
                                                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 bg-white/15 rounded-lg transform -rotate-6"></div>
                                                <div className="absolute top-3 right-1.5 sm:top-6 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 bg-white/10 rounded-lg transform rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
                                        <div className="space-y-2 sm:space-y-3">
                                            <Link
                                                href={route('alternatives.index')}
                                                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02]"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                                </svg>
                                                <span className="font-medium text-sm sm:text-base">Mulai Analisis</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Additional Info Card - Mobile Only */}
                                    <div className="xl:hidden bg-blue-50 rounded-lg border border-blue-200 p-3 sm:p-4">
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                            </svg>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-blue-800 mb-1">Tips Penggunaan</h4>
                                                <p className="text-xs text-blue-700 leading-relaxed">
                                                    Pastikan semua kriteria dan alternatif sudah diinput sebelum memulai analisis.
                                                    Hasil akan lebih akurat dengan data yang lengkap.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </div>
    );
}

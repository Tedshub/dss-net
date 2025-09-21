import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - DSS RKS" />

            <div className="p-4 lg:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <div className="text-sm lg:text-base">
                        <p className="text-gray-600">Metode yang digunakan:</p>
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Metode TOPSIS</h2>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    {/* Jumlah Criteria Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Jumlah Criteria</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">10</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Jumlah Alternatif Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Jumlah Opsi Kebijakan</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">20</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Status Analisis Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Status Analisis</p>
                                <p className="text-lg lg:text-xl font-semibold text-green-600">Siap</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Akurasi Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Akurasi</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">98%</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Method Description */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Penjelasan Metode</h3>
                                <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Metode TOPSIS</h4>
                            </div>

                            <div className="prose max-w-none text-gray-600 text-sm lg:text-base leading-relaxed space-y-4">
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
                    <div className="xl:col-span-1 space-y-6">
                        {/* Visualization Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-semibold mb-6">Visualisasi Proses</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold">1</span>
                                        </div>
                                        <span className="text-sm">Input Kriteria & Alternatif</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold">2</span>
                                        </div>
                                        <span className="text-sm">Normalisasi Matriks</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold">3</span>
                                        </div>
                                        <span className="text-sm">Hitung Solusi Ideal</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold">4</span>
                                        </div>
                                        <span className="text-sm">Ranking Hasil</span>
                                    </div>
                                </div>
                            </div>

                            {/* Background Illustration */}
                            <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 opacity-20">
                                <div className="relative w-full h-full">
                                    <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 bg-white/20 rounded-lg transform rotate-12"></div>
                                    <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 bg-white/15 rounded-lg transform -rotate-6"></div>
                                    <div className="absolute top-6 right-3 w-4 h-4 lg:w-6 lg:h-6 bg-white/10 rounded-lg transform rotate-45"></div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02]">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">Mulai Analisis</span>
                                </button>

                                <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">Export Hasil</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Information */}
                <div className="mt-6 lg:mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center sm:text-left">
                            <p className="text-gray-600 text-sm mb-1">Version</p>
                            <p className="font-semibold text-gray-900">v1.2.0</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center sm:text-left">
                            <p className="text-gray-600 text-sm mb-1">Last Update</p>
                            <p className="font-semibold text-gray-900">2024-12-20</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center sm:text-left">
                            <p className="text-gray-600 text-sm mb-1">Database</p>
                            <p className="font-semibold text-green-600">Connected</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center sm:text-left">
                            <p className="text-gray-600 text-sm mb-1">Response Time</p>
                            <p className="font-semibold text-gray-900 text-xs lg:text-sm">127.0.0.1:8000/#</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Criteria() {
    const [criteriaData, setCriteriaData] = useState([
        {
            id: 'C1',
            name: 'Jumlah Penghasilan Orangtua (JPO)',
            weight: 5,
            type: 'COST'
        },
        {
            id: 'C2',
            name: 'Jumlah Tanggungan Orangtua (JTO)',
            weight: 3,
            type: 'BENEFIT'
        },
        {
            id: 'C3',
            name: 'Jarak Tempat Tinggal (JTT)',
            weight: 4,
            type: 'COST'
        },
        {
            id: 'C4',
            name: 'Nilai Rata-rata Ujian Nasional (UN)',
            weight: 2,
            type: 'BENEFIT'
        },
        {
            id: 'C5',
            name: 'Kesanggupan Tinggal di Asrama (AS)',
            weight: 5,
            type: 'BENEFIT'
        },
        {
            id: 'C6',
            name: 'Nilai Rata-rata Rapor (NR)',
            weight: 4,
            type: 'BENEFIT'
        },
        {
            id: 'C7',
            name: 'Prestasi Akademis (PA)',
            weight: 5,
            type: 'BENEFIT'
        },
        {
            id: 'C8',
            name: 'Prestasi Non Akademis (PNA)',
            weight: 5,
            type: 'BENEFIT'
        },
        {
            id: 'C9',
            name: 'Ketua Organisasi (KO)',
            weight: 4,
            type: 'BENEFIT'
        }
    ]);

    const handleAddCriteria = () => {
        // Logic untuk menambah kriteria baru
        console.log('Add new criteria');
    };

    const handleUpdateCriteria = (id) => {
        // Logic untuk update kriteria
        console.log('Update criteria:', id);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kriteria - DSS RKS" />

            <div className="p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Kriteria</h1>
                        <p className="text-gray-600">Kelola kriteria untuk analisis TOPSIS</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={handleAddCriteria}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                            </svg>
                            TAMBAHKAN KRITERIA
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    {/* Total Kriteria */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Total Kriteria</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{criteriaData.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Kriteria Cost */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Kriteria Cost</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {criteriaData.filter(item => item.type === 'COST').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Kriteria Benefit */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Kriteria Benefit</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {criteriaData.filter(item => item.type === 'BENEFIT').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Rata-rata Bobot */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Rata-rata Bobot</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {(criteriaData.reduce((sum, item) => sum + item.weight, 0) / criteriaData.length).toFixed(1)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">Tabel Kriteria</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NO
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NAMA CRITERIA
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        BOBOT
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        TYPE
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {criteriaData.map((criteria, index) => (
                                    <tr key={criteria.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {criteria.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {criteria.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                                            {criteria.weight}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                criteria.type === 'COST'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {criteria.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleUpdateCriteria(criteria.id)}
                                                className="inline-flex items-center px-4 py-2 border border-purple-300 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                                            >
                                                UPDATE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div>
                                Menampilkan {criteriaData.length} kriteria
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>Total Bobot:</span>
                                <span className="font-semibold text-gray-900">
                                    {criteriaData.reduce((sum, item) => sum + item.weight, 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Cards */}
                <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Cost vs Benefit Info */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Jenis Kriteria</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <span className="text-sm">COST (Semakin kecil semakin baik)</span>
                                </div>
                                <span className="text-sm font-semibold">
                                    {criteriaData.filter(item => item.type === 'COST').length} kriteria
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    <span className="text-sm">BENEFIT (Semakin besar semakin baik)</span>
                                </div>
                                <span className="text-sm font-semibold">
                                    {criteriaData.filter(item => item.type === 'BENEFIT').length} kriteria
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Weight Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Bobot</h3>
                        <div className="space-y-3">
                            {[...new Set(criteriaData.map(item => item.weight))].sort((a, b) => b - a).map(weight => (
                                <div key={weight} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Bobot {weight}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {criteriaData.filter(item => item.weight === weight).length} kriteria
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

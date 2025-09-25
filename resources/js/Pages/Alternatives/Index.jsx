// resources/js/Pages/Alternatives/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ alternatives, flash }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAlternative, setSelectedAlternative] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form untuk tambah alternatif
    const { data: addData, setData: setAddData, post, processing: addProcessing, errors: addErrors, reset: resetAdd } = useForm({
        code: '',
        name: ''
    });

    // Form untuk edit alternatif
    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        code: '',
        name: ''
    });

    // Filter alternatif berdasarkan search term
    const filteredAlternatives = useMemo(() => {
        if (!searchTerm) return alternatives;

        return alternatives.filter(alternative =>
            alternative.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alternative.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [alternatives, searchTerm]);

    const handleAddAlternative = () => {
        setShowAddModal(true);
        resetAdd();
    };

    const handleEditAlternative = (alternative) => {
        setSelectedAlternative(alternative);
        setEditData({
            code: alternative.code,
            name: alternative.name
        });
        setShowEditModal(true);
    };

    const handleDeleteAlternative = (alternative) => {
        setSelectedAlternative(alternative);
        setShowDeleteModal(true);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        post(route('alternatives.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                resetAdd();
            }
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('alternatives.update', selectedAlternative.id), {
            onSuccess: () => {
                setShowEditModal(false);
                resetEdit();
            }
        });
    };

    const confirmDelete = () => {
        router.delete(route('alternatives.destroy', selectedAlternative.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
            }
        });
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    // Statistik berdasarkan data real (menggunakan data asli, bukan filtered)
    const totalAlternatives = alternatives.length;

    // Group alternatives by first letter of code for better organization
    const alternativesByLetter = alternatives.reduce((acc, alt) => {
        const firstLetter = alt.code.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = 0;
        }
        acc[firstLetter]++;
        return acc;
    }, {});

    const mostCommonLetter = Object.entries(alternativesByLetter).sort((a, b) => b[1] - a[1])[0];

    return (
        <AuthenticatedLayout>
            <Head title="Alternatif - DSS RKS" />

            <div className="p-4 lg:p-6">
                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {flash.success}
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Opsi Kebijakan</h1>
                        <p className="text-gray-600">Kelola opsi kebijakan untuk analisis TOPSIS</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={handleAddAlternative}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium text-sm rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                            </svg>
                            TAMBAHKAN OPSI
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    {/* Total Alternatif */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Total Alternatif</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{totalAlternatives}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Kode Terpendek */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Kode Terpendek</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {totalAlternatives > 0 ? Math.min(...alternatives.map(a => a.code.length)) : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Kode Terpanjang */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Kode Terpanjang</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {totalAlternatives > 0 ? Math.max(...alternatives.map(a => a.code.length)) : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Huruf Terbanyak */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium mb-2">Awalan Terbanyak</p>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {mostCommonLetter ? mostCommonLetter[0] : '-'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {mostCommonLetter ? `${mostCommonLetter[1]} alternatif` : 'Belum ada data'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900">Tabel Opsi Kebijakan</h2>

                            {/* Search Bar */}
                            <div className="relative w-full sm:w-96 lg:w-[420px]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan kode atau nama opsi kebijakan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        title="Hapus pencarian"
                                    >
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Search Results Info */}
                        {searchTerm && (
                            <div className="mt-3 text-sm text-gray-600">
                                Menampilkan {filteredAlternatives.length} dari {alternatives.length} alternatif untuk "{searchTerm}"
                                {filteredAlternatives.length === 0 && (
                                    <span className="text-red-600 ml-1">- Tidak ada data yang ditemukan</span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NO
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        KODE
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NAMA Opsi Kebijakan
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        AKSI
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAlternatives.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            {searchTerm ? (
                                                <div>
                                                    <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                    </svg>
                                                    <p>Tidak ada alternatif yang cocok dengan pencarian "{searchTerm}"</p>
                                                    <button
                                                        onClick={clearSearch}
                                                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Hapus filter pencarian
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                    </svg>
                                                    <p>Belum ada alternatif yang ditambahkan</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAlternatives.map((alternative, index) => (
                                        <tr key={alternative.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                {searchTerm ? (
                                                    <span dangerouslySetInnerHTML={{
                                                        __html: alternative.code.replace(
                                                            new RegExp(`(${searchTerm})`, 'gi'),
                                                            '<mark class="bg-yellow-200">$1</mark>'
                                                        )
                                                    }} />
                                                ) : (
                                                    alternative.code
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {searchTerm ? (
                                                    <span dangerouslySetInnerHTML={{
                                                        __html: alternative.name.replace(
                                                            new RegExp(`(${searchTerm})`, 'gi'),
                                                            '<mark class="bg-yellow-200">$1</mark>'
                                                        )
                                                    }} />
                                                ) : (
                                                    alternative.name
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEditAlternative(alternative)}
                                                        className="inline-flex items-center px-3 py-1 border border-blue-300 text-blue-600 rounded text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-colors"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAlternative(alternative)}
                                                        className="inline-flex items-center px-3 py-1 border border-red-300 text-red-600 rounded text-xs font-medium hover:bg-red-50 hover:border-red-400 transition-colors"
                                                    >
                                                        HAPUS
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div>
                                {searchTerm ? (
                                    `Menampilkan ${filteredAlternatives.length} dari ${alternatives.length} alternatif`
                                ) : (
                                    `Menampilkan ${alternatives.length} alternatif`
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>Total:</span>
                                <span className="font-semibold text-gray-900">
                                    {alternatives.length} alternatif
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Cards */}
                <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Distribusi Kode */}
                    <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4">Distribusi Kode Alternatif</h3>
                        <div className="space-y-3">
                            {Object.entries(alternativesByLetter).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([letter, count]) => (
                                <div key={letter} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-white bg-opacity-70 rounded-full"></div>
                                        <span className="text-sm">Awalan "{letter}"</span>
                                    </div>
                                    <span className="text-sm font-semibold">{count} alternatif</span>
                                </div>
                            ))}
                            {Object.keys(alternativesByLetter).length === 0 && (
                                <div className="text-center text-white text-opacity-70 py-4">
                                    Belum ada data untuk ditampilkan
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informasi Tambahan */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Alternatif</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Total Alternatif</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    {alternatives.length}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Rata-rata Panjang Nama</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    {alternatives.length > 0
                                        ? (alternatives.reduce((sum, a) => sum + a.name.length, 0) / alternatives.length).toFixed(1)
                                        : 0
                                    } karakter
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Variasi Awalan Kode</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Object.keys(alternativesByLetter).length} jenis
                                </span>
                            </div>

                            {searchTerm && (
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Hasil Pencarian</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {filteredAlternatives.length} alternatif
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Alternatif */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Tambah Alternatif Baru</h3>
                        <form onSubmit={submitAdd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                                <input
                                    type="text"
                                    value={addData.code}
                                    onChange={e => setAddData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: A1"
                                />
                                {addErrors.code && <p className="text-red-500 text-xs mt-1">{addErrors.code}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alternatif</label>
                                <input
                                    type="text"
                                    value={addData.name}
                                    onChange={e => setAddData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nama alternatif"
                                />
                                {addErrors.name && <p className="text-red-500 text-xs mt-1">{addErrors.name}</p>}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addProcessing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {addProcessing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit Alternatif */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Edit Alternatif</h3>
                        <form onSubmit={submitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                                <input
                                    type="text"
                                    value={editData.code}
                                    onChange={e => setEditData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {editErrors.code && <p className="text-red-500 text-xs mt-1">{editErrors.code}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alternatif</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {editProcessing ? 'Menyimpan...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus alternatif <strong>{selectedAlternative?.name}</strong>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

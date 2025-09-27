// resources/js/Pages/Alternatives/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';

export default function Index({ alternatives, flash }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAlternative, setSelectedAlternative] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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

    // Mobile Card Component for alternatives
    const MobileAlternativeCard = ({ alternative, index }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-w-full">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm sm:text-base font-bold text-blue-600">
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
                        </span>
                    </div>
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
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
                    </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <button
                        onClick={() => handleEditAlternative(alternative)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-blue-300 text-blue-600 rounded text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                        EDIT
                    </button>
                    <button
                        onClick={() => handleDeleteAlternative(alternative)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-red-300 text-red-600 rounded text-xs font-medium hover:bg-red-50 hover:border-red-400 transition-colors"
                    >
                        HAPUS
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Layout Container */}
            <div className="fixed inset-0 flex flex-col">
                {/* AuthenticatedLayout with overlay behavior */}
                <AuthenticatedLayout>
                    <Head title="Alternatif - DSS RKS" />

                    {/* Main Content Area - scrollable */}
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            {/* Flash Message */}
                            {flash?.success && (
                                <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-3 sm:py-4 rounded-lg relative">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                        </svg>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm sm:text-base leading-relaxed">{flash.success}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Header */}
                            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Opsi Kebijakan</h1>
                                    <p className="text-sm sm:text-base text-gray-600">Kelola opsi kebijakan untuk analisis TOPSIS</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={handleAddAlternative}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="hidden sm:inline">TAMBAHKAN OPSI</span>
                                        <span className="sm:hidden">TAMBAH</span>
                                    </button>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                {/* Total Alternatif */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Alternatif</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalAlternatives}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Kode Terpendek */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Kode Terpendek</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                                                {totalAlternatives > 0 ? Math.min(...alternatives.map(a => a.code.length)) : 0}
                                            </p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Kode Terpanjang */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Kode Terpanjang</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                                                {totalAlternatives > 0 ? Math.max(...alternatives.map(a => a.code.length)) : 0}
                                            </p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Huruf Terbanyak */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Awalan Terbanyak</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                                                {mostCommonLetter ? mostCommonLetter[0] : '-'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {mostCommonLetter ? `${mostCommonLetter[1]} alternatif` : 'Belum ada data'}
                                            </p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Table Section */}
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Tabel Opsi Kebijakan</h2>

                                        {/* Search Bar */}
                                        <div className="relative w-full sm:w-72 lg:w-96">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Cari berdasarkan kode atau nama..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                            />
                                            {searchTerm && (
                                                <button
                                                    onClick={clearSearch}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    title="Hapus pencarian"
                                                >
                                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Search Results Info */}
                                    {searchTerm && (
                                        <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                                            Menampilkan {filteredAlternatives.length} dari {alternatives.length} alternatif untuk "{searchTerm}"
                                            {filteredAlternatives.length === 0 && (
                                                <span className="text-red-600 ml-1">- Tidak ada data yang ditemukan</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Desktop/Tablet Table View */}
                                <div className="hidden md:block">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        NO
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        KODE
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        NAMA OPSI KEBIJAKAN
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        AKSI
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredAlternatives.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-center text-gray-500">
                                                            {searchTerm ? (
                                                                <div>
                                                                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                                    </svg>
                                                                    <p className="text-sm sm:text-base mb-2">Tidak ada alternatif yang cocok dengan pencarian "{searchTerm}"</p>
                                                                    <button
                                                                        onClick={clearSearch}
                                                                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                                                                    >
                                                                        Hapus filter pencarian
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                                    </svg>
                                                                    <p className="text-sm sm:text-base">Belum ada alternatif yang ditambahkan</p>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    filteredAlternatives.map((alternative, index) => (
                                                        <tr key={alternative.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-blue-600">
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
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
                                                                <div className="truncate" title={alternative.name}>
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
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditAlternative(alternative)}
                                                                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-blue-300 text-blue-600 rounded text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-colors"
                                                                    >
                                                                        EDIT
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteAlternative(alternative)}
                                                                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-red-300 text-red-600 rounded text-xs font-medium hover:bg-red-50 hover:border-red-400 transition-colors"
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
                                </div>

                                {/* Mobile Card View */}
                                <div className="md:hidden">
                                    {filteredAlternatives.length === 0 ? (
                                        <div className="p-4 sm:p-6 text-center text-gray-500">
                                            {searchTerm ? (
                                                <div>
                                                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                    </svg>
                                                    <p className="text-sm sm:text-base mb-2">Tidak ada alternatif yang cocok dengan pencarian "{searchTerm}"</p>
                                                    <button
                                                        onClick={clearSearch}
                                                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                                                    >
                                                        Hapus filter pencarian
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                    </svg>
                                                    <p className="text-sm sm:text-base">Belum ada alternatif yang ditambahkan</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-3 sm:p-4">
                                            <div className="space-y-0">
                                                {filteredAlternatives.map((alternative, index) => (
                                                    <MobileAlternativeCard key={alternative.id} alternative={alternative} index={index} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Table Footer */}
                                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
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
                            <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                {/* Distribusi Kode */}
                                <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
                                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Distribusi Kode Alternatif</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        {Object.entries(alternativesByLetter).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([letter, count]) => (
                                            <div key={letter} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white bg-opacity-70 rounded-full flex-shrink-0"></div>
                                                    <span className="text-xs sm:text-sm">Awalan "{letter}"</span>
                                                </div>
                                                <span className="text-xs sm:text-sm font-semibold">{count} alternatif</span>
                                            </div>
                                        ))}
                                        {Object.keys(alternativesByLetter).length === 0 && (
                                            <div className="text-center text-white text-opacity-70 py-3 sm:py-4">
                                                <p className="text-xs sm:text-sm">Belum ada data untuk ditampilkan</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Informasi Tambahan */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Statistik Alternatif</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-xs sm:text-sm text-gray-600">Total Alternatif</span>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                                {alternatives.length}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-xs sm:text-sm text-gray-600">Rata-rata Panjang Nama</span>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                                {alternatives.length > 0
                                                    ? (alternatives.reduce((sum, a) => sum + a.name.length, 0) / alternatives.length).toFixed(1)
                                                    : 0
                                                } karakter
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-xs sm:text-sm text-gray-600">Variasi Awalan Kode</span>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                                {Object.keys(alternativesByLetter).length} jenis
                                            </span>
                                        </div>

                                        {searchTerm && (
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                                                    <span className="text-xs sm:text-sm text-gray-600">Hasil Pencarian</span>
                                                </div>
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                                    {filteredAlternatives.length} alternatif
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>

            {/* Modal Tambah Alternatif */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tambah Alternatif Baru</h3>
                        <form onSubmit={submitAdd}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Kode</label>
                                <input
                                    type="text"
                                    value={addData.code}
                                    onChange={e => setAddData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: A1"
                                />
                                {addErrors.code && <p className="text-red-500 text-xs mt-1">{addErrors.code}</p>}
                            </div>
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Nama Alternatif</label>
                                <input
                                    type="text"
                                    value={addData.name}
                                    onChange={e => setAddData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nama alternatif"
                                />
                                {addErrors.name && <p className="text-red-500 text-xs mt-1">{addErrors.name}</p>}
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addProcessing}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Edit Alternatif</h3>
                        <form onSubmit={submitEdit}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Kode</label>
                                <input
                                    type="text"
                                    value={editData.code}
                                    onChange={e => setEditData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {editErrors.code && <p className="text-red-500 text-xs mt-1">{editErrors.code}</p>}
                            </div>
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Nama Alternatif</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Konfirmasi Hapus</h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                            Apakah Anda yakin ingin menghapus alternatif <strong>{selectedAlternative?.name}</strong>?
                        </p>
                        <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

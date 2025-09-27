// resources/js/Pages/Criterias/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ criterias, flash }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCriteria, setSelectedCriteria] = useState(null);
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

    // Form untuk tambah kriteria
    const { data: addData, setData: setAddData, post, processing: addProcessing, errors: addErrors, reset: resetAdd } = useForm({
        code: '',
        name: '',
        type: 'benefit',
        weight: ''
    });

    // Form untuk edit kriteria
    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        code: '',
        name: '',
        type: 'benefit',
        weight: ''
    });

    const handleAddCriteria = () => {
        setShowAddModal(true);
        resetAdd();
    };

    const handleEditCriteria = (criteria) => {
        setSelectedCriteria(criteria);
        setEditData({
            code: criteria.code,
            name: criteria.name,
            type: criteria.type,
            weight: criteria.weight
        });
        setShowEditModal(true);
    };

    const handleDeleteCriteria = (criteria) => {
        setSelectedCriteria(criteria);
        setShowDeleteModal(true);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        post(route('criterias.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                resetAdd();
            }
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('criterias.update', selectedCriteria.id), {
            onSuccess: () => {
                setShowEditModal(false);
                resetEdit();
            }
        });
    };

    const confirmDelete = () => {
        router.delete(route('criterias.destroy', selectedCriteria.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
            }
        });
    };

    // Statistik berdasarkan data real
    const totalCriteria = criterias.length;
    const costCriteria = criterias.filter(c => c.type === 'cost').length;
    const benefitCriteria = criterias.filter(c => c.type === 'benefit').length;
    const averageWeight = totalCriteria > 0 ? (criterias.reduce((sum, c) => sum + parseFloat(c.weight), 0) / totalCriteria).toFixed(1) : 0;

    // Mobile Card Component for criterias
    const MobileCriteriaCard = ({ criteria, index }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-w-full">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm sm:text-base font-bold text-purple-600">{criteria.code}</span>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            criteria.type === 'cost'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {criteria.type.toUpperCase()}
                        </span>
                    </div>
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed break-words mb-2">
                        {criteria.name}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Bobot:</span>
                        <span className="text-sm font-semibold text-gray-900">{criteria.weight}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <button
                        onClick={() => handleEditCriteria(criteria)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-purple-300 text-purple-600 rounded text-xs font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                    >
                        EDIT
                    </button>
                    <button
                        onClick={() => handleDeleteCriteria(criteria)}
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
                    <Head title="Kriteria - DSS RKS" />

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
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Kriteria</h1>
                                    <p className="text-sm sm:text-base text-gray-600">Kelola kriteria untuk analisis TOPSIS</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={handleAddCriteria}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="hidden sm:inline">TAMBAHKAN KRITERIA</span>
                                        <span className="sm:hidden">TAMBAH</span>
                                    </button>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                {/* Total Kriteria */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Kriteria</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalCriteria}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Kriteria Cost */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Kriteria Cost</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{costCriteria}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Kriteria Benefit */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Kriteria Benefit</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{benefitCriteria}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Rata-rata Bobot */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Rata-rata Bobot</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{averageWeight}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
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
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Tabel Kriteria</h2>
                                </div>

                                {/* Desktop/Tablet Table View */}
                                <div className="hidden md:block">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        KODE
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        NAMA KRITERIA
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        BOBOT
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        TIPE
                                                    </th>
                                                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        AKSI
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {criterias.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-center text-gray-500">
                                                            <div>
                                                                <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                                                </svg>
                                                                <p className="text-sm sm:text-base">Belum ada kriteria yang ditambahkan</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    criterias.map((criteria, index) => (
                                                        <tr key={criteria.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                                                {criteria.code}
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 max-w-[150px] sm:max-w-[200px] lg:max-w-[300px]">
                                                                <div className="truncate" title={criteria.name}>
                                                                    {criteria.name}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-center text-xs sm:text-sm font-semibold text-gray-900">
                                                                {criteria.weight}
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                                <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    criteria.type === 'cost'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : 'bg-green-100 text-green-700'
                                                                }`}>
                                                                    {criteria.type.toUpperCase()}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                                                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditCriteria(criteria)}
                                                                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-purple-300 text-purple-600 rounded text-xs font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                                                                    >
                                                                        EDIT
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteCriteria(criteria)}
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
                                    {criterias.length === 0 ? (
                                        <div className="p-4 sm:p-6 text-center text-gray-500">
                                            <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                            <p className="text-sm sm:text-base">Belum ada kriteria yang ditambahkan</p>
                                        </div>
                                    ) : (
                                        <div className="p-3 sm:p-4">
                                            <div className="space-y-0">
                                                {criterias.map((criteria, index) => (
                                                    <MobileCriteriaCard key={criteria.id} criteria={criteria} index={index} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Table Footer */}
                                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
                                        <div>
                                            Menampilkan {criterias.length} kriteria
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>Total Bobot:</span>
                                            <span className="font-semibold text-gray-900">
                                                {criterias.reduce((sum, c) => sum + parseFloat(c.weight), 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Information Cards */}
                            <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                {/* Cost vs Benefit Info */}
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
                                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Jenis Kriteria</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full flex-shrink-0"></div>
                                                <span className="text-xs sm:text-sm">COST (Semakin kecil semakin baik)</span>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold">{costCriteria} kriteria</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                                                <span className="text-xs sm:text-sm">BENEFIT (Semakin besar semakin baik)</span>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold">{benefitCriteria} kriteria</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Weight Distribution */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Distribusi Bobot</h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        {criterias.length > 0 ? (
                                            [...new Set(criterias.map(c => parseFloat(c.weight)))].sort((a, b) => b - a).map(weight => (
                                                <div key={weight} className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                                                        <span className="text-xs sm:text-sm text-gray-600">Bobot {weight}</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                                        {criterias.filter(c => parseFloat(c.weight) === weight).length} kriteria
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-gray-500 py-3 sm:py-4">
                                                <p className="text-xs sm:text-sm">Belum ada data untuk ditampilkan</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>

            {/* Modal Tambah Kriteria */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tambah Kriteria Baru</h3>
                        <form onSubmit={submitAdd}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Kode</label>
                                <input
                                    type="text"
                                    value={addData.code}
                                    onChange={e => setAddData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Contoh: C1"
                                />
                                {addErrors.code && <p className="text-red-500 text-xs mt-1">{addErrors.code}</p>}
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Nama Kriteria</label>
                                <input
                                    type="text"
                                    value={addData.name}
                                    onChange={e => setAddData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Nama kriteria"
                                />
                                {addErrors.name && <p className="text-red-500 text-xs mt-1">{addErrors.name}</p>}
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Tipe</label>
                                <select
                                    value={addData.type}
                                    onChange={e => setAddData('type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="benefit">Benefit</option>
                                    <option value="cost">Cost</option>
                                </select>
                                {addErrors.type && <p className="text-red-500 text-xs mt-1">{addErrors.type}</p>}
                            </div>
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Bobot</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={addData.weight}
                                    onChange={e => setAddData('weight', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="0"
                                />
                                {addErrors.weight && <p className="text-red-500 text-xs mt-1">{addErrors.weight}</p>}
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
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm"
                                >
                                    {addProcessing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit Kriteria */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Edit Kriteria</h3>
                        <form onSubmit={submitEdit}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Kode</label>
                                <input
                                    type="text"
                                    value={editData.code}
                                    onChange={e => setEditData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.code && <p className="text-red-500 text-xs mt-1">{editErrors.code}</p>}
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Nama Kriteria</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Tipe</label>
                                <select
                                    value={editData.type}
                                    onChange={e => setEditData('type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="benefit">Benefit</option>
                                    <option value="cost">Cost</option>
                                </select>
                                {editErrors.type && <p className="text-red-500 text-xs mt-1">{editErrors.type}</p>}
                            </div>
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Bobot</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={editData.weight}
                                    onChange={e => setEditData('weight', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.weight && <p className="text-red-500 text-xs mt-1">{editErrors.weight}</p>}
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
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm"
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
                            Apakah Anda yakin ingin menghapus kriteria <strong>{selectedCriteria?.name}</strong>?
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

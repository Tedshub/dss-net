// resources/js/Pages/Criterias/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ criterias, flash }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCriteria, setSelectedCriteria] = useState(null);

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

    return (
        <AuthenticatedLayout>
            <Head title="Kriteria - DSS RKS" />

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
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{totalCriteria}</p>
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
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{costCriteria}</p>
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
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{benefitCriteria}</p>
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
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{averageWeight}</p>
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
                                        KODE
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NAMA KRITERIA
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        BOBOT
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        TIPE
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        AKSI
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {criterias.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            Belum ada kriteria yang ditambahkan
                                        </td>
                                    </tr>
                                ) : (
                                    criterias.map((criteria, index) => (
                                        <tr key={criteria.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {criteria.code}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {criteria.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                                                {criteria.weight}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                    criteria.type === 'cost'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {criteria.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEditCriteria(criteria)}
                                                        className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-600 rounded text-xs font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCriteria(criteria)}
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
                                <span className="text-sm font-semibold">{costCriteria} kriteria</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    <span className="text-sm">BENEFIT (Semakin besar semakin baik)</span>
                                </div>
                                <span className="text-sm font-semibold">{benefitCriteria} kriteria</span>
                            </div>
                        </div>
                    </div>

                    {/* Weight Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Bobot</h3>
                        <div className="space-y-3">
                            {[...new Set(criterias.map(c => parseFloat(c.weight)))].sort((a, b) => b - a).map(weight => (
                                <div key={weight} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Bobot {weight}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {criterias.filter(c => parseFloat(c.weight) === weight).length} kriteria
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Kriteria */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Tambah Kriteria Baru</h3>
                        <form onSubmit={submitAdd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                                <input
                                    type="text"
                                    value={addData.code}
                                    onChange={e => setAddData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Contoh: C1"
                                />
                                {addErrors.code && <p className="text-red-500 text-xs mt-1">{addErrors.code}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kriteria</label>
                                <input
                                    type="text"
                                    value={addData.name}
                                    onChange={e => setAddData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Nama kriteria"
                                />
                                {addErrors.name && <p className="text-red-500 text-xs mt-1">{addErrors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                                <select
                                    value={addData.type}
                                    onChange={e => setAddData('type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="benefit">Benefit</option>
                                    <option value="cost">Cost</option>
                                </select>
                                {addErrors.type && <p className="text-red-500 text-xs mt-1">{addErrors.type}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bobot</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={addData.weight}
                                    onChange={e => setAddData('weight', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="0"
                                />
                                {addErrors.weight && <p className="text-red-500 text-xs mt-1">{addErrors.weight}</p>}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addProcessing}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Kriteria</h3>
                        <form onSubmit={submitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                                <input
                                    type="text"
                                    value={editData.code}
                                    onChange={e => setEditData('code', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.code && <p className="text-red-500 text-xs mt-1">{editErrors.code}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kriteria</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                                <select
                                    value={editData.type}
                                    onChange={e => setEditData('type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="benefit">Benefit</option>
                                    <option value="cost">Cost</option>
                                </select>
                                {editErrors.type && <p className="text-red-500 text-xs mt-1">{editErrors.type}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bobot</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={editData.weight}
                                    onChange={e => setEditData('weight', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {editErrors.weight && <p className="text-red-500 text-xs mt-1">{editErrors.weight}</p>}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
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
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin menghapus kriteria <strong>{selectedCriteria?.name}</strong>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

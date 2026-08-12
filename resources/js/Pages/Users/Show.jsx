import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, User, Mail, School, Users, Trash2, Edit, Search, AlertTriangle } from "lucide-react";
import Modal from "@/Components/Modal";

export default function UserShow({ schoolUser, committees }) {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

    const openDeleteModal = (id, name) => setDeleteTarget({ id, name });
    const closeDeleteModal = () => setDeleteTarget(null);

    const confirmDelete = () => {
        if (deleteTarget) {
            router.delete(route("users.destroy", deleteTarget.id), {
                onFinish: () => closeDeleteModal(),
            });
        }
    };

    const filteredCommittees = committees.filter(committee => 
        committee.name.toLowerCase().includes(search.toLowerCase()) ||
        committee.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Head title={`Detail Sekolah - ${schoolUser.school_name}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 h-16">
                            {/* Tombol Back */}
                            <Link
                                href={route("users.index")}
                                className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200 flex-shrink-0"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
            
                            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2 truncate">
                                <School className="h-5 w-5 text-purple-600 flex-shrink-0" />
                                <span className="truncate">Detail Sekolah</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-6 sm:py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* School / Guest Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                Informasi Kepala Sekolah
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                                        <School className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Nama Sekolah</p>
                                        <p className="text-sm sm:text-base text-gray-900 font-semibold truncate">{schoolUser.school_name || "-"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                                        <User className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Nama Kepala Sekolah</p>
                                        <p className="text-sm sm:text-base text-gray-900 truncate">{schoolUser.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                                        <Mail className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Email</p>
                                        <p className="text-sm sm:text-base text-gray-900 truncate">{schoolUser.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Committees List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Card Header with Search Bar */}
                            <div className="p-4 sm:p-6 border-b border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                                        Daftar Stakeholder
                                    </h2>
                                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0">
                                        {filteredCommittees.length} Stakeholder
                                    </span>
                                </div>
                                
                                {/* Search Bar */}
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari stakeholder..."
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    {search && (
                                        <button
                                            onClick={() => setSearch('')}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Desktop View Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Stakeholder
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Bergabung
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCommittees.length > 0 ? (
                                            filteredCommittees.map((committee) => (
                                                <tr key={committee.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold uppercase">
                                                                {committee.name.charAt(0)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {committee.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {committee.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(committee.created_at).toLocaleDateString("id-ID")}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Link
                                                                href={route("users.edit", committee.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                                                title="Edit stakeholder"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => openDeleteModal(committee.id, committee.name)}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition-colors"
                                                                title="Hapus stakeholder"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                                    {search ? `Tidak ada stakeholder yang cocok dengan pencarian "${search}"` : "Belum ada stakeholder untuk sekolah ini."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View Card List */}
                            <div className="block md:hidden divide-y divide-gray-100">
                                {filteredCommittees.length > 0 ? (
                                    filteredCommittees.map((committee) => (
                                        <div key={committee.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-3 gap-2">
                                                <div className="flex items-center min-w-0">
                                                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold uppercase flex-shrink-0 text-sm">
                                                        {committee.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-3 min-w-0">
                                                        <h4 className="text-sm font-semibold text-gray-900 truncate">{committee.name}</h4>
                                                        <p className="text-xs text-gray-500 truncate">{committee.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4 pl-12">
                                                <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Tanggal Bergabung</span>
                                                <span className="text-sm text-gray-800 font-medium">
                                                    {new Date(committee.created_at).toLocaleDateString("id-ID")}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                                                <Link
                                                    href={route("users.edit", committee.id)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(committee.id, committee.name)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    <span>Hapus</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        {search ? `Tidak ada stakeholder yang cocok dengan pencarian "${search}"` : "Belum ada stakeholder untuk sekolah ini."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <Modal show={!!deleteTarget} onClose={closeDeleteModal} maxWidth="sm">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">
                                Konfirmasi Hapus
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        Apakah Anda yakin ingin menghapus Stakeholder{' '}
                        "<span className="font-semibold text-red-600">{deleteTarget?.name}</span>"?
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={closeDeleteModal}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors shadow-sm"
                        >
                            Batal
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Ya, Hapus
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

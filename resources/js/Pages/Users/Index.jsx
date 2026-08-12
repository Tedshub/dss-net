import { Head, Link, router, usePage } from "@inertiajs/react";
import { ArrowLeft, Plus, Pencil, Trash2, Search, User, Eye, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Modal from "@/Components/Modal";

export default function UserIndex({ users, filters }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    // State untuk modal konfirmasi hapus
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

    const [search, setSearch] = useState(filters?.search || '');
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("users.index"),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <>
            <Head title={isAdmin ? "Daftar Sekolah" : "Manajemen Stakeholder"} />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-0 sm:h-16 gap-3">
                            
                            {/* Bagian Kiri: Tombol Back + Judul */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("dashboard")}
                                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200 flex-shrink-0"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </Link>
                
                                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2 truncate">
                                    <User className="h-5 w-5 text-purple-600 flex-shrink-0" />
                                    <span className="truncate">{isAdmin ? "Daftar Sekolah (Kepala Sekolah)" : "Daftar Stakeholder"}</span>
                                </h1>
                            </div>
                
                            {/* Bagian Kanan: Tombol Add User */}
                            {!isAdmin && (
                                <Link
                                    href={route("users.create")}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 shadow-sm self-start sm:self-auto"
                                >
                                    <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                                    Tambah Stakeholder
                                </Link>
                            )}
                            
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-6 sm:py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Table Container */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Search Bar Area */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3">
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">
                                    {search && users.total > 0 && (
                                        <span>Menampilkan hasil pencarian untuk "{search}"</span>
                                    )}
                                </div>
                                <div className="relative w-full sm:w-72">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={`Cari ${isAdmin ? 'sekolah' : 'stakeholder'}...`}
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

                            {/* Table Desktop View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Lengkap
                                            </th>
                                            {isAdmin && (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama Sekolah
                                                </th>
                                            )}
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data && users.data.length > 0 ? (
                                            users.data.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold uppercase">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900 font-medium">
                                                                {user.school_name || "-"}
                                                            </div>
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'guest' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                            {user.role === 'guest' ? 'Kepala Sekolah' : 'Stakeholder'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-3">
                                                            {isAdmin && (
                                                                <Link
                                                                    href={route("users.show", user.id)}
                                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-md hover:bg-blue-100 transition-colors"
                                                                    title="Lihat Detail"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            )}
                                                            <Link
                                                                href={route("users.edit", user.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => openDeleteModal(user.id, user.name)}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition-colors"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-10 text-center text-gray-500">
                                                    {search ? `Tidak ada hasil untuk pencarian "${search}"` : "Belum ada data user."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View (Card List) */}
                            <div className="block md:hidden divide-y divide-gray-100">
                                {users.data && users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-3 gap-2">
                                                <div className="flex items-center min-w-0">
                                                    <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold uppercase flex-shrink-0 text-sm">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-3 min-w-0">
                                                        <h4 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h4>
                                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full flex-shrink-0 ${user.role === 'guest' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                    {user.role === 'guest' ? 'Kepala Sekolah' : 'Stakeholder'}
                                                </span>
                                            </div>

                                            {isAdmin && (
                                                <div className="mb-4 pl-12">
                                                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Nama Sekolah</span>
                                                    <span className="text-sm text-gray-800 font-medium">{user.school_name || "-"}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                                                {isAdmin && (
                                                    <Link
                                                        href={route("users.show", user.id)}
                                                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>Detail</span>
                                                    </Link>
                                                )}
                                                <Link
                                                    href={route("users.edit", user.id)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(user.id, user.name)}
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
                                        {search ? `Tidak ada hasil untuk pencarian "${search}"` : "Belum ada data user."}
                                    </div>
                                )}
                            </div>

                            {/* Pagination Section */}
                            {users.links && users.links.length > 3 && (
                                <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
                                    <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                                        Menampilkan {users.from || 0} sampai {users.to || 0} dari {users.total} data
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        {users.links.map((link, k) => (
                                            link.url ? (
                                                <Link
                                                    key={k}
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className={`px-2.5 py-1 text-xs sm:text-sm rounded transition-colors ${
                                                        link.active
                                                            ? "bg-purple-600 text-white font-medium"
                                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                                    }`}
                                                />
                                            ) : (
                                                <span
                                                    key={k}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className="px-2.5 py-1 text-xs sm:text-sm rounded bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed"
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
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
                        Apakah Anda yakin ingin menghapus{' '}
                        <span className="font-semibold">
                            {isAdmin ? 'Sekolah' : 'Stakeholder'}
                        </span>
                        {' '}"<span className="font-semibold text-red-600">{deleteTarget?.name}</span>"?
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

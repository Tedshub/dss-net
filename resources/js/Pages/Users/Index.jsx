import { Head, Link, router, usePage } from "@inertiajs/react";
import { ArrowLeft, Plus, Pencil, Trash2, Search, User, Eye } from "lucide-react";

export default function UserIndex({ users }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    // Fungsi untuk menghapus user
    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${isAdmin ? 'Sekolah' : 'Bendahara'} ${name}?`)) {
            router.delete(route("users.destroy", id));
        }
    };

    return (
        <>
            <Head title={isAdmin ? "Daftar Sekolah" : "Manajemen Bendahara"} />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            
                            {/* Bagian Kiri: Tombol Back + Judul */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("dashboard")}
                                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </Link>
                
                                <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <User className="h-5 w-5 text-purple-600" />
                                    {isAdmin ? "Daftar Sekolah (Kepala Sekolah)" : "Daftar Bendahara"}
                                </h1>
                            </div>
                
                            {/* Bagian Kanan: Tombol Add User */}
                            {!isAdmin && (
                                <Link
                                    href={route("users.create")}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 shadow-sm"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah Bendahara
                                </Link>
                            )}
                            
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Table Container */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Optional: Search Bar Area */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-end">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={`Cari ${isAdmin ? 'sekolah' : 'bendahara'}...`}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nama Lengkap
                                            </th>
                                            {isAdmin && (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Nama Sekolah
                                                </th>
                                            )}
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data && users.data.length > 0 ? (
                                            users.data.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold uppercase">
                                                                {user.name.charAt(
                                                                    0,
                                                                )}
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
                                                            {user.role === 'guest' ? 'Kepala Sekolah' : 'Bendahara'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-3">
                                                            {isAdmin && (
                                                                <Link
                                                                    href={route("users.show", user.id)}
                                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-md hover:bg-blue-100 transition-colors"
                                                                    title="Lihat Detail Bendahara"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            )}
                                                            {/* Tombol Edit */}
                                                            <Link
                                                                href={route(
                                                                    "users.edit",
                                                                    user.id,
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>

                                                            {/* Tombol Hapus */}
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user.id,
                                                                        user.name,
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition-colors"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-10 text-center text-gray-500"
                                                >
                                                    Belum ada data user.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Section */}
                            {users.links && (
                                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Menampilkan {users.from} sampai {users.to} dari {users.total} data
                                    </div>
                                    <div className="flex gap-1">
                                        {users.links.map((link, k) => (
                                            // LOGIKA BARU: Cek apakah url ada?
                                            link.url ? (
                                                // Jika URL ada, gunakan component Link
                                                <Link
                                                    key={k}
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className={`px-3 py-1 text-sm rounded ${
                                                        link.active
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                                    }`}
                                                />
                                            ) : (
                                                // Jika URL null (misal: tombol Previous di hal 1), gunakan span biasa
                                                <span
                                                    key={k}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed"
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
        </>
    );
}

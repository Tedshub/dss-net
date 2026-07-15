import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, User, Mail, School, Users, Trash2, Edit } from "lucide-react";

export default function UserShow({ schoolUser, committees }) {
    // Fungsi untuk menghapus komite
    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus komite ${name}?`)) {
            router.delete(route("users.destroy", id));
        }
    };

    return (
        <>
            <Head title={`Detail Sekolah - ${schoolUser.school_name}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            
                            {/* Bagian Kiri: Tombol Back + Judul */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("users.index")}
                                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </Link>
                
                                <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <School className="h-5 w-5 text-purple-600" />
                                    Detail Sekolah
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* School / Guest Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                Informasi Kepala Sekolah
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <School className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Nama Sekolah</p>
                                        <p className="text-base text-gray-900 font-semibold">{schoolUser.school_name || "-"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <User className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Nama Kepala Sekolah</p>
                                        <p className="text-base text-gray-900">{schoolUser.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <Mail className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Email</p>
                                        <p className="text-base text-gray-900">{schoolUser.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Committees List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-white flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    Daftar Komite
                                </h2>
                                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                    {committees.length} Komite
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Komite
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
                                        {committees.length > 0 ? (
                                            committees.map((committee) => (
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
                                                        <Link
                                                            href={route("users.edit", committee.id)}
                                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-md hover:bg-blue-100 transition-colors mr-2 inline-flex"
                                                            title="Edit Komite"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(committee.id, committee.name)}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition-colors inline-flex"
                                                            title="Hapus Komite"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                                    Belum ada komite untuk sekolah ini.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

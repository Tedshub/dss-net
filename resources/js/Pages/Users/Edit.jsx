import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Save, AlertCircle, Shield } from "lucide-react";


export default function Edit({ user }) {
    // Inisialisasi form dengan data user yang ada
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "sub_guest",
        password: "",
        password_confirmation: "",
    });
    const { auth } = usePage().props;
    const currentUserRole = auth.user.role;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Menggunakan method PUT untuk update
        put(route("users.update", user.id), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title={`Edit ${user.name}`} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("users.index")}
                                className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Edit User
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Perbarui informasi pengguna
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            
                            {/* Input Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Input Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                                                <Shield className="w-4 h-4 text-purple-600" />
                                                                Role (Hak Akses)
                                                            </label>
                                                            <select
                                                                                value={data.role}
                                                                                onChange={(e) => setData("role", e.target.value)}
                                                                                className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm bg-white"
                                                                            >
                                                                                {currentUserRole === 'admin' ? (
                                                                                    <>
                                                                                        <option value="admin">Admin</option>
                                                                                        <option value="guest">Kepala Sekolah</option>
                                                                                        <option value="sub_guest">Bendahara</option>
                                                                                    </>
                                                                                ) : currentUserRole === 'guest' && user.role === 'sub_guest' ? (
                                                                                    <option value="sub_guest">Bendahara</option>
                                                                                ) : currentUserRole === 'guest' ? (
                                                                                    <>
                                                                                        <option value="guest">Kepala Sekolah</option>
                                                                                        <option value="sub_guest">Bendahara</option>
                                                                                    </>
                                                                                ) : null}
                                                                            </select>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Admin memiliki akses penuh ke sistem. Kepala Sekolah dan Bendahara hanya memiliki akses terbatas.
                                                            </p>
                                                            {errors.role && (
                                                                <p className="mt-1 text-sm text-red-600">
                                                                    {errors.role}
                                                                </p>
                                                            )}
                                                        </div>
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                    Ubah Password (Opsional)
                                </h3>
                                <div className="space-y-4">
                                    {/* Input Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password Baru
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                            placeholder="Biarkan kosong jika tidak ingin mengubah"
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Input Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Konfirmasi Password Baru
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData("password_confirmation", e.target.value)
                                            }
                                            className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                            placeholder="Ulangi password baru"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                                <Link
                                    href={route("users.index")}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
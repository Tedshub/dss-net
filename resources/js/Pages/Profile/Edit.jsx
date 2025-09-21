import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Edit Profil" />

            {/* Simple layout without navbar and sidebar */}
            <div className="min-h-screen bg-gray-50">
                {/* Header with back button */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Kembali
                                </Link>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Edit Profil
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-6">
                            {/* Profile Information Card */}
                            <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-purple-500">
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Informasi Profil
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Perbarui informasi profil dan alamat email akun Anda.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-2xl"
                                    />
                                </div>
                            </div>

                            {/* Password Update Card */}
                            <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-blue-500">
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Ubah Kata Sandi
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk keamanan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6">
                                    <UpdatePasswordForm className="max-w-2xl" />
                                </div>
                            </div>

                            {/* Delete Account Card */}
                            <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-red-500">
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-red-600">
                                                Hapus Akun
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6">
                                    <DeleteUserForm className="max-w-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

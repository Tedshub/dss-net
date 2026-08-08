import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Save,  Shield} from "lucide-react";
import { useState } from "react";


export default function Create() {
    // Menggunakan useForm dari Inertia untuk handle state form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });
    const { auth } = usePage().props;
    const currentUserRole = auth.user.role;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasSymbol: false,
    });
    const [passwordMatch, setPasswordMatch] = useState(null);

    const validatePassword = (password) => {
        const validation = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
        };
        setPasswordValidation(validation);
        return Object.values(validation).every(Boolean);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setData('password', password);
        validatePassword(password);
        if (data.password_confirmation) {
            setPasswordMatch(password === data.password_confirmation);
        }
    };

    const handlePasswordConfirmationChange = (e) => {
        const confirmation = e.target.value;
        setData('password_confirmation', confirmation);
        if (data.password) {
            setPasswordMatch(data.password === confirmation);
        }
    };

    const EyeIcon = ({ show, onClick }) => (
        <button
            type="button"
            onClick={onClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
            {show ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            )}
        </button>
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(data.password) || passwordMatch === false) {
            return;
        }

        post(route("users.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Tambah User Baru" />

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
                                    Tambah User
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Buat akun pengguna baru
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
                                    placeholder="Masukkan nama lengkap"
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
                                    placeholder="contoh@email.com"
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
                                                                                {currentUserRole === 'admin' && (
                                                                                    <option value="admin">Admin</option>
                                                                                )}
                                                                                {(currentUserRole === 'admin' || currentUserRole === 'guest') && (
                                                                                    <>
                                                                                        <option value="sub_guest">Bendahara</option>
                                                                                    </>
                                                                                )}
                                                                            </select>
                                                            {errors.role && (
                                                                <p className="mt-1 text-sm text-red-600">
                                                                    {errors.role}
                                                                </p>
                                                            )}
                                                        </div>
                            {/* Input Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        onChange={handlePasswordChange}
                                        className="w-full pr-10 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                        placeholder="Minimal 8 karakter"
                                    />
                                    <EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
                                </div>
                                {data.password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="text-xs text-gray-500 mb-2 font-medium">Persyaratan kata sandi:</div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                                                <span className="mr-1">{passwordValidation.minLength ? '✓' : '✗'}</span>Min. 8 karakter
                                            </div>
                                            <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                                                <span className="mr-1">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>Huruf besar
                                            </div>
                                            <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                                                <span className="mr-1">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>Huruf kecil
                                            </div>
                                            <div className={`flex items-center ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-500'}`}>
                                                <span className="mr-1">{passwordValidation.hasSymbol ? '✓' : '✗'}</span>Simbol (!@#$%)
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Input Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswordConfirmation ? "text" : "password"}
                                        value={data.password_confirmation}
                                        onChange={handlePasswordConfirmationChange}
                                        className="w-full pr-10 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 shadow-sm"
                                        placeholder="Ulangi password"
                                    />
                                    <EyeIcon show={showPasswordConfirmation} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} />
                                </div>
                                {data.password_confirmation && (
                                    <div className="mt-2">
                                        <div className={`flex items-center text-xs font-medium ${
                                            passwordMatch === true ? 'text-green-600' :
                                            passwordMatch === false ? 'text-red-500' : 'text-gray-500'
                                        }`}>
                                            <span className="mr-1">
                                                {passwordMatch === true ? '✓' : passwordMatch === false ? '✗' : '⚬'}
                                            </span>
                                            {passwordMatch === true ? 'Password cocok' :
                                             passwordMatch === false ? 'Password tidak cocok' : 'Konfirmasi password'}
                                        </div>
                                    </div>
                                )}
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
                                    disabled={processing || (data.password && !Object.values(passwordValidation).every(Boolean)) || (data.password_confirmation && passwordMatch === false)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? "Menyimpan..." : "Simpan User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
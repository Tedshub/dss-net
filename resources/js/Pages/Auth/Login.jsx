import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Komponen Eye Icon untuk toggle password visibility
    const EyeIcon = ({ show, onClick }) => (
        <button
            type="button"
            onClick={onClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
        >
            {show ? (
                // Eye Open Icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ) : (
                // Eye Closed Icon (full eye with slash)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            )}
        </button>
    );

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Head title="Masuk - Sistem Pendukung Keputusan RKS" />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600">
                {/* Decorative elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute top-40 right-32 w-48 h-48 bg-pink-400 rounded-full opacity-15 blur-2xl"></div>
                <div className="absolute bottom-32 left-32 w-40 h-40 bg-purple-300 rounded-full opacity-10 blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-25 blur-lg"></div>

                {/* Dot pattern overlay */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-600 rounded"></div>
                    </div>
                    <span className="text-white text-xl font-bold">RKS</span>
                </div>

                <div className="hidden md:flex items-center space-x-8 text-white text-sm">
                    <Link href="/" className="hover:text-purple-200 transition-colors">Beranda</Link>
                </div>
            </nav>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
                <div className="w-full max-w-md">
                    {/* Login card */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang</h1>
                            <p className="text-white/80 text-sm">
                                Masuk untuk mengakses Sistem Pendukung Keputusan RKS
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                                <div className="text-sm font-medium text-green-200">
                                    {status}
                                </div>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="Masukkan alamat email Anda"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2 text-red-300" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                        autoComplete="current-password"
                                        placeholder="Masukkan kata sandi Anda"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <EyeIcon
                                        show={showPassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                <InputError message={errors.password} className="mt-2 text-red-300" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        className="rounded border-white/30 bg-white/10 text-purple-400 focus:ring-purple-400/50"
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ml-3 text-sm text-white/80">
                                        Ingat saya
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-white/80 hover:text-white underline transition-colors"
                                    >
                                        Lupa kata sandi?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Sedang masuk...
                                    </div>
                                ) : (
                                    'Masuk'
                                )}
                            </PrimaryButton>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/60 text-sm">
                                Belum punya akun?{' '}
                                <Link href="/register" className="text-white hover:text-purple-200 underline transition-colors">
                                    Daftar di sini
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Additional info */}
                    <div className="mt-8 text-center">
                        <p className="text-white/60 text-xs">
                            Sistem Pendukung Keputusan RKS - Memberdayakan Keputusan Cerdas
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative illustration - similar to landing page style */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-30">
                <div className="relative w-full h-full">
                    {/* Abstract shapes representing data/analytics */}
                    <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/20 rounded-lg transform rotate-12"></div>
                    <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/15 rounded-lg transform -rotate-6"></div>
                    <div className="absolute bottom-32 right-16 w-12 h-12 bg-white/10 rounded-lg transform rotate-45"></div>

                    {/* Data visualization elements */}
                    <div className="absolute bottom-16 right-32 w-8 h-24 bg-white/20 rounded-t-lg"></div>
                    <div className="absolute bottom-16 right-40 w-8 h-16 bg-white/15 rounded-t-lg"></div>
                    <div className="absolute bottom-16 right-48 w-8 h-20 bg-white/10 rounded-t-lg"></div>
                </div>
            </div>
        </div>
    );
}
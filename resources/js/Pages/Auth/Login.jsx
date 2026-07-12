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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
        <div className="min-h-screen flex bg-white text-black font-sans">
            <Head title="Masuk - Sistem Pendukung Keputusan RKS" />

            {/* Left side: Background from Landing Page */}
            <div 
                className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative items-center justify-center animate-fade-in"
                style={{
                    backgroundImage: "url('/assets/images/home-bg-2.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-12 text-white max-w-2xl text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] mb-6 bg-blue-400/10 backdrop-blur-sm p-6 rounded-2xl leading-tight shadow-lg border border-white/20 inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        RKS adalah cara terbaik untuk membuat keputusan cerdas!
                    </h1>
                </div>
            </div>

            {/* Right side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col px-6 py-6 sm:px-12 md:px-20 relative animate-fade-in-right" style={{ animationDelay: '0.1s' }}>
                {/* Navigation */}
                <nav className="flex justify-between items-center w-full mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center">
                        <img
                            src="/assets/images/dss.png"
                            alt="RKS Logo"
                            className="h-8 sm:h-10 w-auto"
                        />
                    </div>
                    <Link href="/" className="text-gray-500 hover:text-pink-600 transition-colors font-medium text-sm">
                        Kembali ke Beranda
                    </Link>
                </nav>

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
                    <div className="text-left mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Masuk</h1>
                        <p className="text-gray-500 text-sm">
                            Selamat datang kembali! Silakan masukkan detail akun Anda.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                            <div className="text-sm font-medium text-green-600">
                                {status}
                            </div>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="Masukkan alamat email Anda"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-500" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm"
                                    autoComplete="current-password"
                                    placeholder="Masukkan kata sandi Anda"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <EyeIcon
                                    show={showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2 text-red-500" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Ingat saya
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors"
                                >
                                    Lupa kata sandi?
                                </Link>
                            )}
                        </div>

                        <div className="pt-2">
                            <PrimaryButton
                                className="w-full bg-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center disabled:opacity-70"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Memproses...
                                    </div>
                                ) : (
                                    'Masuk'
                                )}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <p className="text-gray-500 text-sm">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-pink-600 hover:text-pink-700 font-semibold transition-colors">
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </div>
                
                <div className="mt-auto pt-8 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
                    <p className="text-gray-400 text-xs">
                        &copy; 2026 Sistem Pendukung Keputusan RKS
                    </p>
                </div>
            </div>
        </div>
    );
}
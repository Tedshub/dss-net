import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasSymbol: false,
    });
    const [passwordMatch, setPasswordMatch] = useState(null);

    // Fungsi untuk validasi password
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
        // Check password match ketika password berubah
        if (data.password_confirmation) {
            setPasswordMatch(password === data.password_confirmation);
        }
    };

    const handlePasswordConfirmationChange = (e) => {
        const confirmation = e.target.value;
        setData('password_confirmation', confirmation);
        // Check password match
        if (data.password) {
            setPasswordMatch(data.password === confirmation);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Validasi password sebelum submit
        if (!validatePassword(data.password)) {
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
            <Head title="Daftar - Sistem Pendukung Keputusan RKS" />

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
                        Bergabunglah dengan RKS untuk keputusan yang lebih baik!
                    </h1>
                </div>
            </div>

            {/* Right side: Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col px-6 py-6 sm:px-12 md:px-20 relative overflow-y-auto animate-fade-in-right" style={{ animationDelay: '0.1s' }}>
                {/* Navigation */}
                <nav className="flex justify-between items-center w-full mb-8 shrink-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
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

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto my-auto py-4">
                    <div className="text-left mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Akun</h1>
                        <p className="text-gray-500 text-sm">
                            Buat akun Anda untuk mengakses Sistem Pendukung Keputusan RKS.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Nama Lengkap"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Masukkan nama lengkap Anda"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 text-red-500" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Alamat Email"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm"
                                autoComplete="username"
                                placeholder="Masukkan alamat email Anda"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                    autoComplete="new-password"
                                    placeholder="Buat kata sandi"
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <EyeIcon
                                    show={showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            
                            {/* Password Requirements */}
                            {data.password && (
                                <div className="mt-2 space-y-1">
                                    <div className="text-xs text-gray-500 mb-2 font-medium">Persyaratan kata sandi:</div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                                            <span className="mr-1">{passwordValidation.minLength ? '✓' : '✗'}</span>
                                            Min. 8 karakter
                                        </div>
                                        <div className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                                            <span className="mr-1">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                                            Huruf besar
                                        </div>
                                        <div className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                                            <span className="mr-1">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                                            Huruf kecil
                                        </div>
                                        <div className={`flex items-center ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-500'}`}>
                                            <span className="mr-1">{passwordValidation.hasSymbol ? '✓' : '✗'}</span>
                                            Simbol (!@#$%)
                                        </div>
                                    </div>
                                </div>
                            )}

                            <InputError message={errors.password} className="mt-2 text-red-500" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Kata Sandi"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showPasswordConfirmation ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm"
                                    autoComplete="new-password"
                                    placeholder="Konfirmasi kata sandi Anda"
                                    onChange={handlePasswordConfirmationChange}
                                    required
                                />
                                <EyeIcon
                                    show={showPasswordConfirmation}
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                />
                            </div>
                            
                            {/* Password Match Indicator */}
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

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="pt-2">
                            <PrimaryButton
                                className="w-full bg-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center disabled:opacity-70"
                                disabled={processing || (data.password && !Object.values(passwordValidation).every(Boolean)) || (data.password_confirmation && passwordMatch === false)}
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Membuat Akun...
                                    </div>
                                ) : (
                                    'Buat Akun'
                                )}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <p className="text-gray-500 text-sm">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="text-pink-600 hover:text-pink-700 font-semibold transition-colors">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <p className="text-gray-400 text-xs text-center leading-relaxed">
                            Dengan membuat akun, Anda menyetujui{' '}
                            <Link href="#" className="text-gray-500 hover:text-gray-700 underline">
                                Syarat Layanan
                            </Link>
                            {' '}dan{' '}
                            <Link href="#" className="text-gray-500 hover:text-gray-700 underline">
                                Kebijakan Privasi
                            </Link>
                            {' '}kami
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 pt-4 text-center shrink-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <p className="text-gray-400 text-xs">
                        &copy; 2026 Sistem Pendukung Keputusan RKS
                    </p>
                </div>
            </div>
        </div>
    );
}

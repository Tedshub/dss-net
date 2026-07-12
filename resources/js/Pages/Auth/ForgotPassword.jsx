import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex bg-white text-black font-sans">
            <Head title="Lupa Kata Sandi - Sistem Pendukung Keputusan RKS" />

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
                        Jangan khawatir, kami akan membantu Anda memulihkan akses!
                    </h1>
                </div>
            </div>

            {/* Right side: Form */}
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lupa Kata Sandi</h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Tidak masalah. Cukup berikan alamat email Anda dan kami akan mengirimkan tautan reset kata sandi.
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
                                isFocused={true}
                                placeholder="Masukkan alamat email Anda"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 text-red-500" />
                        </div>

                        <div className="pt-2">
                            <PrimaryButton
                                className="w-full bg-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center disabled:opacity-70"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Mengirim Email...
                                    </div>
                                ) : (
                                    'Kirim Link Reset Kata Sandi'
                                )}
                            </PrimaryButton>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-gray-500 text-sm">
                                Ingat kata sandi Anda?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
                                >
                                    Kembali ke halaman masuk
                                </Link>
                            </p>
                        </div>
                    </form>
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

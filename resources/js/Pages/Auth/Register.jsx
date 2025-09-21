import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Head title="Daftar - Sistem Pendukung Keputusan RKS" />

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
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Register card */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Bergabung dengan RKS</h1>
                            <p className="text-white/80 text-sm">
                                Buat akun Anda untuk mengakses Sistem Pendukung Keputusan
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nama Lengkap"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                    autoComplete="name"
                                    isFocused={true}
                                    placeholder="Masukkan nama lengkap Anda"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2 text-red-300" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Alamat Email"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                    autoComplete="username"
                                    placeholder="Masukkan alamat email Anda"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 text-red-300" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                    autoComplete="new-password"
                                    placeholder="Buat kata sandi"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2 text-red-300" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Konfirmasi Kata Sandi"
                                    className="text-white/90 font-medium mb-2"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-purple-400/50 transition-all"
                                    autoComplete="new-password"
                                    placeholder="Konfirmasi kata sandi Anda"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 text-red-300"
                                />
                            </div>

                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={processing}
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

                            <div className="text-center pt-4">
                                <p className="text-white/60 text-sm">
                                    Sudah punya akun?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-white hover:text-purple-200 underline font-medium transition-colors"
                                    >
                                        Masuk di sini
                                    </Link>
                                </p>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-white/50 text-xs text-center leading-relaxed">
                                Dengan membuat akun, Anda menyetujui{' '}
                                <Link href="#" className="text-white/70 hover:text-white underline">
                                    Syarat Layanan
                                </Link>
                                {' '}dan{' '}
                                <Link href="#" className="text-white/70 hover:text-white underline">
                                    Kebijakan Privasi
                                </Link>
                                {' '}kami
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

            {/* Decorative illustration - left side for variety */}
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-20">
                <div className="relative w-full h-full">
                    {/* Abstract shapes representing analytics/charts */}
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/15 rounded-xl transform -rotate-12"></div>
                    <div className="absolute bottom-20 left-20 w-18 h-18 bg-white/10 rounded-xl transform rotate-6"></div>
                    <div className="absolute bottom-32 left-16 w-14 h-14 bg-white/20 rounded-lg transform rotate-45"></div>

                    {/* Chart-like elements */}
                    <div className="absolute bottom-16 left-32 flex space-x-2">
                        <div className="w-6 h-20 bg-white/15 rounded-t-lg"></div>
                        <div className="w-6 h-28 bg-white/20 rounded-t-lg"></div>
                        <div className="w-6 h-16 bg-white/10 rounded-t-lg"></div>
                        <div className="w-6 h-24 bg-white/15 rounded-t-lg"></div>
                    </div>

                    {/* Circular progress indicators */}
                    <div className="absolute bottom-32 left-48">
                        <div className="w-16 h-16 border-4 border-white/10 rounded-full relative">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-transparent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side decorative elements */}
            <div className="absolute top-1/4 right-0 w-1/4 h-1/3 opacity-15">
                <div className="relative w-full h-full">
                    {/* Network/connection visualization */}
                    <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-16 right-16 w-2 h-2 bg-white/80 rounded-full"></div>
                    <div className="absolute top-20 right-12 w-2 h-2 bg-white/60 rounded-full"></div>
                    <div className="absolute top-12 right-20 w-2 h-2 bg-white/70 rounded-full"></div>

                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <line x1="20" y1="30" x2="40" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                        <line x1="40" y1="50" x2="60" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                        <line x1="60" y1="35" x2="80" y2="60" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

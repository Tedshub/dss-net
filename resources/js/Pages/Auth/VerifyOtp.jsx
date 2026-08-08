import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyOtp({ email }) {
    const { data, setData, post, processing, errors } = useForm({
        otp: "",
    });

    const OTP_EXPIRE_TIME = 90;

    const [counter, setCounter] = useState(() => {
        const targetTime = localStorage.getItem(`otp_target_${email}`);
        if (targetTime) {
            const remaining = Math.floor((parseInt(targetTime) - Date.now()) / 1000);
            return remaining > 0 ? remaining : 0;
        }
        const newTarget = Date.now() + OTP_EXPIRE_TIME * 1000;
        localStorage.setItem(`otp_target_${email}`, newTarget.toString());
        return OTP_EXPIRE_TIME;
    });

    const [canResend, setCanResend] = useState(counter <= 0);

    // Countdown timer
    useEffect(() => {
        let timer;
        if (counter > 0) {
            timer = setInterval(() => {
                const targetTime = localStorage.getItem(`otp_target_${email}`);
                if (targetTime) {
                    const remaining = Math.floor((parseInt(targetTime) - Date.now()) / 1000);
                    if (remaining <= 0) {
                        setCounter(0);
                        setCanResend(true);
                        clearInterval(timer);
                    } else {
                        setCounter(remaining);
                    }
                } else {
                    setCounter(0);
                    setCanResend(true);
                    clearInterval(timer);
                }
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [counter, email]);

    const submit = (e) => {
        e.preventDefault();
        post("/verify-otp");
    };

    const resendOtp = () => {
        post("/resend-otp", { email });
        const newTarget = Date.now() + OTP_EXPIRE_TIME * 1000;
        localStorage.setItem(`otp_target_${email}`, newTarget.toString());
        setCounter(OTP_EXPIRE_TIME);
        setCanResend(false);
    };

    return (
        <div className="min-h-screen flex bg-white text-black font-sans">
            <Head title="Verifikasi OTP - Sistem Pendukung Keputusan RKS" />

            {/* Left side: Background from Landing Page */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative items-center justify-center animate-fade-in"
                style={{
                    backgroundImage: "url('/assets/images/home-bg-2.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-12 text-white max-w-2xl text-center">
                    <h1
                        className="text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] mb-6 bg-blue-400/10 backdrop-blur-sm p-6 rounded-2xl leading-tight shadow-lg border border-white/20 inline-block animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Satu langkah lagi untuk mengamankan akun Anda!
                    </h1>
                </div>
            </div>

            {/* Right side: Form */}
            <div
                className="w-full lg:w-1/2 flex flex-col px-6 py-6 sm:px-12 md:px-20 relative animate-fade-in-right"
                style={{ animationDelay: "0.1s" }}
            >
                {/* Navigation */}
                <nav
                    className="flex justify-between items-center w-full mb-12 animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                >
                    <div className="flex items-center">
                        <img
                            src="/assets/images/dss.png"
                            alt="RKS Logo"
                            className="h-8 sm:h-10 w-auto"
                        />
                    </div>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-pink-600 transition-colors font-medium text-sm"
                    >
                        Kembali ke Beranda
                    </Link>
                </nav>

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
                    <div
                        className="text-left mb-8 animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        {/* OTP Icon */}
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                            <svg
                                className="w-7 h-7 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Verifikasi Email
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Kode OTP telah dikirim ke{" "}
                            <span className="font-semibold text-purple-600">
                                {email}
                            </span>
                            . Masukkan kode tersebut pada kolom di bawah.
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-5 animate-fade-in-up"
                        style={{ animationDelay: "0.5s" }}
                    >
                        <div>
                            <InputLabel
                                htmlFor="otp"
                                value="Kode OTP"
                                className="text-gray-700 font-medium mb-1.5"
                            />
                            <TextInput
                                id="otp"
                                name="otp"
                                value={data.otp}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-sm text-center text-xl tracking-[0.5em] font-mono"
                                isFocused={true}
                                placeholder="• • • • • •"
                                onChange={(e) => setData("otp", e.target.value)}
                                required
                            />
                            {errors.otp && (
                                <p className="mt-2 text-red-500 text-sm">
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        {/* Countdown timer */}
                        <div className="text-center">
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={resendOtp}
                                    className="text-pink-600 hover:text-pink-700 font-semibold transition-colors text-sm"
                                >
                                    Kirim ulang OTP
                                </button>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Kirim ulang OTP dalam{" "}
                                    <span className="font-semibold text-purple-600">
                                        {counter} detik
                                    </span>
                                </p>
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
                                        Memverifikasi...
                                    </div>
                                ) : (
                                    "Verifikasi"
                                )}
                            </PrimaryButton>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-gray-500 text-sm">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-pink-600 hover:text-pink-700 font-semibold transition-colors"
                                    onClick={() => localStorage.removeItem(`otp_target_${email}`)}
                                >
                                    Masuk ke akun lain
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div
                    className="mt-auto pt-8 text-center animate-fade-in"
                    style={{ animationDelay: "0.7s" }}
                >
                    <p className="text-gray-400 text-xs">
                        &copy; 2026 Sistem Pendukung Keputusan RKS
                    </p>
                </div>
            </div>
        </div>
    );
}

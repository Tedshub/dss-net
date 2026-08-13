import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

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
                // Eye Closed Icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.97 8.97 0 012.122-.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                </svg>
            )}
        </button>
    );

    return (
        <form onSubmit={updatePassword} className={`space-y-6 ${className}`}>
            <div>
                <InputLabel
                    htmlFor="current_password"
                    value="Kata Sandi Saat Ini"
                    className="text-gray-700 font-medium"
                />
                <div className="relative mt-2">
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
                        autoComplete="current-password"
                        placeholder="Masukkan kata sandi saat ini"
                    />
                    <EyeIcon
                        show={showCurrentPassword}
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                </div>
                <InputError
                    message={errors.current_password}
                    className="mt-2"
                />
            </div>

            <div>
                <InputLabel
                    htmlFor="password"
                    value="Kata Sandi Baru"
                    className="text-gray-700 font-medium"
                />
                <div className="relative mt-2">
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
                        autoComplete="new-password"
                        placeholder="Masukkan kata sandi baru"
                    />
                    <EyeIcon
                        show={showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Konfirmasi Kata Sandi"
                    className="text-gray-700 font-medium"
                />
                <div className="relative mt-2">
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        className="block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-10"
                        autoComplete="new-password"
                        placeholder="Konfirmasi kata sandi baru"
                    />
                    <EyeIcon
                        show={showPasswordConfirmation}
                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    />
                </div>
                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                >
                    {processing ? 'Memperbarui...' : 'Perbarui Kata Sandi'}
                </button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center text-sm text-green-600 font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Kata sandi berhasil diperbarui.
                    </div>
                </Transition>
            </div>
        </form>
    );
}

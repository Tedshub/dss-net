import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

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

    return (
        <form onSubmit={updatePassword} className={`space-y-6 ${className}`}>
            <div>
                <InputLabel
                    htmlFor="current_password"
                    value="Kata Sandi Saat Ini"
                    className="text-gray-700 font-medium"
                />
                <TextInput
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) =>
                        setData('current_password', e.target.value)
                    }
                    type="password"
                    className="mt-2 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    autoComplete="current-password"
                    placeholder="Masukkan kata sandi saat ini"
                />
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
                <TextInput
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className="mt-2 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    autoComplete="new-password"
                    placeholder="Masukkan kata sandi baru"
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Konfirmasi Kata Sandi"
                    className="text-gray-700 font-medium"
                />
                <TextInput
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    type="password"
                    className="mt-2 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    autoComplete="new-password"
                    placeholder="Konfirmasi kata sandi baru"
                />
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

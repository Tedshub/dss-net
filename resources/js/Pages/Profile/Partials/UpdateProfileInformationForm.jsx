import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className={`space-y-6 ${className}`}>
            <div>
                <InputLabel htmlFor="name" value="Nama" className="text-gray-700 font-medium" />
                <TextInput
                    id="name"
                    className="mt-2 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                <TextInput
                    id="email"
                    type="email"
                    className="mt-2 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                />
                <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-orange-800">
                                Alamat email Anda belum diverifikasi.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="ml-2 text-sm text-purple-600 underline hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded font-medium"
                                >
                                    Klik di sini untuk mengirim ulang email verifikasi.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    Link verifikasi baru telah dikirim ke alamat email Anda.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-6 py-3 bg-purple-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
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
                        Berhasil disimpan.
                    </div>
                </Transition>
            </div>
        </form>
    );
}

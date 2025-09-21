import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <div className={className}>
            <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                    Sebelum menghapus akun Anda, silakan unduh data atau informasi yang ingin Anda simpan.
                </p>
            </div>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Hapus Akun
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <div className="w-6 h-6 bg-red-500 rounded"></div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Apakah Anda yakin ingin menghapus akun Anda?
                            </h2>
                            <p className="text-sm text-gray-600">
                                Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen.
                                Silakan masukkan kata sandi Anda untuk mengkonfirmasi.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={deleteUser}>
                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi"
                                className="sr-only"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                                isFocused
                                placeholder="Masukkan kata sandi Anda"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            >
                                {processing ? 'Menghapus...' : 'Hapus Akun'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

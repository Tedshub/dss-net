import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({nextCode}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: nextCode,
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("alternatives.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Alternatif - DSS RKS" />

            <div className="max-w-3xl mx-auto py-6 sm:py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Tambahkan Opsi Kebijakan
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-lg shadow space-y-5"
                >
                    {/* Input Code (readonly) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kode
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            readOnly
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.code && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Input Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Misalnya: Pembangunan Jalan Desa"
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <Link
                            href={route("alternatives.index")}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-lg shadow space-y-5"
                >
                    {/* Input Code (readonly) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kode
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            readOnly
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.code && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Input Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Misalnya: Pembangunan Jalan Desa"
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <Link
                            href={route("alternatives.index")}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

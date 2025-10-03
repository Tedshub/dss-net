// resources/js/Pages/Alternatives/Option.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function OptionRating({ alternative, criterias }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const criteriaItems = [
        {
            id: 1,
            criteria_code: 'C1',
            title: 'Apakah Kebutuhan dan Prioritas Sekolah?',
            subtitle: '(Kebutuhan dan Prioritas Sekolah)',
            choices: [
                { label: 'Peningkatan kompetensi PTK', value: 5 },
                { label: 'Peningkatan mutu siswa, peningkatan output melalui lomba', value: 4 },
                { label: 'Terkait dengan kualitas proses pembelajaran', value: 3 }
            ]
        },
        {
            id: 2,
            criteria_code: 'C2',
            title: 'Apakah kebijakan yang dimaksud sesuai Visi, Misi, dan Tujuan Sekolah?',
            subtitle: '(Visi, Misi, dan Tujuan Sekolah)',
            choices: [
                { label: 'Kegiatan terpilih mendukung kearah ketercapaian VMT Sekolah', value: 5 },
                { label: 'Kegiatan bersifat inovatif dan sesuai dengan tujuan sekolah', value: 4 },
                { label: 'Tingkat relevansi antara kegiatan dengan VMT sekolah', value: 3 }
            ]
        },
        {
            id: 3,
            criteria_code: 'C3',
            title: 'Masalah utama apa yang terlihat dari hasil Rapor Pendidikan sekolah?',
            subtitle: '(Masalah di rapor pendidikan - warna merah atau kuning atau skor terendah)',
            choices: [
                { label: 'Komponen dan Indikator dengan skor rendah, dengan warna merah', value: 5 },
                { label: 'Komponen dan Indikator dengan skor sedang, dengan warna kuning', value: 4 },
                { label: 'Indikator yang mengalami penurunan paling tinggi', value: 3 }
            ]
        },
        {
            id: 4,
            criteria_code: 'C4',
            title: 'Bagaimana kualitas hasil analisis tim sekolah (misalnya analisis SWOT) yang dilakukan?',
            subtitle: '(Hasil analisis tim sekolah, misalnya analisis SWOT)',
            choices: [
                { label: 'Data yang objektif dan akurat - Data dan permasalahan', value: 5 },
                { label: 'Proses analisis yang dapat dipertanggung jawabkan - Personel', value: 4 },
                { label: 'Kualitas proses analisis yang sistematis dan komprehensif - Metode', value: 3 }
            ]
        },
        {
            id: 5,
            criteria_code: 'C5',
            title: 'Sejauh mana kualitas hasil kesepakatan warga sekolah dalam menentukan prioritas kegiatan?',
            subtitle: '(Hasil kesepakatan warga sekolah)',
            choices: [
                { label: 'Tingkat urgensi masalah yang akan diselesaikan', value: 5 },
                { label: 'Kejelasan dan spesifikasi kegiatan yang akan dilakukan', value: 4 },
                { label: 'Tingkat partisipasi peserta - demokratis', value: 3 }
            ]
        },
        {
            id: 6,
            criteria_code: 'C6',
            title: 'Bagaimana kondisi ketersediaan dan kecukupan anggaran sekolah dalam mendukung kegiatan?',
            subtitle: '(Ketersediaan/kecukupan anggaran sekolah)',
            choices: [
                { label: 'Efisiensi - memanfaatkan dana secara hemat dan tepat sasaran', value: 5 },
                { label: 'Keberlanjutan berkaitan dengan pemeliharaan', value: 4 },
                { label: 'Sumber dana dari luar BOS standar pembiayaan', value: 3 }
            ]
        },
        {
            id: 7,
            criteria_code: 'C7',
            title: 'Sejauh mana prioritas dan kebijakan pemerintah daerah mendukung program sekolah?',
            subtitle: '(Prioritas/Kebijakan Pemerintah Daerah)',
            choices: [
                { label: 'Kesesuaian Arah Kebijakan', value: 3 },
                { label: 'Implementasi Program Daerah: Meliputi pelayanan publik yang relevan dan pendidikan karakter', value: 5 },
                { label: 'Dukungan Instansi Daerah', value: 4 }
            ]
        },
        {
            id: 8,
            criteria_code: 'C8',
            title: 'Sejauh mana prioritas dan kebijakan pemerintah pusat mendukung program sekolah?',
            subtitle: '(Prioritas/Kebijakan Pemerintah Pusat)',
            choices: [
                { label: 'Penyelarasan Program & Anggaran', value: 5 },
                { label: 'Pengembangan SDM & Teknologi', value: 4 },
                { label: 'Dukungan Kelembagaan', value: 3 }
            ]
        },
        {
            id: 9,
            criteria_code: 'C9',
            title: 'Apa bentuk tuntutan masyarakat atau dunia usaha/dunia industri yang berpengaruh terhadap program sekolah?',
            subtitle: '(Tuntutan Masyarakat atau dunia usaha dan dunia Industri)',
            choices: [
                { label: 'Penerimaan dan dukungan terhadap anak berkebutuhan khusus (inklusi)', value: 4 },
                { label: 'Kegiatan parenting sebagai jembatan komunikasi sekolah-masyarakat', value: 5 },
                { label: 'Pendidikan karakter berbasis kebutuhan Masyarakat', value: 3 }
            ]
        },
        {
            id: 10,
            criteria_code: 'C10',
            title: 'Apa bentuk tuntutan orang tua siswa yang berpengaruh terhadap kebijakan dan program sekolah?',
            subtitle: '(Tuntutan Orang Tua Siswa)',
            choices: [
                { label: 'Keterlibatan Orang Tua dalam Pengambilan Keputusan', value: 5 },
                { label: 'Permintaan Fasilitas Tambahan standar minimal', value: 4 },
                { label: 'Tuntutan Kualitas Pengajar Tinggi', value: 3 }
            ]
        }
    ];

    const { data, setData, post, processing, errors } = useForm({
        alternative_id: alternative.id,
        ratings: {}
    });

    const handleRatingChange = (criteriaId, value) => {
        setData('ratings', {
            ...data.ratings,
            [criteriaId]: value
        });
    };

    const isAllCriteriaRated = () => {
        return criteriaItems.every(item => data.ratings[item.id] !== undefined);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAllCriteriaRated()) {
            alert('Mohon berikan penilaian untuk semua kriteria sebelum menyimpan!');
            return;
        }

        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        post(route('alternatives.option.store'), {
            onSuccess: () => {
                router.visit(route('alternatives.index'));
            },
            onError: (errors) => {
                console.error('Error:', errors);
                setShowConfirmModal(false);
            }
        });
    };

    const getRatedCount = () => {
        return Object.keys(data.ratings).length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="fixed inset-0 flex flex-col">
                <AuthenticatedLayout>
                    <Head title={`Penilaian Opsi - ${alternative.name}`} />

                    {/* Sticky Progress Bar */}
                    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                        <div className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Progres Penilaian
                                </span>
                                <span className="text-sm font-semibold text-blue-600">
                                    {Math.round((getRatedCount() / criteriaItems.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(getRatedCount() / criteriaItems.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            {/* Header */}
                            <div className="mb-4 sm:mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                                                Penilaian Opsi Kebijakan
                                            </h1>
                                            <p className="text-sm sm:text-base text-blue-50 mb-1">
                                                Opsi: <span className="font-semibold">{alternative.name}</span>
                                            </p>
                                            <p className="text-sm sm:text-base text-blue-50">
                                                Kode: <span className="font-semibold">{alternative.code}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
                                        <p className="text-xs sm:text-sm">
                                            Berikan penilaian untuk setiap kriteria dengan memilih salah satu pilihan yang paling sesuai dengan opsi kebijakan yang dimaksud.
                                            <span className="font-semibold block mt-1">
                                                Progress: {getRatedCount()}/10 kriteria telah dinilai
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 sm:space-y-6">
                                    {criteriaItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
                                        >
                                            <div className="flex items-start space-x-3 mb-4">
                                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base ${data.ratings[item.id] ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                    {data.ratings[item.id] ? '✓' : index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-500">
                                                        {item.subtitle}
                                                    </p>
                                                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                                        Kriteria: {item.criteria_code}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 ml-0 sm:ml-13">
                                                {item.choices.map((choice, choiceIndex) => (
                                                    <label
                                                        key={choiceIndex}
                                                        className={`flex items-start p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                            data.ratings[item.id] === choice.value
                                                                ? 'border-blue-500 bg-blue-50'
                                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`criteria_${item.id}`}
                                                            value={choice.value}
                                                            checked={data.ratings[item.id] === choice.value}
                                                            onChange={() => handleRatingChange(item.id, choice.value)}
                                                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                                                        />
                                                        <div className="ml-3 flex-1">
                                                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                                {String.fromCharCode(97 + choiceIndex)}. {choice.label}
                                                            </span>
                                                            <span className="ml-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                                                                Nilai: {choice.value}
                                                            </span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                        <div className="text-sm text-gray-600">
                                            {isAllCriteriaRated() ? (
                                                <span className="flex items-center text-green-600 font-medium">
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                    </svg>
                                                    Semua kriteria telah dinilai
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-amber-600 font-medium">
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                    </svg>
                                                    Masih ada {criteriaItems.length - getRatedCount()} kriteria yang belum dinilai
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex space-x-3 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => router.visit(route('alternatives.index'))}
                                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing || !isAllCriteriaRated()}
                                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium shadow-sm"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan Penilaian'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-center mb-2">
                            Konfirmasi Penyimpanan
                        </h3>
                        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                            Apakah Anda yakin ingin menyimpan semua penilaian untuk opsi <strong>{alternative.name}</strong>?
                        </p>
                        <div className="flex flex-col-reverse sm:flex-row justify-center space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                disabled={processing}
                                className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmSubmit}
                                disabled={processing}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
                            >
                                {processing ? 'Menyimpan...' : 'Ya, Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

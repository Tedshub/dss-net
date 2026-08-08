// resources/js/Pages/Alternatives/List.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AssessmentList({ alternative, criterias, ksBudget }) {
    const { auth } = usePage().props;
    const userRole = auth.user.role;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const assessmentItems = [
        {
            id: 1,
            criteria_code: 'C1',
            item: 'Apakah kegiatan Yang direncanakan sesuai dengan Kebutuhan dan Prioritas Sekolah?',
            subtitle: '(Kebutuhan dan Prioritas Sekolah)',
            options: [
                { label: 'Sesuai Sarana Dan Prasarana', value: 3 },
                { label: 'Sesuai Sumber Daya Manusia', value: 4 },
                { label: 'Sesuai Peningkatan Mutu/Hasil Belajar Siswa', value: 5 }
            ]
        },
        {
            id: 2,
            criteria_code: 'C2',
            item: 'Apakah kebijakan yang dimaksud sesuai Visi, Misi, dan Tujuan Sekolah?',
            subtitle: '(Visi, Misi, dan Tujuan Sekolah)',
            options: [
                { label: 'Kegiatan terpilih mendukung kearah ketercapaian VMT Sekolah', value: 5 },
                { label: 'Kegiatan bersifat inovatif dan sesuai dengan tujuan sekolah', value: 4 },
                { label: 'Tingkat relevansi antara kegiatan dengan VMT sekolah', value: 3 }
            ]
        },
        {
            id: 3,
            criteria_code: 'C3',
            item: 'Masalah utama apa yang terlihat dari hasil Rapor Pendidikan sekolah?',
            subtitle: '(Masalah di rapor pendidikan - warna merah atau kuning atau skor terendah)',
            options: [
                { label: 'Komponen dan Indikator dengan skor rendah, dengan warna merah', value: 5 },
                { label: 'Komponen dan Indikator dengan skor sedang, dengan warna kuning', value: 4 },
                { label: 'Indikator yang mengalami penurunan paling tinggi atau kenaikan paling rendah', value: 3 }
            ]
        },
        {
            id: 4,
            criteria_code: 'C4',
            item: 'Bagaimana kualitas hasil analisis tim sekolah (misalnya analisis SWOT) yang dilakukan?',
            subtitle: '(Hasil analisis tim sekolah, misalnya analisis SWOT)',
            options: [
                { label: 'Data yang objektif dan akurat - Data dan permasalahan', value: 5 },
                { label: 'Proses analisis yang dapat dipertanggung jawabkan - Personel', value: 4 },
                { label: 'Kualitas proses analisis yang sistematis dan komprehensif - Metode', value: 3 }
            ]
        },
        {
            id: 5,
            criteria_code: 'C5',
            item: 'Sejauh mana kualitas hasil kesepakatan warga sekolah dalam menentukan prioritas kegiatan?',
            subtitle: '(Hasil kesepakatan warga sekolah)',
            options: [
                { label: 'Tingkat urgensi masalah yang akan diselesaikan', value: 5 },
                { label: 'Kejelasan dan spesifikasi kegiatan yang akan dilakukan', value: 4 },
                { label: 'Tingkat partisipasi peserta - demokratis', value: 3 }
            ]
        },
        {
            id: 6,
            criteria_code: 'C6',
            item: 'Bagaimana kondisi ketersediaan dan kecukupan anggaran sekolah dalam mendukung kegiatan?',
            subtitle: '(Ketersediaan/kecukupan anggaran sekolah)',
            options: [
                { label: 'Efisiensi - memanfaatkan dana secara hemat dan tepat sasaran', value: 5 },
                { label: 'Keberlanjutan berkaitan dengan pemeliharaan', value: 4 },
                { label: 'Sumber dana dari luar BOS standar pembiayaan', value: 3 }
            ]
        },
        {
            id: 7,
            criteria_code: 'C7',
            item: 'Sejauh mana prioritas dan kebijakan pemerintah daerah mendukung program sekolah?',
            subtitle: '(Prioritas/Kebijakan Pemerintah Daerah)',
            options: [
                { label: 'Kesesuaian Arah Kebijakan', value: 3 },
                { label: 'Implementasi Program Daerah: Meliputi pelayanan publik yang relevan dan pendidikan karakter', value: 5 },
                { label: 'Dukungan Instansi Daerah', value: 4 }
            ]
        },
        {
            id: 8,
            criteria_code: 'C8',
            item: 'Sejauh mana prioritas dan kebijakan pemerintah pusat mendukung program sekolah?',
            subtitle: '(Prioritas/Kebijakan Pemerintah Pusat)',
            options: [
                { label: 'Penyelarasan Program & Anggaran', value: 5 },
                { label: 'Pengembangan SDM & Teknologi', value: 4 },
                { label: 'Dukungan Kelembagaan', value: 3 }
            ]
        },
        {
            id: 9,
            criteria_code: 'C9',
            item: 'Apa bentuk tuntutan masyarakat atau dunia usaha/dunia industri yang berpengaruh terhadap program sekolah?',
            subtitle: '(Tuntutan Masyarakat atau dunia usaha dan dunia Industri)',
            options: [
                { label: 'Penerimaan dan dukungan terhadap anak berkebutuhan khusus (inklusi)', value: 4 },
                { label: 'Kegiatan parenting sebagai jembatan komunikasi sekolah-masyarakat', value: 5 },
                { label: 'Pendidikan karakter berbasis kebutuhan Masyarakat', value: 3 }
            ]
        },
        {
            id: 10,
            criteria_code: 'C10',
            item: 'Apa bentuk tuntutan orang tua siswa yang berpengaruh terhadap kebijakan dan program sekolah?',
            subtitle: '(Tuntutan Orang Tua Siswa)',
            options: [
                { label: 'Keterlibatan Orang Tua dalam Pengambilan Keputusan', value: 5 },
                { label: 'Permintaan Fasilitas Tambahan standar minimal', value: 4 },
                { label: 'Tuntutan Kualitas Pengajar Tinggi', value: 3 }
            ]
        },
        {
            id: 11,
            criteria_code: 'C11',
            item: 'Masukkan anggaran kegiatan',
            subtitle: '(Anggaran)',
            is_budget: true
        }
    ];

    const { data, setData, post, processing, errors } = useForm({
        alternative_id: alternative.id,
        answers: {}
    });

    // State untuk tampilan format rupiah (Kepala Sekolah)
    const [anggaranMinDisplay, setAnggaranMinDisplay] = useState('');
    const [anggaranMaxDisplay, setAnggaranMaxDisplay] = useState('');

    // Fungsi format rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const handleOptionChange = (itemId, value) => {
        setData('answers', {
            ...data.answers,
            [itemId]: value
        });
    };

    // Handler untuk input anggaran Kepala Sekolah (min atau max)
    const handleAnggaranKSChange = (e, field) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = rawValue ? parseInt(rawValue, 10) : null;
        const formatted = rawValue ? formatRupiah(numericValue) : '';

        if (field === 'min') {
            setAnggaranMinDisplay(formatted);
        } else {
            setAnggaranMaxDisplay(formatted);
        }

        const currentC11 = data.answers[11] || {};
        if (numericValue !== null) {
            setData('answers', {
                ...data.answers,
                [11]: { ...currentC11, [field]: numericValue }
            });
        } else {
            const updated = { ...currentC11 };
            delete updated[field];
            const newAnswers = { ...data.answers };
            if (Object.keys(updated).length === 0) {
                delete newAnswers[11];
            } else {
                newAnswers[11] = updated;
            }
            setData('answers', newAnswers);
        }
    };

    // Cek apakah C11 sudah terisi berdasarkan role
    const isC11Answered = () => {
        if (userRole === 'guest') {
            const c11 = data.answers[11];
            return c11 && c11.min !== undefined && c11.min > 0
                && c11.max !== undefined && c11.max > 0
                && c11.max >= c11.min;
        }
        // sub_guest: nilai tunggal
        return data.answers[11] !== undefined && data.answers[11] !== null;
    };

    const isAllItemsAnswered = () => {
        return assessmentItems.every(item => {
            if (item.is_budget) return isC11Answered();
            return data.answers[item.id] !== undefined;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAllItemsAnswered()) {
            alert('Mohon jawab semua item sebelum menyimpan!');
            return;
        }
        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        post(route('alternatives.list.store'), {
            onSuccess: () => {
                router.visit(route('alternatives.index'));
            },
            onError: (errors) => {
                console.error('Error:', errors);
                setShowConfirmModal(false);
            }
        });
    };

    const getAnsweredCount = () => {
        let count = 0;
        assessmentItems.forEach(item => {
            if (item.is_budget) {
                if (isC11Answered()) count++;
            } else if (data.answers[item.id] !== undefined) {
                count++;
            }
        });
        return count;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="fixed inset-0 flex flex-col">
                <AuthenticatedLayout>
                    <Head title={`Daftar Penilaian - ${alternative.name}`} />



                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            <div className="mb-4 sm:mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                                                Daftar Penilaian Opsi Kebijakan
                                            </h1>
                                            <p className="text-sm sm:text-base text-blue-50 mb-1">
                                                Nama Kebijakan: <span className="font-semibold">{alternative.name}</span>
                                            </p>
                                            <p className="text-sm sm:text-base text-blue-50">
                                                Kode: <span className="font-semibold">{alternative.code}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
                                        <p className="text-xs sm:text-sm">
                                            Silakan isi item berikut dengan memilih salah satu opsi yang paling sesuai dengan kebijakan yang dimaksud.
                                            <span className="font-semibold block mt-1">
                                                Progress: {getAnsweredCount()}/{assessmentItems.length} item terjawab
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 sm:space-y-6">
                                    {assessmentItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
                                        >
                                            <div className="flex items-start space-x-3 mb-4">
                                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base ${
                                                    (item.is_budget ? isC11Answered() : data.answers[item.id] !== undefined)
                                                        ? 'bg-green-500' : 'bg-gray-400'
                                                }`}>
                                                    {(item.is_budget ? isC11Answered() : data.answers[item.id] !== undefined) ? '✓' : index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                                        {item.item}
                                                    </h3>
                                                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                                        Kriteria: {item.criteria_code}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 ml-0 sm:ml-13">
                                                {item.is_budget ? (
                                                    // ========= RENDER C11 BERDASARKAN ROLE =========
                                                    userRole === 'guest' ? (
                                                        // --- Kepala Sekolah: 2 input nominal ---
                                                        <div className="mt-2 space-y-4">
                                                            <p className="text-sm font-medium text-gray-700">
                                                                Masukkan estimasi anggaran kegiatan (Nominal):
                                                            </p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                                                                        Estimasi Minimal
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={anggaranMinDisplay}
                                                                        onChange={(e) => handleAnggaranKSChange(e, 'min')}
                                                                        placeholder="Rp 0"
                                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-900"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                                                                        Estimasi Maksimal
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={anggaranMaxDisplay}
                                                                        onChange={(e) => handleAnggaranKSChange(e, 'max')}
                                                                        placeholder="Rp 0"
                                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-900"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* Preview rata-rata */}
                                                            {data.answers[11] && data.answers[11].min && data.answers[11].max && data.answers[11].max >= data.answers[11].min && (
                                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                                    <p className="text-xs text-blue-700 font-medium">
                                                                        Nilai C11 masuk ke TOPSIS (rata-rata):&nbsp;
                                                                        <span className="font-bold">
                                                                            {formatRupiah((data.answers[11].min + data.answers[11].max) / 2)}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {data.answers[11] && data.answers[11].min && data.answers[11].max && data.answers[11].max < data.answers[11].min && (
                                                                <p className="text-xs text-red-600 font-medium">⚠ Estimasi maksimal tidak boleh lebih kecil dari estimasi minimal.</p>
                                                            )}
                                                            <p className="text-xs text-amber-600 italic flex items-center">
                                                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                                                </svg>
                                                                Nilai TOPSIS = rata-rata(Min, Maks). Nilai ini menjadi acuan pilihan untuk Bendahara.
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        // --- Bendahara: Radio pilih nominal dari KS ---
                                                        <div className="mt-2">
                                                            {ksBudget && ksBudget.min !== null && ksBudget.max !== null ? (
                                                                <div className="space-y-3">
                                                                    <p className="text-sm font-medium text-gray-700">
                                                                        Pilih nominal anggaran yang disetujui:
                                                                    </p>
                                                                    {[
                                                                        { label: 'Estimasi Minimal', value: ksBudget.min, tag: 'Min', color: 'bg-green-100 text-green-700' },
                                                                        { label: 'Estimasi Maksimal', value: ksBudget.max, tag: 'Maks', color: 'bg-purple-100 text-purple-700' }
                                                                    ].map((opt, optIdx) => (
                                                                        <label
                                                                            key={optIdx}
                                                                            className={`flex items-start p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                                                data.answers[11] === opt.value
                                                                                    ? 'border-blue-500 bg-blue-50'
                                                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                                            }`}
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name="item_11"
                                                                                value={opt.value}
                                                                                checked={data.answers[11] === opt.value}
                                                                                onChange={() => handleOptionChange(11, opt.value)}
                                                                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                                                                            />
                                                                            <div className="ml-3 flex-1">
                                                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                                                    <span className="text-sm sm:text-base text-gray-700 font-medium">
                                                                                        {opt.label}
                                                                                    </span>
                                                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${opt.color}`}>
                                                                                        {opt.tag}
                                                                                    </span>
                                                                                </div>
                                                                                <span className="text-base sm:text-lg font-bold text-blue-700">
                                                                                    {formatRupiah(opt.value)}
                                                                                </span>
                                                                            </div>
                                                                        </label>
                                                                    ))}
                                                                    <p className="text-xs text-amber-600 italic flex items-center">
                                                                        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                                                        </svg>
                                                                        Nominal yang Anda pilih akan masuk ke perhitungan TOPSIS sebagai penilaian Anda.
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                // KS belum mengisi anggaran
                                                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                                                    <div className="flex items-start gap-3">
                                                                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                                        </svg>
                                                                        <div>
                                                                            <p className="text-sm font-semibold text-amber-800">Anggaran Belum Tersedia</p>
                                                                            <p className="text-xs text-amber-700 mt-1">
                                                                                Kepala Sekolah belum mengisi estimasi anggaran untuk opsi kebijakan ini. Silakan minta Kepala Sekolah untuk mengisi terlebih dahulu.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                ) : (
                                                    // ========= RENDER OPSI PILIHAN BIASA =========
                                                    item.options.map((option, optIndex) => (
                                                        <label
                                                            key={optIndex}
                                                            className={`flex items-start p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                                data.answers[item.id] === option.value
                                                                    ? 'border-blue-500 bg-blue-50'
                                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`item_${item.id}`}
                                                                value={option.value}
                                                                checked={data.answers[item.id] === option.value}
                                                                onChange={() => handleOptionChange(item.id, option.value)}
                                                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                                                            />
                                                            <div className="ml-3 flex-1">
                                                                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                                    {String.fromCharCode(97 + optIndex)}. {option.label}
                                                                </span>
                                                            </div>
                                                        </label>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                        <div className="text-sm text-gray-600">
                                            {isAllItemsAnswered() ? (
                                                <span className="flex items-center text-green-600 font-medium">
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                    </svg>
                                                    Semua item telah terjawab
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-amber-600 font-medium">
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                    </svg>
                                                    Masih ada {assessmentItems.length - getAnsweredCount()} item yang belum dijawab
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
                                                disabled={processing || !isAllItemsAnswered()}
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
                            Apakah Anda yakin ingin menyimpan semua jawaban untuk opsi <strong>{alternative.name}</strong>?
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

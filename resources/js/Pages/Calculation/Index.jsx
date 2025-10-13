// resources/js/Pages/Calculation/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Trophy,
    BarChart3,
    Target,
    Ruler,
    Crown,
    RefreshCw,
    AlertCircle,
    Award,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export default function Index({ initialData = null }) {
    const [result, setResult] = useState(initialData);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('ranking');
    const [isMobile, setIsMobile] = useState(false);
    const [expandedMatrices, setExpandedMatrices] = useState({});

    // Detect mobile screen size - consistent with Values/Index.jsx
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        if (!initialData) {
            fetchTopsisResult();
        }
    }, [initialData]);

    const fetchTopsisResult = async () => {
        try {
            setLoading(true);
            const response = await fetch('/topsis');
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError('Gagal memuat data perhitungan TOPSIS');
        } finally {
            setLoading(false);
        }
    };

    const refreshCalculation = () => {
        fetchTopsisResult();
    };

    const toggleMatrixExpansion = (matrixType) => {
        setExpandedMatrices(prev => ({
            ...prev,
            [matrixType]: !prev[matrixType]
        }));
    };

    // Mobile Card Components with consistent styling
    const MobileRankingCard = ({ item, index }) => (
        <div className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-w-full ${
            index === 0 ? 'border-yellow-400 bg-yellow-50' : ''
        }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                    {index === 0 && (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3 flex-shrink-0">
                            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                    )}
                    <span className={`text-base sm:text-lg font-bold ${index === 0 ? 'text-orange-600' : index === 1 ? 'text-gray-600' : index === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                        #{index + 1}
                    </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm sm:text-base font-medium text-purple-600">
                        {parseFloat(item.value).toFixed(4)}
                    </div>
                    <div className="text-xs text-gray-500">
                        {(item.value * 100).toFixed(1)}%
                    </div>
                </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-500 flex-shrink-0">Kode:</span>
                    <span className="text-sm font-medium text-gray-900 text-right truncate ml-2">{item.code}</span>
                </div>
                <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-500 flex-shrink-0">Nama:</span>
                    <span className="text-sm text-gray-700 text-right ml-2 break-words">{item.name}</span>
                </div>
            </div>

            <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{(item.value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(item.value * 100)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );

    const MobileMatrixCard = ({ title, description, data, matrixType, bgColor = 'bg-blue-50' }) => (
        <div className="bg-white border border-gray-200 rounded-lg mb-3 sm:mb-4 max-w-full">
            <button
                onClick={() => toggleMatrixExpansion(matrixType)}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-left ${bgColor} border-b border-gray-200 flex items-center justify-between`}
            >
                <div className="min-w-0 flex-1 pr-2">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
                <div className="flex-shrink-0 ml-1">
                    {expandedMatrices[matrixType] ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                </div>
            </button>

            {expandedMatrices[matrixType] && (
                <div className="p-3 sm:p-4">
                    <div className="space-y-3 sm:space-y-4">
                        {data?.map((row, index) => (
                            <div key={row.alternative_id} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                                <div className="font-medium text-sm sm:text-base text-gray-900 mb-2 break-words">
                                    {row.code} - {row.name}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                                    {Object.entries(row)
                                        .filter(([key]) => !['alternative_id', 'code', 'name'].includes(key))
                                        .map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                                                <span className="text-gray-600 font-medium truncate pr-2">{key}:</span>
                                                <span className="font-bold text-gray-900 text-right flex-shrink-0">
                                                    {value !== null ? parseFloat(value).toFixed(4) : '-'}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const MobileIdealSolutionCard = ({ title, description, data, type }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 max-w-full">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>
            <div className="space-y-2 sm:space-y-3">
                {data && Object.entries(data).map(([criteria, value]) => (
                    <div key={criteria} className="flex items-center justify-between py-1 sm:py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate pr-2 flex-1 min-w-0">{criteria}</span>
                        <span className={`text-xs sm:text-sm font-bold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ml-2 ${
                            type === 'plus'
                                ? 'text-green-600 bg-green-100'
                                : 'text-red-600 bg-red-100'
                        }`}>
                            {parseFloat(value).toFixed(4)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const MobileDistanceCard = ({ item }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 max-w-full">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="min-w-0 flex-1 pr-2">
                    <div className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{item.code}</div>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="text-sm sm:text-base font-bold text-purple-600">{item.V}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">D+</div>
                    <div className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded text-center">
                        {item.D_pos}
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">D-</div>
                    <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded text-center">
                        {item.D_neg}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="fixed inset-0 flex flex-col">
                    <AuthenticatedLayout>
                        <Head title="Perhitungan TOPSIS - DSS RKS" />
                        <div className="flex-1 overflow-hidden">
                            <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                                <div className="flex items-center justify-center min-h-64">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto mb-3 sm:mb-4"></div>
                                        <p className="text-gray-600 text-sm sm:text-base">Memuat perhitungan TOPSIS...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout>
                </div>
            </div>
        );
    }

    if (error || (result && result.error)) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="fixed inset-0 flex flex-col">
                    <AuthenticatedLayout>
                        <Head title="Perhitungan TOPSIS - DSS RKS" />
                        <div className="flex-1 overflow-hidden">
                            <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                                <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center max-w-full">
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-600" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-red-800 mb-1 sm:mb-2">Perhitungan Tidak Dapat Dilakukan</h3>
                                    <p className="text-red-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 break-words">
                                        {error || result?.error || 'Terjadi kesalahan dalam perhitungan'}
                                    </p>
                                    <button
                                        onClick={refreshCalculation}
                                        className="inline-flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm lg:text-base"
                                    >
                                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Coba Lagi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Layout Container */}
            <div className="fixed inset-0 flex flex-col">
                {/* AuthenticatedLayout with overlay behavior */}
                <AuthenticatedLayout>
                    <Head title="Perhitungan TOPSIS - DSS RKS" />

                    {/* Main Content Area - scrollable */}
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            {/* Header */}
                            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Perhitungan TOPSIS</h1>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Hasil analisis menggunakan metode TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={refreshCalculation}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm"
                                    >
                                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                                        <span className="hidden sm:inline">REFRESH PERHITUNGAN</span>
                                        <span className="sm:hidden">REFRESH</span>
                                    </button>
                                </div>
                            </div>

                            {/* Winner Card */}
                            {result?.ranking?.length > 0 && (
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-white mb-4 sm:mb-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                            <Award className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-800" />
                                        </div>
                                        <h3 className="text-base sm:text-xl lg:text-2xl font-bold mb-2">Alternatif Kebijakan yang Direkomendasikan</h3>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3 sm:p-4 inline-block max-w-full">
                                            <p className="text-sm sm:text-lg font-semibold truncate break-words px-2">{result.ranking[0].name}</p>
                                            <p className="text-xs sm:text-sm opacity-90">Kode: {result.ranking[0].code}</p>
                                            <p className="text-xs sm:text-sm opacity-90">Nilai: {parseFloat(result.ranking[0].value).toFixed(4)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Navigation */}
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 mb-4 sm:mb-6">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex overflow-x-auto">
                                        {[
                                            { id: 'ranking', name: 'Ranking', icon: Trophy, fullName: 'Ranking Final' },
                                            { id: 'matrices', name: 'Matriks', icon: BarChart3, fullName: 'Matriks Perhitungan' },
                                            { id: 'ideal', name: 'Solusi Ideal', icon: Target, fullName: 'Solusi Ideal' },
                                            { id: 'distances', name: 'Jarak', icon: Ruler, fullName: 'Jarak & Preferensi' }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`py-2 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center ${
                                                    activeTab === tab.id
                                                        ? 'border-purple-500 text-purple-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                <span className="hidden sm:inline">{tab.fullName}</span>
                                                <span className="sm:hidden">{tab.name}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'ranking' && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Desktop/Tablet Table View */}
                                    <div className="hidden md:block bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Hasil Ranking TOPSIS</h2>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Alternatif diurutkan berdasarkan nilai preferensi tertinggi</p>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-[100px]">
                                                            RANKING
                                                        </th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">
                                                            KODE
                                                        </th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px] sm:min-w-[200px]">
                                                            NAMA ALTERNATIF
                                                        </th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[140px]">
                                                            NILAI PREFERENSI (V)
                                                        </th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px] sm:min-w-[160px]">
                                                            PERSENTASE
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {result?.ranking?.map((item, index) => (
                                                        <tr key={item.alternative_id} className={`hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    {index === 0 && (
                                                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                                                                            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                        </div>
                                                                    )}
                                                                    <span className={`text-sm sm:text-lg font-bold ${index === 0 ? 'text-orange-600' : index === 1 ? 'text-gray-600' : index === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                                                                        #{index + 1}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                                                {item.code}
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 text-xs sm:text-sm text-gray-700 max-w-[150px] sm:max-w-[200px] truncate">
                                                                <div title={item.name}>{item.name}</div>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 whitespace-nowrap text-center">
                                                                <span className="text-sm sm:text-lg font-bold text-purple-600">
                                                                    {parseFloat(item.value).toFixed(4)}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 whitespace-nowrap text-center">
                                                                <div className="flex items-center justify-center">
                                                                    <div className="w-12 sm:w-16 lg:w-20 bg-gray-200 rounded-full h-2 mr-2 sm:mr-3">
                                                                        <div
                                                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                                                            style={{ width: `${(item.value * 100)}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                                                                        {(item.value * 100).toFixed(1)}%
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="md:hidden">
                                        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
                                            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Hasil Ranking TOPSIS</h2>
                                            <p className="text-xs sm:text-sm text-gray-600">Alternatif diurutkan berdasarkan nilai preferensi tertinggi</p>
                                        </div>

                                        <div className="space-y-0">
                                            {result?.ranking?.map((item, index) => (
                                                <MobileRankingCard key={item.alternative_id} item={item} index={index} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'matrices' && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Desktop/Tablet Table View */}
                                    <div className="hidden md:block space-y-4 sm:space-y-6">
                                        {/* Decision Matrix X */}
                                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                            <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-blue-50">
                                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Matriks Keputusan (X)</h3>
                                                <p className="text-xs sm:text-sm text-gray-600">Nilai awal dari setiap alternatif untuk setiap kriteria</p>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[100px] sm:min-w-[150px]">Alternatif</th>
                                                            {result?.X?.[0] && Object.keys(result.X[0]).filter(key => !['alternative_id', 'code', 'name'].includes(key)).map(criteriaCode => (
                                                                <th key={criteriaCode} className="px-2 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[80px] sm:min-w-[120px]">
                                                                    {criteriaCode}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {result?.X?.map(row => (
                                                            <tr key={row.alternative_id} className="hover:bg-gray-50">
                                                                <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                                                                    <div title={`${row.code} - ${row.name}`}>{row.code}</div>
                                                                </td>
                                                                {Object.entries(row).filter(([key]) => !['alternative_id', 'code', 'name'].includes(key)).map(([key, value]) => (
                                                                    <td key={key} className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-600">
                                                                        {value !== null ? parseFloat(value).toFixed(2) : '-'}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Normalized Matrix R */}
                                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                            <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-green-50">
                                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Matriks Ternormalisasi (R)</h3>
                                                <p className="text-xs sm:text-sm text-gray-600">Hasil normalisasi menggunakan vector normalization</p>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[100px] sm:min-w-[150px]">Alternatif</th>
                                                            {result?.R?.[0] && Object.keys(result.R[0]).filter(key => !['alternative_id', 'code', 'name'].includes(key)).map(criteriaCode => (
                                                                <th key={criteriaCode} className="px-2 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[80px] sm:min-w-[120px]">
                                                                    {criteriaCode}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {result?.R?.map(row => (
                                                            <tr key={row.alternative_id} className="hover:bg-gray-50">
                                                                <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                                                                    <div title={`${row.code} - ${row.name}`}>{row.code}</div>
                                                                </td>
                                                                {Object.entries(row).filter(([key]) => !['alternative_id', 'code', 'name'].includes(key)).map(([key, value]) => (
                                                                    <td key={key} className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-600">
                                                                        {value !== null ? parseFloat(value).toFixed(4) : '-'}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Weighted Normalized Matrix Y */}
                                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                            <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-purple-50">
                                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Matriks Ternormalisasi Terbobot (Y)</h3>
                                                <p className="text-xs sm:text-sm text-gray-600">Matriks R dikalikan dengan bobot masing-masing kriteria</p>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[100px] sm:min-w-[150px]">Alternatif</th>
                                                            {result?.Y?.[0] && Object.keys(result.Y[0]).filter(key => !['alternative_id', 'code', 'name'].includes(key)).map(criteriaCode => (
                                                                <th key={criteriaCode} className="px-2 sm:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[80px] sm:min-w-[120px]">
                                                                    {criteriaCode}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {result?.Y?.map(row => (
                                                            <tr key={row.alternative_id} className="hover:bg-gray-50">
                                                                <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 max-w-[100px] sm:max-w-[150px] truncate">
                                                                    <div title={`${row.code} - ${row.name}`}>{row.code}</div>
                                                                </td>
                                                                {Object.entries(row).filter(([key]) => !['alternative_id', 'code', 'name'].includes(key)).map(([key, value]) => (
                                                                    <td key={key} className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-600">
                                                                        {value !== null ? parseFloat(value).toFixed(4) : '-'}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="md:hidden space-y-4">
                                        <MobileMatrixCard
                                            title="Matriks Keputusan (X)"
                                            description="Nilai awal dari setiap alternatif untuk setiap kriteria"
                                            data={result?.X}
                                            matrixType="X"
                                            bgColor="bg-blue-50"
                                        />

                                        <MobileMatrixCard
                                            title="Matriks Ternormalisasi (R)"
                                            description="Hasil normalisasi menggunakan vector normalization"
                                            data={result?.R}
                                            matrixType="R"
                                            bgColor="bg-green-50"
                                        />

                                        <MobileMatrixCard
                                            title="Matriks Ternormalisasi Terbobot (Y)"
                                            description="Matriks R dikalikan dengan bobot masing-masing kriteria"
                                            data={result?.Y}
                                            matrixType="Y"
                                            bgColor="bg-purple-50"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ideal' && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Desktop/Tablet View - Grid Layout untuk Side by Side */}
                                    <div className="hidden md:block">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                            {/* Positive Ideal Solution */}
                                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-green-50">
                                                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Solusi Ideal Positif (A+)</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600">Nilai terbaik untuk setiap kriteria</p>
                                                </div>
                                                <div className="p-3 sm:p-4 lg:p-6">
                                                    <div className="space-y-2 sm:space-y-3">
                                                        {result?.A_plus && Object.entries(result.A_plus).map(([criteria, value]) => (
                                                            <div key={criteria} className="flex items-center justify-between py-1 sm:py-2 border-b border-gray-100 last:border-b-0">
                                                                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate flex-1 min-w-0 pr-2">{criteria}</span>
                                                                <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                                                    {parseFloat(value).toFixed(4)}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Negative Ideal Solution */}
                                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-red-50">
                                                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Solusi Ideal Negatif (A-)</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600">Nilai terburuk untuk setiap kriteria</p>
                                                </div>
                                                <div className="p-3 sm:p-4 lg:p-6">
                                                    <div className="space-y-2 sm:space-y-3">
                                                        {result?.A_minus && Object.entries(result.A_minus).map(([criteria, value]) => (
                                                            <div key={criteria} className="flex items-center justify-between py-1 sm:py-2 border-b border-gray-100 last:border-b-0">
                                                                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate flex-1 min-w-0 pr-2">{criteria}</span>
                                                                <span className="text-xs sm:text-sm font-bold text-red-600 bg-red-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                                                    {parseFloat(value).toFixed(4)}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Card View - Tetap vertikal untuk mobile */}
                                    <div className="md:hidden space-y-4">
                                        <MobileIdealSolutionCard
                                            title="Solusi Ideal Positif (A+)"
                                            description="Nilai terbaik untuk setiap kriteria"
                                            data={result?.A_plus}
                                            type="plus"
                                        />

                                        <MobileIdealSolutionCard
                                            title="Solusi Ideal Negatif (A-)"
                                            description="Nilai terburuk untuk setiap kriteria"
                                            data={result?.A_minus}
                                            type="minus"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'distances' && (
                                <div>
                                    {/* Desktop/Tablet View */}
                                    <div className="hidden md:block bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-orange-50">
                                            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Jarak dan Nilai Preferensi</h3>
                                            <p className="text-xs sm:text-sm text-gray-600">Jarak ke solusi ideal dan perhitungan nilai preferensi akhir</p>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase min-w-[150px] sm:min-w-[200px]">Alternatif</th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase min-w-[120px] sm:min-w-[150px]">D+ (ke ideal positif)</th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase min-w-[120px] sm:min-w-[150px]">D- (ke ideal negatif)</th>
                                                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase min-w-[120px] sm:min-w-[150px]">Nilai Preferensi (V)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {result?.D?.map(row => (
                                                        <tr key={row.alternative_id} className="hover:bg-gray-50">
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                                                <div className="max-w-[130px] sm:max-w-[180px]">
                                                                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate" title={row.name}>{row.name}</div>
                                                                    <div className="text-xs text-gray-500">{row.code}</div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                                                                <span className="text-xs sm:text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                                                                    {row.D_pos}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                                                                <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                                                                    {row.D_neg}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                                                                <span className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-100 px-2 sm:px-3 py-1 rounded-full">
                                                                    {row.V}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="md:hidden">
                                        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Jarak dan Nilai Preferensi</h3>
                                            <p className="text-xs sm:text-sm text-gray-600">Jarak ke solusi ideal dan perhitungan nilai preferensi akhir</p>
                                        </div>

                                        <div className="space-y-0">
                                            {result?.D?.map(row => (
                                                <MobileDistanceCard key={row.alternative_id} item={row} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </div>
    );
}

// resources/js/Pages/Values/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

export default function Index({ matrix, criterias, alternatives, flash }) {
    const [editingCell, setEditingCell] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [localMatrix, setLocalMatrix] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Detect mobile screen size
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Inisialisasi local matrix dengan data dari props
    useEffect(() => {
        if (matrix && matrix.length > 0) {
            setLocalMatrix(matrix);
        }
    }, [matrix]);

    // Show alert when flash message exists
    useEffect(() => {
        if (flash?.success) {
            showAlertNotification(flash.success, 'success');
        }
    }, [flash]);

    // Filter alternatives based on search term
    const filteredMatrix = useMemo(() => {
        if (!searchTerm) return localMatrix;

        return localMatrix.filter(row =>
            row.alternative.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.alternative.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [localMatrix, searchTerm]);

    // Function to show alert notification
    const showAlertNotification = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);

        // Auto hide after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    // Form untuk batch save matrix
    const { data, setData, post, processing } = useForm({
        values: []
    });

    // Handle inline editing
    const handleCellClick = (alternativeId, criteriaId, currentValue) => {
        setEditingCell(`${alternativeId}-${criteriaId}`);
        setTempValue(currentValue || '');
    };

    // Update local matrix ketika nilai berhasil disimpan
    const updateLocalMatrix = (alternativeId, criteriaId, newValue) => {
        setLocalMatrix(prevMatrix =>
            prevMatrix.map(row => {
                if (row.alternative.id === alternativeId) {
                    return {
                        ...row,
                        values: row.values.map(cell => {
                            if (cell.criteria_id === criteriaId) {
                                return {
                                    ...cell,
                                    value: newValue
                                };
                            }
                            return cell;
                        })
                    };
                }
                return row;
            })
        );
    };

    // Updated method for handling cell blur
    const handleCellBlur = (alternativeId, criteriaId) => {
        if (editingCell === `${alternativeId}-${criteriaId}`) {
            setIsSaving(true);

            const finalValue = tempValue === '' ? null : (isNaN(parseFloat(tempValue)) ? null : parseFloat(tempValue));

            // Update local matrix immediately for better UX
            updateLocalMatrix(alternativeId, criteriaId, finalValue);

            router.post(route('values.single'), {
                alternative_id: alternativeId,
                criteria_id: criteriaId,
                value: finalValue
            }, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    setIsSaving(false);
                    setEditingCell(null);
                    // Flash message akan ditangani oleh useEffect
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                    // Revert changes if there's an error
                    const originalValue = matrix.find(row => row.alternative.id === alternativeId)
                        ?.values.find(cell => cell.criteria_id === criteriaId)?.value || null;
                    updateLocalMatrix(alternativeId, criteriaId, originalValue);
                    setIsSaving(false);
                    setEditingCell(null);
                    showAlertNotification('Gagal menyimpan nilai. Silakan coba lagi.', 'error');
                },
                onFinish: () => {
                    setIsSaving(false);
                    setEditingCell(null);
                }
            });
        }
    };

    const handleKeyPress = (e, alternativeId, criteriaId) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
        if (e.key === 'Escape') {
            // Revert to original value on escape
            const originalValue = matrix.find(row => row.alternative.id === alternativeId)
                ?.values.find(cell => cell.criteria_id === criteriaId)?.value || null;
            updateLocalMatrix(alternativeId, criteriaId, originalValue);
            setEditingCell(null);
            setTempValue('');
        }
    };

    // Handle delete alternative values
    const handleDeleteAlternativeValues = (alternative) => {
        setConfirmMessage(`Apakah Anda yakin ingin menghapus semua nilai untuk alternatif "${alternative.name}"?`);
        setConfirmAction(() => () => {
            router.post(route('values.deleteAlternativeValues'), {
                alternative_id: alternative.id
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowConfirmDialog(false);
                    // Update local matrix by clearing values for this alternative
                    setLocalMatrix(prevMatrix =>
                        prevMatrix.map(row => {
                            if (row.alternative.id === alternative.id) {
                                return {
                                    ...row,
                                    values: row.values.map(cell => ({
                                        ...cell,
                                        value: null
                                    }))
                                };
                            }
                            return row;
                        })
                    );
                },
                onError: () => {
                    setShowConfirmDialog(false);
                    showAlertNotification('Gagal menghapus nilai. Silakan coba lagi.', 'error');
                }
            });
        });
        setShowConfirmDialog(true);
    };

    // Handle delete all values
    const handleDeleteAllValues = () => {
        setConfirmMessage('Apakah Anda yakin ingin menghapus SEMUA nilai dari matriks penilaian? Tindakan ini tidak dapat dibatalkan.');
        setConfirmAction(() => () => {
            router.post(route('values.deleteAll'), {}, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowConfirmDialog(false);
                    // Clear all values in local matrix
                    setLocalMatrix(prevMatrix =>
                        prevMatrix.map(row => ({
                            ...row,
                            values: row.values.map(cell => ({
                                ...cell,
                                value: null
                            }))
                        }))
                    );
                },
                onError: () => {
                    setShowConfirmDialog(false);
                    showAlertNotification('Gagal menghapus semua nilai. Silakan coba lagi.', 'error');
                }
            });
        });
        setShowConfirmDialog(true);
    };

    // Clear search term
    const clearSearch = () => {
        setSearchTerm('');
    };

    // Calculate statistics based on local matrix
    const totalAlternatives = alternatives.length;
    const totalCriterias = criterias.length;
    const totalCells = totalAlternatives * totalCriterias;
    const filledCells = localMatrix.reduce((count, row) => {
        return count + row.values.filter(cell => cell.value !== null && cell.value !== '').length;
    }, 0);
    const completionPercentage = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

    // Mobile card view for matrix
    const MobileMatrixCard = ({ row }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-w-full">
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm mb-1">
                        {searchTerm ? (
                            <span dangerouslySetInnerHTML={{
                                __html: row.alternative.code.replace(
                                    new RegExp(`(${searchTerm})`, 'gi'),
                                    '<mark class="bg-yellow-200">$1</mark>'
                                )
                            }} />
                        ) : (
                            row.alternative.code
                        )}
                    </div>
                    <div className="text-xs text-gray-600 break-words pr-2">
                        {searchTerm ? (
                            <span dangerouslySetInnerHTML={{
                                __html: row.alternative.name.replace(
                                    new RegExp(`(${searchTerm})`, 'gi'),
                                    '<mark class="bg-yellow-200">$1</mark>'
                                )
                            }} />
                        ) : (
                            row.alternative.name
                        )}
                    </div>
                </div>
                {row.values.some(cell => cell.value !== null && cell.value !== '') && (
                    <button
                        onClick={() => handleDeleteAlternativeValues(row.alternative)}
                        className="ml-2 p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title={`Hapus semua nilai untuk ${row.alternative.name}`}
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {row.values.map((cell, cellIndex) => {
                    const criteria = criterias.find(c => c.id === cell.criteria_id);
                    return (
                        <div key={`${cell.alternative_id}-${cell.criteria_id}`} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{criteria?.code}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                        criteria?.type === 'cost'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}>
                                        {criteria?.type?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 truncate pr-2">{criteria?.name}</div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                {editingCell === `${cell.alternative_id}-${cell.criteria_id}` ? (
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                        onBlur={() => handleCellBlur(cell.alternative_id, cell.criteria_id)}
                                        onKeyDown={(e) => handleKeyPress(e, cell.alternative_id, cell.criteria_id)}
                                        className="w-16 sm:w-20 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-sm"
                                        autoFocus
                                        disabled={isSaving}
                                    />
                                ) : (
                                    <div
                                        onClick={() => handleCellClick(cell.alternative_id, cell.criteria_id, cell.value)}
                                        className={`w-16 sm:w-20 h-8 flex items-center justify-center cursor-pointer rounded px-2 transition-colors text-sm ${
                                            cell.value !== null && cell.value !== ''
                                                ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                        }`}
                                    >
                                        {cell.value !== null && cell.value !== '' ? cell.value : '-'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Layout Container */}
            <div className="fixed inset-0 flex flex-col">
                {/* AuthenticatedLayout with overlay behavior */}
                <AuthenticatedLayout>
                    <Head title="Matriks Penilaian - DSS RKS" />

                    {/* Main Content Area - scrollable */}
                    <div className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                            {/* Confirmation Dialog */}
                            {showConfirmDialog && (
                                <div className="fixed inset-0 z-50 overflow-y-auto">
                                    <div className="flex items-center justify-center min-h-screen p-4">
                                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                        </div>

                                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
                                            <div className="p-4 sm:p-6">
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                            Konfirmasi Penghapusan
                                                        </h3>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {confirmMessage}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                                                <button
                                                    type="button"
                                                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                                                    onClick={() => setShowConfirmDialog(false)}
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                                    onClick={confirmAction}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Custom Alert Notification */}
                            {showAlert && (
                                <div className={`fixed top-4 right-4 max-w-sm z-50 transition-all duration-300 transform ${
                                    showAlert ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                                }`}>
                                    <div className={`rounded-lg shadow-lg p-4 ${
                                        alertType === 'success'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                    }`}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {alertType === 'success' ? (
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586 4.293 4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium">{alertMessage}</p>
                                            </div>
                                            <div className="ml-3">
                                                <button
                                                    onClick={() => setShowAlert(false)}
                                                    className="text-white hover:text-gray-200 focus:outline-none"
                                                >
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Header */}
                            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Matriks Penilaian</h1>
                                    <p className="text-sm sm:text-base text-gray-600">Masukkan nilai untuk setiap alternatif terhadap setiap kriteria</p>
                                </div>
                                {isSaving && (
                                    <div className="flex items-center text-blue-600 text-sm sm:text-base">
                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                        </svg>
                                        Menyimpan...
                                    </div>
                                )}
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                                {/* Total Alternatif */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Alternatif</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalAlternatives}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Kriteria */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Kriteria</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{totalCriterias}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Cell Terisi */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Cell Terisi</p>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{filledCells}/{totalCells}</p>
                                        </div>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Kelengkapan */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Kelengkapan</p>
                                            <p className={`text-lg sm:text-xl lg:text-2xl font-bold truncate ${
                                                completionPercentage === 100 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {completionPercentage}%
                                            </p>
                                        </div>
                                        <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-1 ${
                                            completionPercentage === 100
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                                                : 'bg-gradient-to-br from-orange-500 to-red-500'
                                        }`}>
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                {completionPercentage === 100 ? (
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                ) : (
                                                    <>
                                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                                    </>
                                                )}
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Information Alert */}
                            <div className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-blue-800 mb-1">Cara Mengisi Matriks</h3>
                                        <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                                            Klik pada cell untuk mengedit nilai. Tekan Enter untuk menyimpan atau Esc untuk membatalkan.
                                            Nilai akan tersimpan otomatis saat cell kehilangan fokus.
                                        </p>
                                        <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                                            Anda juga dapat mengisi nilai melalui pertanyaan yang ada pada menu Opsi Kebijakan.
                                        </p>
                                        <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                                            Pastikan kelengkapan mencapai 100% sebelum melanjutkan ke tahap berikutnya.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Matrix Content */}
                            {totalAlternatives === 0 || totalCriterias === 0 ? (
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                    <div className="text-center">
                                        <div className="text-gray-400 mb-4">
                                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Matriks Belum Tersedia</h3>
                                        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                                            {totalAlternatives === 0 && totalCriterias === 0
                                                ? "Belum ada alternatif dan kriteria. Silakan tambahkan terlebih dahulu."
                                                : totalAlternatives === 0
                                                ? "Belum ada alternatif. Silakan tambahkan alternatif terlebih dahulu."
                                                : "Belum ada kriteria. Silakan hubungi admin untuk menambahkan kriteria."
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop/Tablet Table View */}
                                    <div className="hidden md:block bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Tabel Matriks Penilaian</h2>

                                                <div className="flex items-center space-x-3">
                                                    {/* Search Bar */}
                                                    <div className="relative w-full sm:w-72 lg:w-96">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Cari berdasarkan kode atau nama alternatif..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                                        />
                                                        {searchTerm && (
                                                            <button
                                                                onClick={clearSearch}
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                                title="Hapus pencarian"
                                                            >
                                                                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>

                                                    {filledCells > 0 && (
                                                        <button
                                                            onClick={handleDeleteAllValues}
                                                            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                            </svg>
                                                            Hapus Semua
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Search Results Info */}
                                            {searchTerm && (
                                                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                                                    Menampilkan {filteredMatrix.length} dari {localMatrix.length} alternatif untuk "{searchTerm}"
                                                    {filteredMatrix.length === 0 && (
                                                        <span className="text-red-600 ml-1">- Tidak ada data yang ditemukan</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50 border-b border-gray-200">
                                                    <tr>
                                                        <th className="px-3 sm:px-4 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 border-r border-gray-200 min-w-[120px] max-w-[160px]">
                                                            OPSI KEBIJAKAN
                                                        </th>
                                                        {criterias.map((criteria) => (
                                                            <th key={criteria.id} className="px-2 sm:px-3 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 min-w-[80px] max-w-[120px]">
                                                                <div className="space-y-1">
                                                                    <div className="font-bold">{criteria.code}</div>
                                                                    <div className="font-normal text-gray-400 text-xs max-w-[100px] mx-auto leading-tight truncate">
                                                                        {criteria.name}
                                                                    </div>
                                                                    <div className={`inline-flex px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                                                                        criteria.type === 'cost'
                                                                            ? 'bg-red-100 text-red-700'
                                                                            : 'bg-green-100 text-green-700'
                                                                    }`}>
                                                                        {criteria.type.toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            </th>
                                                        ))}
                                                        <th className="px-2 sm:px-3 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]">
                                                            AKSI
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredMatrix.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={criterias.length + 2} className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500">
                                                                {searchTerm ? (
                                                                    <div>
                                                                        <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                                        </svg>
                                                                        <p className="text-sm sm:text-base mb-2">Tidak ada alternatif yang cocok dengan pencarian "{searchTerm}"</p>
                                                                        <button
                                                                            onClick={clearSearch}
                                                                            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                                                                        >
                                                                            Hapus filter pencarian
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                                        </svg>
                                                                        <p className="text-sm sm:text-base">Belum ada data matriks yang tersedia</p>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredMatrix.map((row, rowIndex) => (
                                                            <tr key={row.alternative.id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-3 sm:px-4 py-3 sm:py-4 sticky left-0 bg-white border-r border-gray-200">
                                                                    <div className="space-y-1">
                                                                        <div className="font-medium text-gray-900 text-sm">
                                                                            {searchTerm ? (
                                                                                <span dangerouslySetInnerHTML={{
                                                                                    __html: row.alternative.code.replace(
                                                                                        new RegExp(`(${searchTerm})`, 'gi'),
                                                                                        '<mark class="bg-yellow-200">$1</mark>'
                                                                                    )
                                                                                }} />
                                                                            ) : (
                                                                                row.alternative.code
                                                                            )}
                                                                        </div>
                                                                        <div className="text-xs sm:text-sm text-gray-600 max-w-[140px] truncate">
                                                                            {searchTerm ? (
                                                                                <span dangerouslySetInnerHTML={{
                                                                                    __html: row.alternative.name.replace(
                                                                                        new RegExp(`(${searchTerm})`, 'gi'),
                                                                                        '<mark class="bg-yellow-200">$1</mark>'
                                                                                    )
                                                                                }} />
                                                                            ) : (
                                                                                row.alternative.name
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {row.values.map((cell, cellIndex) => (
                                                                    <td key={`${cell.alternative_id}-${cell.criteria_id}`} className="px-2 sm:px-3 py-3 sm:py-4 text-center border-r border-gray-200">
                                                                        {editingCell === `${cell.alternative_id}-${cell.criteria_id}` ? (
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={tempValue}
                                                                                onChange={(e) => setTempValue(e.target.value)}
                                                                                onBlur={() => handleCellBlur(cell.alternative_id, cell.criteria_id)}
                                                                                onKeyDown={(e) => handleKeyPress(e, cell.alternative_id, cell.criteria_id)}
                                                                                className="w-full px-1.5 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-sm max-w-[80px]"
                                                                                autoFocus
                                                                                disabled={isSaving}
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                onClick={() => handleCellClick(cell.alternative_id, cell.criteria_id, cell.value)}
                                                                                className={`min-h-[32px] flex items-center justify-center cursor-pointer rounded px-1.5 py-1 transition-colors text-sm mx-auto max-w-[80px] ${
                                                                                    cell.value !== null && cell.value !== ''
                                                                                        ? 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                                                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                                                }`}
                                                                            >
                                                                                {cell.value !== null && cell.value !== '' ? cell.value : '-'}
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                ))}
                                                                <td className="px-2 sm:px-3 py-3 sm:py-4 text-center">
                                                                    {row.values.some(cell => cell.value !== null && cell.value !== '') && (
                                                                        <button
                                                                            onClick={() => handleDeleteAlternativeValues(row.alternative)}
                                                                            className="inline-flex items-center p-1.5 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                                            title={`Hapus semua nilai untuk ${row.alternative.name}`}
                                                                        >
                                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Table Footer */}
                                        <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                                                <div>
                                                    {searchTerm ? (
                                                        `Menampilkan ${filteredMatrix.length} dari ${localMatrix.length} alternatif untuk "${searchTerm}"`
                                                    ) : (
                                                        `Menampilkan ${localMatrix.length} alternatif × ${totalCriterias} kriteria = ${totalCells} cell`
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                                        <span>Terisi ({filledCells})</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                                                        <span>Kosong ({totalCells - filledCells})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="md:hidden">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 bg-white rounded-lg border border-gray-200 p-3">
                                            <h2 className="text-base font-semibold text-gray-900">Matriks Penilaian</h2>

                                            <div className="flex items-center space-x-2">
                                                {/* Search Bar Mobile */}
                                                <div className="relative flex-1 min-w-0">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Cari alternatif..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="block w-full pl-8 pr-8 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                                    />
                                                    {searchTerm && (
                                                        <button
                                                            onClick={clearSearch}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                            title="Hapus pencarian"
                                                        >
                                                            <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>

                                                {filledCells > 0 && (
                                                    <button
                                                        onClick={handleDeleteAllValues}
                                                        className="inline-flex items-center px-2 py-1 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                    >
                                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                        </svg>
                                                        Hapus Semua
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Search Results Info Mobile */}
                                        {searchTerm && (
                                            <div className="mb-3 text-xs text-gray-600 bg-white rounded-lg border border-gray-200 p-3">
                                                Menampilkan {filteredMatrix.length} dari {localMatrix.length} alternatif untuk "{searchTerm}"
                                                {filteredMatrix.length === 0 && (
                                                    <span className="text-red-600 ml-1">- Tidak ada data yang ditemukan</span>
                                                )}
                                            </div>
                                        )}

                                        <div className="space-y-0">
                                            {filteredMatrix.length === 0 ? (
                                                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center text-gray-500">
                                                    {searchTerm ? (
                                                        <div>
                                                            <svg className="mx-auto h-8 w-8 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                                            </svg>
                                                            <p className="text-sm mb-2">Tidak ada alternatif yang cocok dengan pencarian "{searchTerm}"</p>
                                                            <button
                                                                onClick={clearSearch}
                                                                className="text-blue-600 hover:text-blue-800 text-xs"
                                                            >
                                                                Hapus filter pencarian
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <svg className="mx-auto h-8 w-8 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                                            </svg>
                                                            <p className="text-sm">Belum ada data matriks yang tersedia</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                filteredMatrix.map((row) => (
                                                    <MobileMatrixCard key={row.alternative.id} row={row} />
                                                ))
                                            )}
                                        </div>

                                        {/* Mobile Footer Stats */}
                                        <div className="bg-white rounded-lg border border-gray-200 p-3 mt-3">
                                            <div className="text-center text-sm text-gray-600 mb-2">
                                                {searchTerm ? (
                                                    `${filteredMatrix.length} alternatif × ${totalCriterias} kriteria`
                                                ) : (
                                                    `${localMatrix.length} alternatif × ${totalCriterias} kriteria = ${totalCells} cell`
                                                )}
                                            </div>
                                            <div className="flex justify-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                                    <span className="text-sm text-gray-600">Terisi ({filledCells})</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                                                    <span className="text-sm text-gray-600">Kosong ({totalCells - filledCells})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Information Cards */}
                            <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                {/* Progress Bar Card */}
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Progress Pengisian</h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Kelengkapan Data</span>
                                            <span className="text-sm font-semibold text-gray-900">{completionPercentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${completionPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 text-center">
                                            {filledCells} dari {totalCells} cell sudah terisi
                                        </div>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
                                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tips Pengisian</h3>
                                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span>Klik pada cell untuk mulai mengedit nilai</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span>Gunakan angka desimal dengan titik (.) sebagai pemisah</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span>Tekan Enter untuk menyimpan atau Esc untuk membatalkan</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span>Data tersimpan otomatis setelah Anda klik di tempat lain</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span>Gunakan tombol hapus untuk menghapus data per baris atau semua</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </div>
    );
}

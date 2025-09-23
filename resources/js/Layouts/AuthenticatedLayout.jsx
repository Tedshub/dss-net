import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Jika sidebar terbuka dan klik di luar sidebar, tutup sidebar
            if (sidebarExpanded && !event.target.closest('.sidebar')) {
                setSidebarExpanded(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [sidebarExpanded]);

    // Handler untuk klik item navigasi
    const handleNavigationClick = (e, item) => {
        // Jika sidebar belum terbuka, buka dulu dan prevent navigasi
        if (!sidebarExpanded) {
            e.preventDefault();
            setSidebarExpanded(true);
            return;
        }

        // Jika tidak ada route (placeholder), prevent navigasi
        if (!item.route) {
            e.preventDefault();
            return;
        }

        // Jika ada route dan sidebar sudah terbuka, lanjutkan navigasi
        // Link component akan handle navigasi secara otomatis
    };

    // Handler untuk klik area sidebar (bukan item navigasi)
    const handleSidebarClick = (e) => {
        // Jika klik pada area sidebar tapi bukan pada item navigasi
        if (e.target.closest('.sidebar') && !e.target.closest('.nav-item')) {
            if (!sidebarExpanded) {
                setSidebarExpanded(true);
            }
        }
    };

    // Daftar semua navigation items
    const allNavigationItems = [
        {
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
            ),
            route: 'dashboard',
            active: route().current('dashboard'),
            allowedRoles: ['admin', 'guest'] // Semua role bisa akses
        },
        {
            name: 'Kriteria',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            ),
            route: null, // Akan menggunakan # sebagai placeholder
            active: false,
            allowedRoles: ['admin'] // Hanya admin yang bisa akses
        },
        {
            name: 'Opsi Kebijakan',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
            ),
            route: null, // Akan menggunakan # sebagai placeholder
            active: false,
            allowedRoles: ['admin', 'guest'] // Semua role bisa akses
        },
        {
            name: 'Matrix Penilaian',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
            ),
            route: null, // Akan menggunakan # sebagai placeholder
            active: false,
            allowedRoles: ['admin', 'guest'] // Semua role bisa akses
        },
        {
            name: 'Hitung',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
            ),
            route: null, // Akan menggunakan # sebagai placeholder
            active: false,
            allowedRoles: ['admin', 'guest'] // Semua role bisa akses
        }
    ];

    // Filter navigation items berdasarkan role user
    const navigationItems = allNavigationItems.filter(item =>
        item.allowedRoles.includes(user.role)
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div
                className={`sidebar fixed inset-y-0 left-0 z-50 bg-white shadow-xl transition-all duration-300 ease-in-out ${
                    sidebarExpanded ? 'w-64' : 'w-16'
                }`}
                onClick={handleSidebarClick}
            >
                {/* Logo */}
                <div className="flex items-center h-16 px-4 border-b border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">DSS</span>
                    </div>
                    <span className={`ml-3 text-gray-800 font-bold text-lg transition-all duration-300 ${
                        sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'
                    }`}>
                        DSS RKS
                    </span>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-8">
                    <div className="px-3 space-y-2">
                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.route ? route(item.route) : '#'}
                                className={`nav-item flex items-center px-3 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                                    item.active
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                onClick={(e) => handleNavigationClick(e, item)}
                            >
                                <div className={`flex-shrink-0 transition-colors ${
                                    item.active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                                }`}>
                                    {item.icon}
                                </div>
                                <span className={`ml-3 font-medium transition-all duration-300 ${
                                    sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'
                                }`}>
                                    {item.name}
                                </span>

                                {/* Tooltip untuk saat sidebar tertutup */}
                                {!sidebarExpanded && (
                                    <div className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                        {item.name}
                                        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Status indicator untuk behavior */}
                {!sidebarExpanded && (
                    <div className="absolute bottom-4 left-4">
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded opacity-75">
                            Click to expand
                        </div>
                    </div>
                )}

                {/* Role indicator (optional) */}
                {sidebarExpanded && (
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded text-center border">
                            Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarExpanded ? 'ml-64' : 'ml-16'
            }`}>

                {/* Top Navigation */}
                <nav className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Page Title */}
                            <div>
                                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Dashboard</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* User Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <div className="text-sm font-medium">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.role}</div>
                                            </div>
                                            <svg className="w-4 h-4 hidden md:inline" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </div>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                                </svg>
                                                <span>Profile</span>
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full"
                                        >
                                            <div className="flex items-center space-x-2 text-red-600">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                                                </svg>
                                                <span>Log Out</span>
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

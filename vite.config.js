// Ini config vite default

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});


// I config vite untuk akses dari device lain di jaringan lokal
// php artisan serve --host=192.168.50.133 --port=8000

// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: true,
//         }),
//         react(),
//     ],
//     server: {
//         host: '0.0.0.0',   // biar bisa diakses dari device lain via IPv4
//         port: 5173,        // default Vite port
//         hmr: {
//             host: '192.168.50.133',  // IP PC kamu
//         },
//     },
// });

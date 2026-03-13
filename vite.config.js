import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId?.replace(/\\/g, '/');

                    if (facadeModuleId?.endsWith('resources/js/app.js')) {
                        return 'assets/app.js';
                    }

                    return 'assets/[name].js';
                },
                chunkFileNames: 'assets/[name].js',
                assetFileNames: ({ names = [] }) => {
                    const assetName = names[0] ?? '';

                    if (assetName.endsWith('.css')) {
                        return 'assets/[name].css';
                    }

                    return 'assets/[name].[ext]';
                },
            },
        },
    },
});

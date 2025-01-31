import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import terser from '@rollup/plugin-terser'
import path from 'path'

// Extend the UserConfigExport type to include performance configuration
type ExtendedUserConfigExport = UserConfigExport & {
  performance?: {
    hints?: 'warning' | 'error' | false,
    maxEntrypointSize?: number,
    maxAssetSize?: number
  }
}

const config: ExtendedUserConfigExport = defineConfig({
  plugins: [
    vue({
      script: {
        reactivityTransform: true
      },
      template: {
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    }),
    dts({
      outDir: 'dist',
      include: ['src'],
      beforeWriteFile: (filePath, content) => {
        return { filePath, content }
      }
    }),
    visualizer({
      filename: './stats.html',
      open: false,
      brotliSize: true,
      gzipSize: true,
      emitFile: false
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'FoundationUI',
      fileName: (format) => `foundation-ui.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    minify: 'terser',
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        terser({
          compress: {
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            unused: true,
            warnings: false
          }
        })
      ]
    },
    chunkSizeWarningLimit: 500,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 250000,
    maxAssetSize: 250000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,vue}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})

export default config

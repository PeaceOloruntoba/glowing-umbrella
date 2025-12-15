import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
        // inject variables globally; note the trailing newline
        additionalData: `@use "/src/styles/variables.scss" as *;\n`,
      },
    },
  },
})

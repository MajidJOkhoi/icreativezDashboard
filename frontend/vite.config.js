import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
server:{
  proxy: {
    '/api': "https://backend-production-6e95.up.railway.app"
  },
},
  plugins: [react()],
  resolve: {

    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  
}})

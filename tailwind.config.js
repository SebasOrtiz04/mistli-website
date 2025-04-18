import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',  // Asegúrate de que las rutas sean correctas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})

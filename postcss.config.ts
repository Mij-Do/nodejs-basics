export default {
    plugins: {
        '@tailwindcss/postcss': {
            base: process.cwd(),
            content: ['./views/**/*.pug', './public/**/*.css']
        }
    }
}
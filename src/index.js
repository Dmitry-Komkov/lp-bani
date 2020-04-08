// JS
import './js/'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Загрузка SVG-sprite
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('./assets/img/svg/', true, /\.svg$/));

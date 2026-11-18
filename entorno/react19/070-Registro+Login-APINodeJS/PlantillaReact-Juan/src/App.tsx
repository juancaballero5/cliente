import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header class="header">
        <div class="header-content">
          <p class="header-title">Ejercicios – FUNDAMENTOS DE JS (ES6)</p>
          <p class="header-subtitle">Desarrollo WEB en entorno cliente</p>
          <p class="header-tagline">Texturas y tipografía</p>
        </div>
        <div class="header-profile">
          <img src="./img/user.png" alt="Foto de perfil">
        </div>
      </header>

      <nav>
        <ul class="navbar">
          <li><a href="https://www.w3schools.com/js/default.asp">w3schools</a></li>
          <li><a href="https://es.javascript.info/js">javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript">MDN</a></li>
          <li class="dropdown">
            <a href="#" aria-haspopup="true">Ejercicios</a>
            <ul class="dropdown-content" aria-label="Submenú de ejercicios">
              <li><a href="./ejercicios/ejer01/index.html">Página en su carpeta</a></li>
              <li><a href="./ejercicios/ejer02/index.html">Otra página, otra URL</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <main>
        <section class="intro">
          <h1>Bienvenido</h1>
          <p>Selecciona un ejercicio desde el menú superior para empezar.</p>
        </section>
      </main>

      <footer class="footer">
        © José García ☺
      </footer>
    </>
  )
}

export default App

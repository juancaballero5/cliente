import { Link, Route, Routes } from 'react-router'
import Inicio from './inicio/Inicio.tsx'
import CrudLocalStorage from './crud-local-storage/CrudLocalStorage.tsx'
import CrudIndexedDb from './crud-indexed-db/CrudIndexedDb.tsx'
import CrudApiNode from './crud-api-node/CrudApiNode.tsx'

function App() {

  return (
    <>
      <header className="header">
        <div className="header-content">
          <p className="header-title">Ejercicios – React 19</p>
          <p className="header-subtitle">Desarrollo WEB en entorno cliente</p>
          <p className="header-tagline">Plantilla</p>
        </div>
        <div className="header-profile">
          <img src="/img/user.png" alt="Foto de perfil" />
        </div>
      </header>

      <nav>
        <ul className="navbar">
          <li><a href="https://www.w3schools.com/js/default.asp">w3schools</a></li>
          <li><a href="https://es.javascript.info/js">javascript.info</a></li>
          <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript">MDN</a></li>
          <li className="dropdown">
            <a href="#" aria-haspopup="true">localStorage</a>
            <ul className="dropdown-content" aria-label="Submenú de localStorage">
              <li><Link to="/crud-local-storage">CRUD localStorage</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" aria-haspopup="true">IndexedDB</a>
            <ul className="dropdown-content" aria-label="Submenú de IndexedDB">
              <li><Link to="/crud-indexed-db">CRUD IndexedDB</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" aria-haspopup="true">APINodeJS</a>
            <ul className="dropdown-content" aria-label="Submenú de APINodeJS">
              <li><Link to="/crud-api-node">CRUD APINodeJS</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/crud-local-storage" element={<CrudLocalStorage />} />
          <Route path="/crud-indexed-db" element={<CrudIndexedDb />} />
          <Route path="/crud-api-node" element={<CrudApiNode />} />
        </Routes>
      </main>

      <footer className="footer">
        © José García ☺
      </footer>
    </>
  )
}

export default App

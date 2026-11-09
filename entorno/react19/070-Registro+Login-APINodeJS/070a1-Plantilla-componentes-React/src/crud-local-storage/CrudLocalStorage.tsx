import '../tarjeta.css'
import { Link } from "react-router";

function CrudLocalStorage() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="cardTitle">Usuarios en localStorage</h1>
        <div className="cardBody">
          <form id="formulario" action="#">
            <p>Guardamos las cuentas juntas en <code>localStorage</code>.</p>
            <p>Clave: <code>usuarios</code>. El valor es un objeto JSON con todas las cuentas.</p>
            <p>Cada cuenta añade la dirección. <br />La foto se guarda como texto. <br />Si la casilla pide un <code>Blob</code>, se convierte antes de guardar.</p>
            <p>Pedir a la API rellena el formulario. <br />El nombre, el teléfono y la dirección salen de randomuser. <br />La casilla elige la foto: <br />  - marcada, un <code>Blob</code> de otra API; <br />  - sin marcar, la dirección de la miniatura de randomuser.</p>
            <p>
              <label htmlFor="nombre">Nombre: </label>
              <input id="nombre" type="text" autocomplete="name" placeholder="Nombre real" />
            </p>
            <p>
              <label htmlFor="usuario">Usuario: </label>
              <input id="usuario" type="text" autocomplete="username" placeholder="Nombre de usuario" />
            </p>
            <p>
              <label htmlFor="password">Contraseña: </label>
              <input id="password" type="password" autocomplete="new-password" placeholder="Contraseña" />
            </p>
            <p>
              <label htmlFor="telefono">Teléfono: </label>
              <input id="telefono" type="tel" autocomplete="tel" placeholder="Opcional (9 dígitos)" />
            </p>
            <p>
              <label htmlFor="email">Email: </label>
              <input id="email" type="email" autocomplete="email" placeholder="Opcional" />
            </p>
            <p>
              <label htmlFor="calle">Calle: </label>
              <input id="calle" type="text" autocomplete="street-address" placeholder="Opcional" />
            </p>
            <p>
              <label htmlFor="cp">Código postal: </label>
              <input id="cp" type="text" inputmode="numeric" placeholder="Opcional (5 dígitos)" />
            </p>
            <p>
              <label htmlFor="ciudad">Ciudad: </label>
              <input id="ciudad" type="text" autocomplete="address-level2" placeholder="Opcional" />
            </p>
            <p>
              <label htmlFor="provincia">Provincia: </label>
              <input id="provincia" type="text" autocomplete="address-level1" placeholder="Opcional" />
            </p>
            <p>
              <label htmlFor="imagen">Imagen: </label>
              <input id="imagen" type="file" accept="image/*" />
            </p>
            <p>
              <img id="preview" alt="Vista previa de la foto" width="80" height="80" hidden />
            </p>
            <p>
              <input id="fotoBlob" type="checkbox" />
              <label htmlFor="fotoBlob">Foto como Blob (Dicebear). Sin marcar, miniatura de randomuser.</label>
            </p>
            <p>
              <button id="guardar" type="button">Guardar</button>&nbsp;
              <button id="leer" type="button">Leer</button>&nbsp;
              <button id="borrar" type="button">Borrar</button>&nbsp;
              <button id="esperar" type="button">Simular espera (10 s)</button>&nbsp;
              <button id="pedirAPI" type="button">Pedir a la API</button>
            </p>
            <p>El botón de espera no bloquea la página: <br /> puedes seguir escribiendo y guardar una cuenta.</p>
            <div id="resultado"></div>
          </form>
        </div>
        <div className="cardFooter">
          <Link to="/">&gt;&gt; Página principal</Link>
        </div>
      </div>
    </div >

  )
}
export default CrudLocalStorage

import React from "react";

export const HeaderComconent = () => {
    return(
        <div>
           <header >
            <nav className="navbar navbar-expand-md navbar-dark dg-darh">
                 <div>
                 <a href="/"className="navbar-brand">Estancias</a>
                </div>
            </nav>
            <nav className="navbar navbar-expand-md navbar-dark dg-darh">
                 <div>
                 <a href="/duenos"className="navbar-brand">gestion dueños</a>
                 <a href="/marcas"className="navbar-brand">gestion Marcas</a>
                 <a href="/tipos-vehiculo"className="navbar-brand">gestion tipo vehiculo</a>
                 <a href="/empleados"className="navbar-brand">gestion empleados</a>
                 <a href="/vehiculos"className="navbar-brand">gestion vehiculos</a>
                 <a href="/pagos"className="navbar-brand">gestion pagos</a>
                </div>
            </nav>

           </header>
            </div>
    )
}
export default HeaderComconent;

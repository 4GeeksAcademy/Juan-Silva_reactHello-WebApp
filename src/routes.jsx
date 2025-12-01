// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Ruta principal - Lista de contactos */}
        <Route path="/" element={<Contact />} />
        {/* Ruta para agregar o editar contacto */}
        <Route path="/add-contact" element={<AddContact />} />
        
      </Route>
    )
);
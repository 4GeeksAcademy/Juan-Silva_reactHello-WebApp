// pages/Contact.jsx
// Vista principal que muestra la lista completa de contactos

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactsServices from '../servicios/contactsServices';
import ContactCard from '../components/ContactCard';

const Contact = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        loadContacts();
    }, []);

    // Función para cargar los contactos desde la API
    const loadContacts = async () => {
        try {
            // Activar estado de carga
            dispatch({ type: 'SET_LOADING', payload: { loading: true } });

            // Primero, crear la agenda si no existe
            await contactsServices.createAgenda(store.agendaSlug);

            // Luego obtener los contactos
            const data = await contactsServices.getContacts(store.agendaSlug);

            // Guardar los contactos en el store
            dispatch({
                type: 'SET_CONTACTS',
                payload: { contacts: data.contacts || [] }
            });
        } catch (error) {
            console.error('Error al cargar contactos:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: { error: 'Error al cargar los contactos: ' + error.message }
            });
        }
    };

    // Función para ir a la vista de agregar contacto
    const handleAddContact = () => {
        // Limpiar cualquier contacto seleccionado
        dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
        // Navegar a la vista de agregar contacto
        navigate('/add-contact');
    };

    return (
        <div className="container mt-5">
            {/* Encabezado con título y botón */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Lista de Contactos</h1>
                <button
                    className="btn btn-success"
                    onClick={handleAddContact}
                >
                    Agregar nuevo contacto
                </button>
            </div>

            {/* Mostrar mensaje de carga */}
            {store.loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            {/* Mostrar mensajes de error */}
            {store.error && (
                <div className="alert alert-danger" role="alert">
                    {store.error}
                </div>
            )}

            {/* Mostrar mensaje si no hay contactos */}
            {!store.loading && store.contacts.length === 0 && (
                <div className="alert alert-info" role="alert">
                    No hay contactos. ¡Agrega tu primer contacto!
                </div>
            )}

            {/* Lista de contactos */}
            <div className="contacts-list">
                {store.contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                    />
                ))}
            </div>
        </div>
    );
};

export default Contact;
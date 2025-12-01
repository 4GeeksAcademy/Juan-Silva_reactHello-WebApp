import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactsServices from '../servicios/contactsServices';

const AddContact = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    // Estados locales para el formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // Si hay contacto seleccionado, cargar datos en el formulario
    useEffect(() => {
        if (store.selectedContact) {
            setFormData({
                name: store.selectedContact.name || '',
                email: store.selectedContact.email || '',
                phone: store.selectedContact.phone || '',
                address: store.selectedContact.address || ''
            });
        }
    }, [store.selectedContact]);

    // Se ejecuta cada vez que el usuario escribe en un input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            dispatch({ type: 'SET_LOADING', payload: { loading: true } });

            // Si hay un contacto seleccionado, actualizamos; si no, creamos uno nuevo
            if (store.selectedContact) {
                // ACTUALIZAR contacto existente
                const updatedContact = await contactsServices.updateContact(
                    store.agendaSlug,
                    store.selectedContact.id,
                    formData
                );
                
                dispatch({ 
                    type: 'UPDATE_CONTACT', 
                    payload: { contact: updatedContact } 
                });
                
                alert('Contacto actualizado exitosamente');
            } else {
                // CREAR nuevo contacto
                const newContact = await contactsServices.createContact(
                    store.agendaSlug,
                    formData
                );
                
                dispatch({ 
                    type: 'ADD_CONTACT', 
                    payload: { contact: newContact } 
                });
                
                alert('Contacto creado exitosamente');
            }

            // Volver a la lista de contactos
            navigate('/');
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            dispatch({ 
                type: 'SET_ERROR', 
                payload: { error: 'Error al guardar el contacto' } 
            });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="mb-4">
                        {store.selectedContact ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}
                    </h1>

                    <form onSubmit={handleSubmit}>
                        {/* Campo Nombre */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa el nombre completo"
                            />
                        </div>

                        {/* Campo Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa el email"
                            />
                        </div>

                        {/* Campo Teléfono */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Ingresa el teléfono"
                            />
                        </div>

                        {/* Campo Dirección */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Dirección
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Ingresa la dirección"
                            />
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-between">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={store.loading}
                            >
                                {store.loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/')}
                            >
                                Volver a contactos
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
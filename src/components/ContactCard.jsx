import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactsServices from '../servicios/contactsServices';

const ContactCard = ({ contact }) => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de eliminar a ${contact.name}?`)) {
            try {
                dispatch({ type: 'SET_LOADING', payload: { loading: true } });
                await contactsServices.deleteContact(store.agendaSlug, contact.id);
                dispatch({
                    type: 'DELETE_CONTACT',
                    payload: { contactId: contact.id }
                });
                alert('Contacto eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar:', error);
                dispatch({
                    type: 'SET_ERROR',
                    payload: { error: 'Error al eliminar el contacto' }
                });
            }
        }
    };

    const handleEdit = () => {
        dispatch({
            type: 'SELECT_CONTACT',
            payload: { contact }
        });
        navigate('/add-contact');
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row align-items-center">
                    {/* Imagen del contacto */}
                    <div className="col-md-2 text-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&size=100`}
                            alt={contact.name}
                            className="rounded-circle"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>

                    {/* Información del contacto */}
                    <div className="col-md-8">
                        <h5 className="card-title mb-2">{contact.name}</h5>
                        <p className="card-text mb-1">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {contact.address}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fas fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="card-text mb-0">
                            <i className="fas fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>

                    {/* Botones de acción - Sin rectángulo */}
                    <div className="col-md-2 text-end">
                        <button
                            className="btn btn-link text-primary p-0 me-2"
                            onClick={handleEdit}
                            title="Editar contacto"
                        >
                            <i className="fas fa-edit fs-5"></i>
                        </button>
                        <button
                            className="btn btn-link text-danger p-0"
                            onClick={handleDelete}
                            title="Eliminar contacto"
                        >
                            <i className="fas fa-trash fs-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
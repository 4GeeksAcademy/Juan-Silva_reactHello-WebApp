const BASE_URL = 'https://playground.4geeks.com/contact';

const contactsServices = {
    // Crear una agenda (usuario) si no existe
    createAgenda: async (agendaSlug) => {
        try {
            const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            // Si devuelve 201, se creó exitosamente
            // Si devuelve 400, probablemente ya existe (lo cual está bien)
            if (response.ok || response.status === 400) {
                const data = await response.json();
                return data;
            }
            
            throw new Error(`Error ${response.status}: No se pudo crear la agenda`);
        } catch (error) {
            console.error('Error en createAgenda:', error);
            throw error;
        }
    },

    // Obtener todos los contactos de una agenda específica
    getContacts: async (agendaSlug) => {
        try {
            const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudieron obtener los contactos`);
            }
            
            const data = await response.json();
            // La API devuelve un objeto con la propiedad 'contacts'
            return data;
        } catch (error) {
            console.error('Error en getContacts:', error);
            throw error;
        }
    },

    // Crear un nuevo contacto
    createContact: async (agendaSlug, contactData) => {
        try {
            // La API espera: name, email, phone, address
            const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: contactData.name,
                    email: contactData.email,
                    phone: contactData.phone,
                    address: contactData.address
                })
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo crear el contacto`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en createContact:', error);
            throw error;
        }
    },

    // Actualizar un contacto existente
    updateContact: async (agendaSlug, contactId, contactData) => {
        try {
            const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: contactData.name,
                    email: contactData.email,
                    phone: contactData.phone,
                    address: contactData.address
                })
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo actualizar el contacto`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en updateContact:', error);
            throw error;
        }
    },

    // Eliminar un contacto
    deleteContact: async (agendaSlug, contactId) => {
        try {
            const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo eliminar el contacto`);
            }
            
            return true;
        } catch (error) {
            console.error('Error en deleteContact:', error);
            throw error;
        }
    }
};

export default contactsServices;
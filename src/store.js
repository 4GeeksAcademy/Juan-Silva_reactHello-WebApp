export const initialStore=()=>{
  return{
    contacts: [],  
    agendaSlug: 'MiAgenda20252', 
    selectedContact: null, 
    loading: false, // Indicador de carga
    error: null,
    message: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    // Guardar los contactos en el store
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload.contacts,
        loading: false,
        error: null
      }

    // Agregar nuevo contacto 
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload.contact],
        loading: false,
        error: null
      }
    
    // Actualizar un contacto existente
    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.contact.id 
            ? action.payload.contact 
            : contact
        ),
        selectedContact: null,
        loading: false,
        error: null
      }  

    
      // Eliminar un contacto
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => 
          contact.id !== action.payload.contactId
        ),
        loading: false,
        error: null
      }
    
    // Seleccionar un contacto para editar
    case 'SELECT_CONTACT':
      return {
        ...store,
        selectedContact: action.payload.contact
      }
    
    // Limpiar el contacto seleccionado
    case 'CLEAR_SELECTED_CONTACT':
      return {
        ...store,
        selectedContact: null
      }
    
     // Activar estado de carga
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload.loading
      }  
    


    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}

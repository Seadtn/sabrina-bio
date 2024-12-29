import { PageContainer } from '@toolpad/core'
import React, { useState } from 'react'
import ContactTable from './ContactTable'
import ContactModal from './ContactModal'
function ContactDashboard({contacts,setContacts}) {
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);


    const handleViewContact = (contact) => {
    
        setSelectedContact(contact);
        setOpenViewModal(true);
    };

  const handleEditContactStatus = (contact) => {
    setContacts(contacts.map(c => c.id === contact.id ? contact : c)); // this line on submit success

};
  return (
    <PageContainer>
        
        <ContactTable
            Contacts={contacts}
            onView={handleViewContact}
        />
        {/* Modals */}
        <ContactModal
            open={openViewModal}
            onClose={() => setOpenViewModal(false)}
            onEditStatus = {handleEditContactStatus}
            contact={selectedContact}
        />
    </PageContainer>
  )
}

export default ContactDashboard


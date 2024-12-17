import { PageContainer } from '@toolpad/core'
import React, { useEffect, useState } from 'react'
import CommandsTable from './CommandsTable'
import CommandViewModal from './CommandViewModal'

function CommandsDashboard() {
    const [commands, setCommands] = useState([])
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState(null);

    const handleEditCommand = (command) => {
        setSelectedCommand(command);
        openViewModal(true);
    };

    const handleViewCommand = (command) => {
        console.log(command);
        
        setSelectedCommand(command);
        setOpenViewModal(true);
    };

    useEffect(() => {
      setCommands(sampleCommands);
    }, [])
    
    const handleEditCommandStatus = (command) => {
        // submit changes to the server
        console.log('command status updated to : ', command.status);
        
        // submit here
        // then update the state on success
        setCommands(commands.map(c => c.id === command.id ? command : c)); // this line on submit success

    };

  return (
    <PageContainer>

        <CommandsTable
            commands={commands}
            onEdit={handleEditCommand}
            onView={handleViewCommand}
        />
        {/* Modals */}
        <CommandViewModal
            open={openViewModal}
            onClose={() => setOpenViewModal(false)}
            onEditStatus = {handleEditCommandStatus}
            command={selectedCommand}
        />
    </PageContainer>
  )
}

export default CommandsDashboard

const mockProducts = [
    { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 1 },
    { id: 3, name: "Product 3", price: 19.99, quantity: 3 },
  ];
  const sampleCommands = [
    {
      id: 1,
      products: [mockProducts[0], mockProducts[1]],
      status: "Pending",
      firstName: "John",
      lastName: "Doe",
      mail: "john.doe@email.com",
      phone: "555-0123",
      city: "New York",
      postalCode: 10001,
      paymentMethod: "Credit Card",
      totalPrice: 109.97
    },
    {
      id: 2,
      products: [mockProducts[2]],
      status: "Accepted",
      firstName: "Jane",
      lastName: "Smith",
      mail: "jane.smith@email.com", 
      phone: "555-0124",
      city: "Los Angeles",
      postalCode: 90001,
      paymentMethod: "PayPal",
      totalPrice: 59.97
    },
    {
      id: 3,
      products: [mockProducts[0], mockProducts[2]],
      status: "Rejected",
      firstName: "Bob",
      lastName: "Johnson",
      mail: "bob.j@email.com",
      phone: "555-0125", 
      city: "Chicago",
      postalCode: 60601,
      paymentMethod: "Debit Card",
      totalPrice: 89.96
    }
  ];
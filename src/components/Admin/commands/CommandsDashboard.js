import { PageContainer } from '@toolpad/core'
import React, { useState } from 'react'
import CommandsTable from './CommandsTable'
import CommandViewModal from './CommandViewModal'
import { getAllCommands } from '../../../api/backend'

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

  React.useEffect(() => {
    const fetchCommands = async () => {
      try {
        const products = await getAllCommands();
        setCommands(products); 
      } catch (error) {
        console.error("Error fetching products:", error); 
      }
    };
  
    fetchCommands();
  }, []); 
    
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


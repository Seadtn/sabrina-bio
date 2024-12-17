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
      setCommands([]);
    }, [])
    
    const handleEditCommandStatus = (command) => {
        // submit changes to the server
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
            product={selectedCommand}
        />
    </PageContainer>
  )
}

export default CommandsDashboard
import { Button, Grid } from '@mui/material'
import { PageContainer } from '@toolpad/core'
import React, { useState } from 'react'
import ProductFormModal from './ProductFormModal'
import ProductViewModal from './ProductViewModal'
import CommandsTable from './CommandsTable'

function CommandsDashboard() {
    const [commands, setCommands] = useState([])
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState(null);

    const handleAddProduct = () => setOpenFormModal(true);

    const handleEditCommand = (command) => {
        setSelectedCommand(command);
        setOpenFormModal(true);
    };

    const handleSaveCommand = (commandData) => {
        if (selectedCommand) {
            setCommands((prev) =>
            prev.map((prod) => (prod.id === selectedCommand.id ? { ...prod, ...commandData } : prod))
        );
        } else {
            setCommands((prev) => [...prev, { ...commandData, id: Date.now() }]);
        }
        setSelectedCommand(null);
    };

    const handleViewCommand = (command) => {
        console.log(command);
        
        setSelectedCommand(command);
        setOpenViewModal(true);
    };

  return (
    <PageContainer>

        <CommandsTable
            commands={commands}
            onEdit={handleEditCommand}
            onView={handleViewCommand}
        />
        {/* Modals */}
        <ProductFormModal
            open={openFormModal}
            onClose={() => setOpenFormModal(false)}
            product={selectedCommand}
            onSave={handleSaveCommand}
        />
        <ProductViewModal
            open={openViewModal}
            onClose={() => setOpenViewModal(false)}
            product={selectedCommand}
        />
    </PageContainer>
  )
}

export default CommandsDashboard
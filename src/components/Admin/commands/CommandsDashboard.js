import { PageContainer } from '@toolpad/core';
import React, { useState, useEffect } from 'react';
import CommandsTable from './CommandsTable';
import CommandViewModal from './CommandViewModal';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { changeCommandStatus, getAllCommands,getCommandByID } from '../../../api/backend';

function CommandsDashboard({ page, rowsPerPage, setPage, setRowsPerPage, totalPages }) {
  const [commands, setCommands] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [totalElements, setTotalElements] = useState(0);
  
  const [data, setData] = useState({
    acceptedCommands: { count: 0, money: 0 },
    pendingCommands: { count: 0, money: 0 },
    rejectedCommands: { count: 0, money: 0 },
  });



  const handleViewCommand = async (id) => {
    try {
      const response = await getCommandByID(id);
      if (response && response.data) {
        setSelectedCommand(response.data);
        setOpenViewModal(true);
      }
    } catch (error) {
      console.error('Error viewing command:', error);
    }
  };

  const handleEditCommandStatus = (command) => {
    setCommands(commands.map((c) => (c.id === command.id ? command : c)));
    changeCommandStatus(command);
  };

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await getAllCommands(page, rowsPerPage);
    
        setCommands(response.data);
        setTotalElements(response.totalElements);
        const stats = response.commandStats || {};
    
        setData({
          acceptedCommands: {
            count: stats.acceptedCount || 0,
            money: stats.acceptedMoney || 0,
          },
          pendingCommands: {
            count: stats.pendingCount || 0,
            money: stats.pendingMoney || 0,
          },
          rejectedCommands: {
            count: stats.rejectedCount || 0,
            money: stats.rejectedMoney || 0,
          },
        });
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
    
    fetchCommands();
  }, [page, rowsPerPage]);

  const CommandCard = ({ title, count, money, color }) => (
    <Card sx={{ backgroundColor: color, color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          <strong>Nombre de commandes:</strong> {count}
        </Typography>
        <Typography variant="body1">
          <strong>Montant total:</strong> {money} TND
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer>
      {/* Cards Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={4}>
          <CommandCard
            title="Commandes acceptées"
            count={data.acceptedCommands.count}
            money={ Math.round(data.acceptedCommands.money)}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CommandCard
            title="Commandes en attente"
            count={data.pendingCommands.count}
            money={Math.round(data.pendingCommands.money )}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CommandCard
            title="Commandes rejetées"
            count={data.rejectedCommands.count}
            money={Math.round(data.rejectedCommands.money)}
            color="#f44336"
          />
        </Grid>
      </Grid>

      {/* Commands Table with Pagination */}
      <CommandsTable
        commands={commands}
        onView={handleViewCommand}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
        totalElements={totalElements}
      />

      {/* Modals */}
      <CommandViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        onEditStatus={handleEditCommandStatus}
        command={selectedCommand}
      />
    </PageContainer>
  );
}

export default CommandsDashboard;

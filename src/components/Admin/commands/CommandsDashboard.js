import { PageContainer } from '@toolpad/core';
import React, { useState, useEffect } from 'react';
import CommandsTable from './CommandsTable';
import CommandViewModal from './CommandViewModal';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function CommandsDashboard({commands,setCommands}) {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [data, setData] = useState({
    acceptedCommands: { count: 0, money: 0 },
    pendingCommands: { count: 0, money: 0 },
    rejectedCommands: { count: 0, money: 0 },
  });

  const handleEditCommand = (command) => {
    setSelectedCommand(command);
    setOpenViewModal(true);
  };

  const handleViewCommand = (command) => {
    setSelectedCommand(command);
    setOpenViewModal(true);
  };

  const handleEditCommandStatus = (command) => {
    console.log('Command status updated to:', command.status);
    setCommands(commands.map(c => (c.id === command.id ? command : c)));
  };

  useEffect(() => {
    const fetchCommands = () => {
      try {
        // Filter commands based on their status
        const accepted = commands.filter(c => c.status === 'Accepted');
        const pending = commands.filter(c => c.status === 'Pending');
        const rejected = commands.filter(c => c.status === 'Rejected');
  
        // Calculate counts and total prices for each status
        const calculateTotal = (commandsList) => {
          return commandsList.reduce((sum, c) => sum + c.totalPrice, 0);
        };
  
        setData({
          acceptedCommands: {
            count: accepted.length,
            money: calculateTotal(accepted),
          },
          pendingCommands: {
            count: pending.length,
            money: calculateTotal(pending),
          },
          rejectedCommands: {
            count: rejected.length,
            money: calculateTotal(rejected),
          },
        });
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
  
    fetchCommands();
  }, [commands]); 
  

  const CommandCard = ({ title, count, money, color }) => (
    <Card sx={{ backgroundColor: color, color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          <strong>Number of Commands:</strong> {count}
        </Typography>
        <Typography variant="body1">
          <strong>Total Money:</strong>  {money} TND
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
            title="Accepted Commands"
            count={data.acceptedCommands.count}
            money={data.acceptedCommands.money}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CommandCard
            title="Pending Commands"
            count={data.pendingCommands.count}
            money={data.pendingCommands.money}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CommandCard
            title="Rejected Commands"
            count={data.rejectedCommands.count}
            money={data.rejectedCommands.money}
            color="#f44336"
          />
        </Grid>
      </Grid>

      {/* Commands Table */}
      <CommandsTable
        commands={commands}
        onEdit={handleEditCommand}
        onView={handleViewCommand}
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

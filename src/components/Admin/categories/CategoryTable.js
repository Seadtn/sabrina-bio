import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

function CategoryTable({ categories }) {


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Creation Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} >
              <TableCell>#{category.id}</TableCell>
              <TableCell>{`${category.name}`}</TableCell>
              <TableCell>
                {category.creationDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable

"use client"
import React, { useEffect, useState } from 'react';
import { Box,Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getusers");
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
           <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h4">User Details</Typography>
        <Link href="/Form" passHref>
          <Button variant="contained" color="primary">Add User</Button>
        </Link>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user, index) => (
    <TableRow key={user._id}>
      <TableCell>{index + 1}</TableCell> 
      
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
      <TableCell>{user.gender}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.city}</TableCell>
      <TableCell>
                <Link
                  href={{
                    pathname: "/Form",
                    query: { userId: user._id },
                  }}
                >
                  <Button>Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default User;

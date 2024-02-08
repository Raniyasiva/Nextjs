// Form.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import formFields from './formfield.json';
import FieldMapper from '../Fieldmapper';
import axios from 'axios';
import { useSearchParams } from "next/navigation";

const Form = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    console.log(userId,'user');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        country: '',
        comment: ''
    });

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/getusers/${userId}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <form>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <h1>{userId ? 'Edit User' : 'Add User'}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <FieldMapper
                            fields={formFields}
                            formData={formData}
                            handleChange={handleChange}
                            userId={userId}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Form;
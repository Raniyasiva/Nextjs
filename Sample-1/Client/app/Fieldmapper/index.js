"use client"
import React from 'react';
import { Grid, FormControl, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, InputLabel, FormHelperText, Button } from "@mui/material";
import axios from 'axios';
import Link from 'next/link'; 

const FieldMapper = ({ fields, formData, handleChange, userId }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                {getFieldComponent('text', fields.find(field => field.name === 'firstname'), formData, handleChange)}
            </Grid>
            <Grid item xs={12} sm={6}>
                {getFieldComponent('text', fields.find(field => field.name === 'lastname'), formData, handleChange)}
            </Grid>
            <Grid item xs={12} sm={6}>
                {getFieldComponent('radio', fields.find(field => field.name === 'gender'), formData, handleChange)}
            </Grid>
            <Grid item xs={12} sm={6}>
                {getFieldComponent('text', fields.find(field => field.name === 'phone'), formData, handleChange)}
            </Grid>
            <Grid item xs={12}>
                {getFieldComponent('text', fields.find(field => field.name === 'address'), formData, handleChange)}
            </Grid>
            <Grid item xs={6}>
                {getFieldComponent('text', fields.find(field => field.name === 'city'), formData, handleChange)}
            </Grid>
            <Grid item xs={6}>
                {getFieldComponent('text', fields.find(field => field.name === 'district'), formData, handleChange)}
            </Grid>
            <Grid item xs={12}>
                {getFieldComponent('select', fields.find(field => field.name === 'country'), formData, handleChange)}
            </Grid>
            <Grid item xs={12}>
                {getFieldComponent('textarea', fields.find(field => field.name === 'comment'), formData, handleChange)}
            </Grid>
            <Grid item xs={12}>
                {getFieldComponent('submit', fields.find(field => field.type === 'submit'), formData, handleChange,userId)}
            </Grid>
        </Grid>
    );
};

const getFieldComponent = (type, field, formData, handleChange, userId) => {
    if (!field) {
        return null;
    }
    switch (type) {
        case 'text':
            return (
                <TextField fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                />
            );
        case 'radio':
            return (
                <FormControl>
                    <RadioGroup
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        row
                    >
                        {field.options.map((option, optionIndex) => (
                            <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case 'select':
            return (
                <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                    >
                        {field.options.map((option, optionIndex) => (
                            <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select your {field.label}</FormHelperText>
                </FormControl>
            );
        case 'textarea':
            return (
                <TextField fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    multiline
                    rows="4"
                />
            );
        case 'submit':
            const handleClick = () => {
                if (userId) {
                    axios.put(`${field.updateurl}/${userId}`, formData)
                        .then((res) => {
                            alert('User updated successfully', res);
                        })
                        .catch((err) => {
                            alert('Error updating user', err);
                        });
                } else {
                    // If userId is not present, send a POST request to create a new user
                    axios.post(`${field.submiturl}`, formData)
                        .then((res) => {
                            alert('User created successfully', res);
                        })
                        .catch((err) => {
                            alert('Error creating user', err);
                        });
                }
            };
            return (
                <Link href={field.redirectionUrl} passHref>

                <Button variant="contained" color="primary" onClick={handleClick}>
                    {field.text}
                </Button>
                </Link>
            );
        default:
            return null;
    }
};

export default FieldMapper;

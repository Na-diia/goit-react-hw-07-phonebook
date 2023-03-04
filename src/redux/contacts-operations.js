import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllContacts, addOneContact, fetchRemoveContact } from "services/fetchContacts";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, thunkAPI) => {
        try {
            const response = await getAllContacts();
            return response;
        } catch ({response}) {
            return thunkAPI.rejectWithValue(response.data.message);
        };
    },
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async(data, {rejectWithValue}) => {
        try {
           const result = await addOneContact(data);
           return result;
        } catch ({response}) {
            return rejectWithValue(response.data.message);
        };
    },
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async(id, {rejectWithValue}) => {
        try {
         await fetchRemoveContact(id);
         return id;
        } catch ({response}) {
             return rejectWithValue(response.data.message);
        };
    },
);
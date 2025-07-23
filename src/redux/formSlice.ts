import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const fakeApiCall = (email: string, password: string): Promise<{message: string}> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === 'password123' && email.includes('@')) {
                resolve({ message: 'Login successful' });
            } else {
                reject(new Error('Invalid password! Please try again.'));
            }
        }, 2000);
    });
};

export const submitForm = createAsyncThunk(
    'form/submitForm',
    async (_, {getState}) => {
        const { form } = getState() as RootState;
        const response = await fakeApiCall(form.email, form.password);
        return response.message;
    }
);

interface FormState {
    email: string;
    password: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FormState = {
    email: '',
    password: '',
    status: 'idle',
    error: null,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(submitForm.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(submitForm.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const { setEmail, setPassword } = formSlice.actions;
export default formSlice.reducer;
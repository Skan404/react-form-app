export const fakeApiCall = (email: string, password: string): Promise<{message: string}> => {
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
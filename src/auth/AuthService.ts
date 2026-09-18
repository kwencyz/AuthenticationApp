type StoredUser = {
    name: string;
    email: string;
    password: string;
}

type User = {
    name: string;
    email: string;
}

const users: StoredUser[] = [];

export const USER_NOT_FOUND_MESSAGE = 'User not found';
export const EMAIL_ALREADY_EXISTS_MESSAGE = 'User already exists';

export function signup(name: string, email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const normalizedEmail = email.toLowerCase().trim()
            const existingUser = users.find(user => user.email === normalizedEmail)
            if (existingUser) {
                reject(new Error(EMAIL_ALREADY_EXISTS_MESSAGE))
            } else {
                const newUser: StoredUser = { name, email: normalizedEmail, password };
                users.push(newUser);
                resolve({ name: newUser.name, email: newUser.email });
            }
        }, 500); //simulated network delay
    })
}

export function login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const normalizedEmail = email.toLowerCase().trim()
            const existingUser = users.find(user => user.email === normalizedEmail)
            if (!existingUser) {
                reject(new Error(USER_NOT_FOUND_MESSAGE));
            } else if (existingUser.password !== password) {
                reject(new Error('Invalid password'));
            } else {
                resolve({ name: existingUser.name, email: existingUser.email });
            }
        }, 500); //simulated network delay
    })
}
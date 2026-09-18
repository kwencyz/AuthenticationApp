import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    name: string;
    email: string;
};

const USER_KEY = '@auth_user';

export async function getStoredUser(): Promise<User | null> {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
}

export async function saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function clearUser(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
}

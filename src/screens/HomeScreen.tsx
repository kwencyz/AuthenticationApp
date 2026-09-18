import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome back!</Text>
                <Text style={styles.info}>Name: {user?.name}</Text>
                <Text style={styles.info}>Email: {user?.email}</Text>
                <View style={styles.buttonWrapper}>
                    <Button title="Logout" onPress={logout} />
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonWrapper: {
        marginTop: 20,
    },
});

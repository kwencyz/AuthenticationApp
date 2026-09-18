import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    return (
        <LinearGradient
            colors={['#F6D34E', '#F3A487']}
            style={styles.gradient}>
            <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerLine}>Hello!</Text>
                    <Text style={styles.subHeaderLine}>Welcome Back</Text>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.name}>{user?.name}!</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={logout}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const BLACK = '#111111';

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        paddingTop: 16,
    },
    headerLine: {
        fontSize: 32,
        fontWeight: '800',
        color: BLACK,
    },
    subHeaderLine: {
        fontSize: 18,
        fontWeight: '700',
        color: BLACK,
        marginTop: 4,
    },
    middle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 48,
        fontWeight: '800',
        color: BLACK,
    },
    email: {
        fontSize: 14,
        fontWeight: '600',
        color: BLACK,
        marginTop: 4,
    },
    logoutButton: {
        alignSelf: 'center',
        minHeight: 44,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: BLACK,
    },
});

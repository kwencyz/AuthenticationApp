import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import { USER_NOT_FOUND_MESSAGE } from '../auth/AuthService';
import { validateEmail, validateLoginPassword } from '../validation/authValidation';
import PasswordInput from '../components/PasswordInput';

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onLoginPress = async () => {
        const validationError = validateEmail(email) || validateLoginPassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setIsSubmitting(true);
        try {
            await login(email, password);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            if (message === USER_NOT_FOUND_MESSAGE) {
                Alert.alert(
                    'No account found',
                    "We couldn't find an account with that email. Would you like to sign up?",
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Sign Up', onPress: () => navigation.navigate('Signup') },
                    ],
                );
            } else {
                setError(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSignupPress = () => {
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaProvider>
            <View style={style.container}>
                <Text style={style.title}>Login</Text>
                <TextInput
                    style={style.textField}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
                <PasswordInput
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                />
                {error && <Text style={style.error}>{error}</Text>}
                <TouchableOpacity
                    style={style.button}
                    onPress={onLoginPress}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={style.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <View style={style.row}>
                    <Text>Don't have an account? </Text>
                    <Text style={style.link} onPress={onSignupPress}>
                        Signup
                    </Text>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    textField: {
        height: 40,
        width: '80%',
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

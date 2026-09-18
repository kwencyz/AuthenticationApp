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
import { EMAIL_ALREADY_EXISTS_MESSAGE } from '../auth/AuthService';
import {
    validateEmail,
    validateName,
    validateSignupPassword,
} from '../validation/authValidation';
import PasswordInput from '../components/PasswordInput';

type SignupScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

export default function SignupScreen({ navigation }: SignupScreenProps) {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSignupPress = async () => {
        const validationError =
            validateName(name) || validateEmail(email) || validateSignupPassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setIsSubmitting(true);
        try {
            await signup(name, email, password);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            if (message === EMAIL_ALREADY_EXISTS_MESSAGE) {
                Alert.alert(
                    'Account already exists',
                    'An account with that email already exists. Would you like to log in instead?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Log In', onPress: () => navigation.navigate('Login') },
                    ],
                );
            } else {
                setError(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const onLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaProvider>
            <View style={style.container}>
                <Text style={style.title}>Signup</Text>
                <TextInput
                    style={style.textField}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
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
                    onPress={onSignupPress}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={style.buttonText}>Signup</Text>
                    )}
                </TouchableOpacity>
                <View style={style.row}>
                    <Text>Already have an account? </Text>
                    <Text style={style.link} onPress={onLoginPress}>
                        Login
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

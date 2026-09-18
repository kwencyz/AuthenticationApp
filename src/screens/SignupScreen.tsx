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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import { EMAIL_ALREADY_EXISTS_MESSAGE } from '../auth/AuthService';
import {
    validateEmail,
    validateName,
    validatePasswordConfirmation,
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSignupPress = async () => {
        const validationError =
            validateName(name) ||
            validateEmail(email) ||
            validateSignupPassword(password) ||
            validatePasswordConfirmation(password, confirmPassword);
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
            <View style={style.screen}>
                <SafeAreaView edges={['top']} style={style.header}>
                    <Text style={style.headerLine}>Hello!</Text>
                    <Text style={style.headerLine}>Sign Up Now</Text>
                </SafeAreaView>
                <View style={style.content}>
                    <View>
                        <TextInput
                            style={style.textField}
                            placeholder="Username"
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
                        <PasswordInput
                            placeholder="Confirm Password"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                        {error && <Text style={style.error}>{error}</Text>}
                        <TouchableOpacity
                            style={style.button}
                            onPress={onSignupPress}
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                                <ActivityIndicator color={BLACK} />
                            ) : (
                                <Text style={style.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={style.row}>
                        <Text style={style.rowText}>Already have an account?</Text>
                        {'\n'}
                        <Text style={style.link} onPress={onLoginPress}>
                            Login
                        </Text>
                        <Text style={style.rowText} onPress={onLoginPress}>
                            {' '}
                            Now!
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const YELLOW = '#F6D34E';
const BLACK = '#111111';
const GRAY_LINE = '#9CA3AF';
const GRAY_TEXT = '#6B7280';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: YELLOW,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 80,
    },
    headerLine: {
        fontSize: 32,
        fontWeight: '800',
        color: BLACK,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -40,
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 24,
        justifyContent: 'space-between',
    },
    row: {
        textAlign: 'right',
    },
    rowText: {
        color: GRAY_TEXT,
    },
    textField: {
        height: 44,
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderBottomColor: GRAY_LINE,
        borderBottomWidth: 1,
        marginBottom: 24,
        fontSize: 16,
    },
    button: {
        backgroundColor: YELLOW,
        borderWidth: 2,
        borderColor: BLACK,
        paddingVertical: 14,
        borderRadius: 28,
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: BLACK,
        fontWeight: '700',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: BLACK,
        fontWeight: '700',
    },
});

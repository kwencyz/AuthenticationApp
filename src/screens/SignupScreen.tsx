import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SignupScreen() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const onSignupPress = () => {
        console.log('Signup button pressed')

    }
    return (
        <SafeAreaProvider>
            <View style={style.container}>
                <Text style={{ marginBottom: 50 }}>Signup Screen</Text>
                <TextInput
                    style={style.textField}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={style.textField}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={style.textField}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title="Signup" onPress={onSignupPress} />
            </View>
        </SafeAreaProvider>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //horizontal
        alignItems: 'center', //vertical
    },
    textField: {
        height: 40,
        width: '80%',
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }

})
import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function LoginScreen() {

    const onLoginPress = () => {
        console.log('Login button pressed')
        
    }
    return (
        <View style={style.container}>
            <Text style={{ bottom: 100 }}>Login Screen</Text>
            <TextInput style={{ bottom: 100 }} placeholder="Username" />
            <TextInput style={{ bottom: 100 }} placeholder="Password" secureTextEntry />
            <Button title="Login" onPress={onLoginPress} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //horizontal
        alignItems: 'center', //vertical
    }

})
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'>;

export default function PasswordInput({ style, ...props }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, style]}
                secureTextEntry={!visible}
                {...props}
            />
            <TouchableOpacity
                style={styles.toggle}
                onPress={() => setVisible(v => !v)}>
                <Text style={styles.toggleText}>{visible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    toggle: {
        paddingHorizontal: 10,
    },
    toggleText: {
        color: '#2563eb',
        fontWeight: 'bold',
    },
});

import React, { useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
    containerStyle?: StyleProp<ViewStyle>;
};

export default function PasswordInput({ style, containerStyle, ...props }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
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
        width: '100%',
        borderBottomColor: '#9CA3AF',
        borderBottomWidth: 1,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        height: 44,
        paddingHorizontal: 4,
        fontSize: 16,
    },
    toggle: {
        paddingHorizontal: 10,
    },
    toggleText: {
        color: '#111111',
        fontWeight: 'bold',
    },
});

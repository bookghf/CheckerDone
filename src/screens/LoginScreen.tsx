import {SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {postLogin} from "../services/Auth/Auth.ts";
import {LoginResponseParams} from "../services/Auth/authInterface.ts";

function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>();

    const onSubmit = async  (data: FormProps) => {
        console.log('Form Data:', data);
        try {
            const response = await postLogin(data);
            // Example: Extract data from the response
            if (response.status === 200) {
                console.log('Login success: ', JSON.stringify(response.data, null,2));
            } else {
                console.log('Login failed: ', JSON.stringify(response.data, null,2));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check if the error has a response
                if (error.response) {
                    console.log('Status Code:', JSON.stringify(error.response.status, null,2));
                    console.log('Error Data:', JSON.stringify(error.response.data, null,2)); // Access the response body
                    console.log('Error Message:', JSON.stringify(error.response.data.message, null,2) || 'No message provided');
                } else {
                    console.error('Error: No response received', JSON.stringify(error.message, null,2));
                }
            } else {
                console.error('Unexpected Error:', JSON.stringify(error, null,2));
            }
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.errorInput]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Email'}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                <Text style={styles.label}>Password</Text>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.password && styles.errorInput]}
                            onBlur={onBlur} // called when the input loses focus
                            onChangeText={onChange} // called when the input value changes
                            placeholder={'Password'}
                            value={value} // current input value
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors?.password?.message}</Text>}

                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        </SafeAreaView>
    );
}

type FormProps = {
    email: string,
    password: string
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});


export default LoginScreen;

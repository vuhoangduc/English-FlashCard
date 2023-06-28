import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';
import axios from 'axios';
import COLORS from '../../conts/color';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import API_URL from '../../conts/api_url';
const RegistrationScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Làm ơn nhập email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Làm ơn hãy nhập đúng định dạng email', 'email');
            isValid = false;
        }

        if (!inputs.fullname) {
            handleError('Làm ơn hãy nhập họ và tên', 'fullname');
            isValid = false;
        }


        if (!inputs.password) {
            handleError('Làm ơn hãy nhập mật khẩu', 'password');
            isValid = false;
        } else if (inputs.password.length < 6) {
            handleError('Mật khẩu phải lớn hơn 6 chữ cái', 'password');
            isValid = false;
        }

        if (isValid) {
            await axios.post(API_URL.signup,{ email: inputs.email, name: inputs.fullname, password: inputs.password })
            .then(response => {
                console.log(response.data.status);
                console.log(response.data);
                if (response.data.status == 404){
                    handleError(response.data.error, 'email');
                    isValid = false;
                }else{
                    isValid = true;
                }
            })
            .catch(error => {
                console.log(1);
                console.error(error);
    
            });
        }

        if (isValid) {
              register();
        }
    };



    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.blue, fontSize: 40, fontWeight: 'bold' }}>
                    Đăng ký
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Đăng ký tài khoản của bạn
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Nhập email..."
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'fullname')}
                        onFocus={() => handleError(null, 'fullname')}
                        iconName="account-outline"
                        label="Full Name"
                        placeholder="Nhập họ và tên..."
                        error={errors.fullname}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Nhập mật khẩu..."
                        error={errors.password}
                        password
                    />
                    <Button title="Đăng ký" onPress={validate} />
                    <Text
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Bạn đã có tài khoản? Đăng nhập
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegistrationScreen;

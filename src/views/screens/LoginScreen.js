import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert } from 'react-native';
import COLORS from '../../conts/color';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
import API_URL from '../../conts/api_url';
const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Làm ơn nhập email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      handleError('Làm ơn hãy nhập đúng định dạng email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Làm ơn nhập mật khẩu', 'password');
      isValid = false;
    }
    if (isValid) {
      await axios.post(API_URL.login, { email: inputs.email, password: inputs.password })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 404) {
            switch (response.data.type) {
              case 'email':
                handleError(response.data.error, 'email');
                break;
              case 'password':
                handleError(response.data.error, 'password');
                break;
            }
            isValid = false;
          } else {
            saveLocalStorage({accessToken:response.data.accessToken,userId:response.data.userId})
            isValid = true;
          }
        })
        .catch(error => {
          console.error(error);

        });
    }
    if (isValid) {
      // AsyncStorage.getItem('dataUser')
      //   .then((value) => {
      //     if (value !== null) {
      //       console.log('Giá trị đã truy xuất:', value);
      //     } else {
      //       console.log('Không tìm thấy giá trị với khóa được chỉ định');
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('Lỗi khi truy xuất dữ liệu:', error);
      //   });
      login();
    }
  };

  saveLocalStorage = (data) => {
    AsyncStorage.setItem('dataUser', JSON.stringify(data))
      .then(() => {
        console.log('Dữ liệu đã được lưu trữ thành công');
      })
      .catch((error) => {
        console.log('Lỗi khi lưu trữ dữ liệu:', error);
      });
  }
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      navigation.navigate('BottomTabNavigator');
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
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.blue, fontSize: 40, fontWeight: 'bold' }}>
          Đăng nhập
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Đăng nhập vào tài khoản của bạn
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Nhập email của bạn..."
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Nhập mật khẩu của ban..."
            error={errors.password}
            password
          />
          <Button title="Đăng nhập" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Bạn chưa có tài khoản? Đăng ký
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

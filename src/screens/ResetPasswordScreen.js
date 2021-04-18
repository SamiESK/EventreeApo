import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'

function ResetPasswordScreen({ navigation }) {

const app_name = "eventree-calendar-test";
  function buildPath(route) {
      if (process.env.NODE_ENV === "production") {
          return "https://" + app_name + ".herokuapp.com/" + route;
      } else {
          return "http://localhost:5000/" + route;
      }
  }

  const [email, setEmail] = useState({ value: '', error: '' })

  // const sendResetPasswordEmail = () => {
  //   const emailError = emailValidator(email.value)
  //   if (emailError) {
  //     setEmail({ ...email, error: emailError })
  //     return
  //   }
  //   navigation.navigate('LoginScreen')
  // }

  const sendResetPasswordEmail = async (event) => {

    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }

    navigation.navigate('LoginScreen')
    event.preventDefault();
    
    // if (email.value === null)
    // {
    //     // document.getElementById("loginError").innerHTML = "Please put your email in"
    //     return;
    // }
    var obj = { email: email.value};
    
    var js = JSON.stringify(obj);
    try {
        const response = await fetch(buildPath('api/user/password-reset/get-code'), {
            method: "POST",
            body: js,
            credentials : "include"
        });

        var res = JSON.parse(await response.text());
        if (!res.success) {
            // document.getElementById("getCodeError").innerHTML = res.errors.pop().msg;
        }
        else if(res.success) {
            // document.getElementById("getCodeError").innerHTML = "";
        }
        
    } catch (e) {
        alert(e.toString());
        return;
    }
    
};

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
export default ResetPasswordScreen;

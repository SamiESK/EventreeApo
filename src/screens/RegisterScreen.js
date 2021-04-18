import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { FirstNameValidator } from '../helpers/nameValidator'
import { LastNameValidator } from '../helpers/nameValidator'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { ConfirmPasswordValidator } from '../helpers/passwordValidator'

var success = `<div id="success" class="alert alert-primary" role="alert">
<button class="close" onclick="this.parentNode.classList.add('dispose')" type="button" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
<h4 class="alert-heading">Account created!</h4>
Please check your email and verify your account before logging in.
</div>`;

export default function RegisterScreen({ navigation }) {

  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repeatPassword, set_confirm_password] = useState({ value: '', error: '' })

  const FirstNameError = FirstNameValidator(firstName.value)
  const LastNameError = LastNameValidator(lastName.value)
  const emailError = emailValidator(email.value)
  const passwordError = passwordValidator(password.value)
  const confirm_passwordError = ConfirmPasswordValidator(repeatPassword.value, password.value)

  const app_name = "eventree-calendar-test";
  function buildPath(route) {
      if (process.env.NODE_ENV === "production") {
          return "https://" + app_name + ".herokuapp.com/" + route;
      } else {
          return "https://" + app_name + ".herokuapp.com/" + route;
      }
  }

  const onSignUpPressed = async (event) => {
    event.preventDefault();
    if (FirstNameError || LastNameError || emailError|| passwordError || confirm_passwordError) {
      setFirstName({ ...firstName, error: FirstNameError })
      setLastName({ ...lastName, error: LastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      set_confirm_password({ ...repeatPassword, password, error: confirm_passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
    
    var obj = { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value, repeat_password: repeatPassword.value };
    var js = JSON.stringify(obj);
    try {
        const response = await fetch(buildPath('api/user/register'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
        });
        
        var res = JSON.parse(await response.text());

           var user = {
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                password: res.password,
            };

            if (email.value === user.email)
            {
                setIsOpen(false);
                document.getElementById("signUpSuccess").innerHTML = success;
            }
            console.log(res);
            
            

    } catch (e) {
        alert(e.toString());
        return;
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Start your events today!</Header>
      <TextInput
        label="First name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={repeatPassword.value}
        onChangeText={(text) => set_confirm_password({ value: text, error: '' })}
        error={!!repeatPassword.error}
        errorText={repeatPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        onPress={() => navigation.replace('StartScreen')}
      >
        Sign Up
      </Button >
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
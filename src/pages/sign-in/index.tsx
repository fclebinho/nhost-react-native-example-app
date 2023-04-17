import React, { useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { deviceWidth } from '../../helpers'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts'
import { ScreenList } from '../../routes'

type SignInScreensProps = NativeStackNavigationProp<ScreenList, 'SignIn'>

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

const SignIn: React.FC = () => {
  const { signIn } = useContext(AuthContext)

  const { navigate } = useNavigation<SignInScreensProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  // const {
  //   signInEmailPassword,
  //   isLoading,
  //   isSuccess,
  //   needsEmailVerification,
  //   isError,
  //   error,
  // } = useSignInEmailPassword()
  // const { isAuthenticated } = useAuthenticationStatus()

  const onSubmit = (data: FormData) =>
    signIn(data.email, data.password).catch((err) => console.log(err))

  // if (isSuccess) {
  //   navigate('Home')
  // }
  //
  // if (needsEmailVerification) {
  //   navigate('EmailVerification')
  // }
  //
  // if (isError) {
  //   console.log(error)
  // }
  //
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('Home')
  //   }
  // }, [isAuthenticated, navigate])

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ textAlign: 'center', marginBottom: 30, fontSize: 24 }}>
        Welcome, Back !
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formInputBlock}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoFocus
                autoCapitalize="none"
                style={styles.formInput}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}
        </View>

        <View style={styles.formInputBlock}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.formInput}
                placeholder="*****"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              width: deviceWidth - 32,
              paddingVertical: 14,
              backgroundColor: '#007AFF',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigate('SignUp')}>
          <Text>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formInput: {
    width: '78%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 16,
    lineHeight: 21,
    paddingLeft: 18,
  },
  formInputBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#dbdbdb',
    height: 50,
    borderRadius: 12,
    marginBottom: 32,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
})

export default SignIn

import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { deviceWidth } from '../../helpers'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSignUpEmailPassword } from '@nhost/react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ScreenList } from '../../routes'

type SignUpScreensProps = NativeStackNavigationProp<ScreenList, 'SignUp'>

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required()

type FormData = z.infer<typeof schema>

const SignUp: React.FC = () => {
  const { navigate } = useNavigation<SignUpScreensProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword()

  const onSubmit = (data: FormData) => {
    signUpEmailPassword(data.email, data.password, {
      displayName: `${data.firstName} ${data.lastName}`.trim(),
      metadata: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    }).catch((e) => {
      console.log(e)
    })
  }

  if (isSuccess) {
    navigate('Home')
  }

  if (needsEmailVerification) {
    navigate('EmailVerification')
  }

  if (isError) {
    console.log(error)
  }

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
        Create an account !
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
                style={styles.formInput}
                autoFocus
                autoCapitalize="none"
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.formInputBlock}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.formInput}
                autoFocus
                autoCapitalize="none"
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>This is required.</Text>}
        </View>

        <View style={styles.formInputBlock}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.formInput}
                autoFocus
                autoCapitalize="none"
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
                autoCapitalize="none"
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
        {isError && <Text>{error?.message}</Text>}

        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isLoading}>
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
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigate('SignIn')}>
          <Text>Entrar na conta</Text>
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

export default SignUp

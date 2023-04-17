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
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { gql, useMutation } from '@apollo/client'

import { ScreenList } from '../../routes'
import { useAuth } from '../../contexts'

type SignUpScreensProps = NativeStackNavigationProp<ScreenList, 'SignUp'>

const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(
      pk_columns: { id: $id }
      _set: { displayName: $displayName, metadata: $metadata }
    ) {
      id
      displayName
      metadata
    }
  }
`

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  })
  .required()

type FormData = z.infer<typeof schema>

const Profile: React.FC = () => {
  const { navigate } = useNavigation<SignUpScreensProps>()
  const { user } = useAuth()
  const [mutateUser, { loading: updatingProfile }] =
    useMutation(UPDATE_USER_MUTATION)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.metadata.firstName,
      lastName: user?.metadata.lastName,
      email: user?.email,
    },
  })

  const onSubmit = async (data: FormData) => {
    await mutateUser({
      variables: {
        id: user?.id,
        displayName: `${data.firstName} ${data.lastName}`.trim(),
        metadata: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    })
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
        Update an account !
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

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={updatingProfile}
        >
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
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

export default Profile

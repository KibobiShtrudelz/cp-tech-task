import axios from 'axios'

export async function signInService({ email, password }: SignInDto) {
  const response = await axios.post('http://localhost:3333/sign-in', {
    email,
    password
  })

  if (response.status >= 200 && response.status < 300) {
    return response.data
  }

  throw new Error(response.statusText)
}

type SignInDto = {
  email: string
  password: string
}

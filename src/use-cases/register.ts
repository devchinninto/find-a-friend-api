import { prisma } from '@/lib/prisma.js'
import { getAddressData } from '@/utils/get-address-data.js'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  title: string
  primary_contact: string
  email: string
  password: string
  description: string | null
  cep: string
  phone: string
}

export async function registerUseCase({
  title,
  primary_contact,
  email,
  password,
  description,
  cep,
  phone,
}: RegisterUseCaseRequest) {
  const { address, latitude, longitude } = await getAddressData(cep)

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists.')
  }

  await prisma.org.create({
    data: {
      title,
      primary_contact,
      email,
      password_hash,
      description,
      address,
      cep,
      phone,
      latitude,
      longitude,
    },
  })
}

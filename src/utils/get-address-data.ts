interface Address {
  // street name
  logradouro: string
}

export async function getAddressData(cep: string) {
  const getFullAddress = await fetch(`https://opencep.com/v1/${cep}`)
  const getFullAddressResponse = (await getFullAddress.json()) as Address

  const address = getFullAddressResponse.logradouro

  const latitude = 7.109134
  const longitude = 34.8416648

  return { address, latitude, longitude }
}

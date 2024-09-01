'use client'

export async function authenticateUser(credentials: any) {
  // Extract email and password from credentials
  if (credentials) {
    const { email, password } = credentials

    sessionStorage.setItem('user', JSON.stringify({ email, password }))
  }

  return { email: credentials?.email, password: credentials?.password }
  // If user is not found or credentials are invalid, return null
}

// Function to randomly choose one item from an array
function chooseRandomItem(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)]
}

// Hardcoded list of the biggest towns in Europe
const biggestTownsInEurope: string[] = [
  'Moscow',
  'Istanbul',
  'London',
  'Saint Petersburg',
  'Berlin',
  'Madrid',
  'Kiev',
  'Rome',
  'Paris',
  'Bucharest',
  'Vienna',
  'Budapest',
  'Hamburg',
  'Warsaw',
  'Barcelona',
  'Munich',
  'Milan',
  'Prague',
  'Sofia',
  'Brussels',
  'Birmingham',
  'Cologne',
  'Naples',
  'Stockholm',
  'Athens',
]

// Function to get one random town from the list of the biggest towns in Europe
export function getRandomTown(): string {
  return chooseRandomItem(biggestTownsInEurope)
}

const addRandomElements = (input: string, randomValues: string[]): string => {
  const result: string[] = []

  for (let i = 0; i < input.length; i++) {
    result.push(input[i])

    // Determine whether to insert random value or provided value
    const insertRandom = Math.random() < 0.5 // Adjust probability as needed
    if (insertRandom) {
      const randomIndex = Math.floor(Math.random() * randomValues.length)
      const randomValue = randomValues[randomIndex]
      result.push(randomValue)
    } else {
      // Insert any other random character or symbol
      const randomCharacterIndex = Math.floor(Math.random() * 93) // Generating random number between 0 and 92
      const randomCharacter = String.fromCharCode(33 + randomCharacterIndex) // Convert random number to ASCII character code
      result.push(randomCharacter)
    }
  }

  return result.join('')
}

export default addRandomElements

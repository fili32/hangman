// Making an HTTP request
const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

export { getPuzzle as default}

// Final for country but not need for Hangman
// const getCountryDetails = async (countryCode) => {
//     const response = await fetch(`http://restcountries.eu/rest/v2/all`)
//     if(response.status === 200) {
//         const dataCountry = await response.json()
//         const country = await dataCountry.find(country => country.alpha2Code === countryCode)
//         return country
//     } else {
//         throw new Error('Unable to fetch the countrys infos')
//     }
// }

// const getLocation = async () => {
//     const response = await fetch('http://ipinfo.io/json?token=183acf559a6674')
//     if(response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error('Unable to fetch the location infos')
//     } 
// }

// const getCurrentCountry = async () => {
//     const countryCode = await getLocation()
//     return getCountryDetails(countryCode.country)
// }

// const countryCode = "GR"
// const requestCountry = new XMLHttpRequest()
// requestCountry.addEventListener('readystatechange', (e) => {
//     if(e.target.readyState === 4 && e.target.status === 200) {
//         const dataCountry = JSON.parse(e.target.responseText)
//         console.log('dataCountry', dataCountry)
//         let myCountry = dataCountry.find(country => country.alpha2Code === countryCode)
//         console.log(`The name of my country is ${myCountry.name}`)

//     } else if (e.target.readyState === 4) {
//         console.log('An error has taken place')
//     }
// })

// requestCountry.open('GET', 'http://restcountries.eu/rest/v2/all')
// requestCountry.send()

// const getPuzzleSync = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', 'http://puzzle.mead.io/puzzle?wordCount=3', true)
//     request.send()

//     if (request.readyState === 4 && request.status === 200) {
//         const data = JSON.parse(request.responseText)
//         return data.puzzle
//     } else if (request.readyState === 4) {
//         throw new Error('An error has taken place')
//     }
// }
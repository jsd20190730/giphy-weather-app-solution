$(function () {
  $('#search').submit((event) => {
    event.preventDefault()
    console.log('submitting')
    const query = $('#query').val()

    processRequest(query)
  })

  function displayResults (data) {
    console.log('data in displayResults:', data)

    // 1. print out city data
    $('#city-data').html(`
      <p>name: ${data.weatherData.name}</p>
      <p>current temp: ${data.weatherData.main.temp}</p>
      <p>
        current description: ${data.weatherData.weather[0].description}
      </p>
      <p>current min temp: ${data.weatherData.main.temp_min}</p>
      <p>current max temp: ${data.weatherData.main.temp_min}</p>
    `)

    // 2. print out city gif
    $('#city-gif').html(`
      <img src="${data.giphyData.data[0].images.fixed_height.url}" />
    `)

    // 2. print out weather description gif
    $('#weather-desc-gif').html(`
      <img src="${data.giphyWeatherDesc.data[0].images.fixed_height.url}" />
    `)
  }

  async function processRequest (query) {
    try {
      // 1. make an API request to OpenWeather (with city)
      const weatherData = await openWeatherApi(query)
      console.log(weatherData)
      const weatherDescription = weatherData.weather[0].description

      console.log(weatherDescription)

      // 2. make an API request to Giphy (with city)
      const giphyData = await giphyApi(query)
      console.log(giphyData)

      // 3. make an API request to Giphy (with weather desc )
      const giphyWeatherDesc = await giphyApi(weatherDescription)
      console.log(giphyWeatherDesc)

      // es6 syntax
      displayResults({ weatherData, giphyData, giphyWeatherDesc })
    } catch (e) {
      console.log(e)
    }
  }

  async function openWeatherApi (query) {
    try {
      const url = 'https://api.openweathermap.org/data/2.5/weather'
      const apiKey = 'ADD_OPENWEATHER_API_KEY'

      // make api request using axios
      const response = await axios.get(url, {
        params: {
          appid: apiKey,
          q: query,
          units: 'imperial'
        }
      })

      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async function giphyApi (query) {
    try {
      console.log('query in giphyApi', query)

      const url = 'https://api.giphy.com/v1/gifs/search'
      const apiKey = 'ADD_GIPHY_API_KEY'

      // make api request using axios
      const response = await axios.get(url, {
        params: {
          q: query,
          api_key: apiKey
        }
      })

      // console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
})

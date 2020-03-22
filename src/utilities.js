import axios from 'axios'

export const getPlanets = (url, planets, resolve, reject) => {
  axios.get(url)
    .then(response => {
      const retrivedPlanets = planets.concat(response.data.results)
      if (response.data.next !== null) {
        getPlanets(response.data.next, retrivedPlanets, resolve, reject)
      } else {
        resolve(retrivedPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}

export const getFilms = (films, [], resolve, reject) => {
  const allFilms = []
  if(films.length >= 1) {
    films.map(url => {
      axios.get(url)
      .then(response => {
        if(response) {
          allFilms.push(response.data.title)
        }
      })
      .catch(error => {
        console.log(error)
        reject('Something wrong. Please refresh the page and try again.')
      })
      return resolve(allFilms)
    })
  }

}
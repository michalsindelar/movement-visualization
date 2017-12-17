import { setDataFilenames } from "./actions"

export const loadDataFilenames = () => dispatch => {

  // FIXME: Better
  let url = `${window.location.protocol}//${window.location.host}/getMovementFilenames`
  url = url.replace("3000", "5000")

  fetch(url)
    .then(res => res.json(), console.log)
    .then(json =>
      dispatch(setDataFilenames(json))
    )
}

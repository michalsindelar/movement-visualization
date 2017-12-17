export const SET_DATA_FILENAMES = "SET_DATA_FILENAMES"

export const setDataFilenames = loading => ({
  type: SET_DATA_FILENAMES,
  payload: { data: loading },
})
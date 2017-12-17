export const ACTION = "ACTION"

export const action = loading => ({
  type: ACTION,
  payload: { data: loading },
})
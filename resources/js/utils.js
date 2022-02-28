import Data from './Config/Forms'

export const _i = (key, value) => {
  return Data[key].find(data => {
    return data.value == value
  }).text
}
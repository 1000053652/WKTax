import axios from 'axios'

const fetchUserResponse = async () => {
  const response = await axios.get(`https://api.github.com/users/KrunalLathiya`)
  return response
}
export default fetchUserResponse

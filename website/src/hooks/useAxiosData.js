import { useState } from 'react'
import PropTypes from 'prop-types'

const useAxiosData = (modifyData) => {
  const [data, setData] = useState({
    loading: false,
    data: undefined,
    error: false,
  })

  const makeRequest = (request) => {
    setData({
      loading: true,
      data: undefined,
      error: false,
    })

    request()
      .then((resp) => {
        const finalData = modifyData ? modifyData(resp.data) : resp.data

        setData({
          loading: false,
          data: finalData,
          error: false,
        })
      })
      .catch((error) => {
        const obj = {
          loading: false,
          data: undefined,
          error,
        }

        setData(obj)
      })
  }

  return [data, makeRequest]
}

useAxiosData.propTypes = {
  modifyData: PropTypes.func,
}

export default useAxiosData

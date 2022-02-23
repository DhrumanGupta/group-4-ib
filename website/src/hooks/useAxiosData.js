import { useState } from 'react'
import PropTypes from 'prop-types'

const useAxiosData = (modifyData) => {
  const [data, setData] = useState({
    loading: false,
    data: undefined,
    error: false,
  })

  const makeRequest = async (request) => {
    setData({
      loading: true,
      data: undefined,
      error: false,
    })

    try {
      const resp = await request()
      const finalData = modifyData ? modifyData(resp.data) : resp.data

      setData({
        loading: false,
        data: finalData,
        error: false,
      })
    } catch (e) {
      setData({
        loading: false,
        data: undefined,
        error: e,
      })
    }
  }

  return [data, makeRequest]
}

useAxiosData.propTypes = {
  modifyData: PropTypes.func,
}

export default useAxiosData

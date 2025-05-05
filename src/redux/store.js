import {configureStore} from '@reduxjs/toolkit'
import domainReducer from './store/domains.js'

const store = configureStore({
  reducer: domainReducer
})

export default store
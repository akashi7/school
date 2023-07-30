import { login_options } from '../config/constants'

/* eslint-disable import/no-anonymous-default-export */

export default (activeLogin) => ({
  parent: activeLogin === login_options.parent,
  student: activeLogin === login_options.student,
})

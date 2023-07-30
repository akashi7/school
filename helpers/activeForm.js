import { login_options } from '../config/constants'

/* eslint-disable import/no-anonymous-default-export */
export default (activeLogin) => ({
  parent: activeLogin === login_options.parent,
  admin: activeLogin === login_options.admin,
  school: activeLogin === login_options.school,
  student: activeLogin === login_options.student,
  employee: activeLogin === login_options.employee,
})


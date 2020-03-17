import router from '../router/index'
router.beforeEach(function (to, form, next) {
  const token = window.localStorage.getItem('user')
  if (to.path.startsWith('/home')) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

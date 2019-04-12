import router from '../user.router'

describe('user router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/', method: 'put' },
      { path: '/avatar', method: 'post' },
      { path: '/avatar', method: 'delete' },
      { path: '/:id/avatar', method: 'get' },
      { path: '/all', method: 'get' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})

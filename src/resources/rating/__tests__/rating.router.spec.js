import router from '../rating.router'

describe('rating router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/item/:itemId', method: 'get' },
      { path: '/itemavg/:itemId', method: 'get' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})

import controllers from '../rating.controller'
import { isFunction } from 'lodash'

describe('rating controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'createOrUpdateOne',
      'getOneForItem',
      'getItemsAverageRating'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    )
  })
})

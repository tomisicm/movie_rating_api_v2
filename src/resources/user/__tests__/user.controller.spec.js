import { me, updateMe, getMany } from '../user.controller'
import { isFunction } from 'lodash'

describe('user controllers', () => {
  test('has get and put functions', () => {
    expect(isFunction(me)).toBe(true)
    expect(isFunction(updateMe)).toBe(true)
    expect(isFunction(getMany)).toBe(true)
  })
})

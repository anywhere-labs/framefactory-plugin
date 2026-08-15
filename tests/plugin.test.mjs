import test from 'node:test'
import assert from 'node:assert/strict'
import { apply, name, skillContent } from '../src/index.js'

test('exports a named DSH plugin', () => {
  assert.equal(name, 'framefactory-plugin')
  assert.match(skillContent, /内容 Brief/)
})

test('registers the FrameFactory skill and returns a disposer', () => {
  let registered
  let disposed = false
  const ctx = {
    skills: {
      register(skill) {
        registered = skill
        return () => { disposed = true }
      },
    },
  }

  const dispose = apply(ctx)
  assert.equal(typeof dispose, 'function')
  assert.equal(registered.name, 'framefactory-content')
  assert.equal(registered.provider, 'framefactory-plugin')
  assert.match(registered.content, /视觉计划/)
  dispose()
  assert.equal(disposed, true)
})

test('fails clearly when the skills service is unavailable', () => {
  assert.throws(() => apply({}), /requires the dsh skills service/)
})

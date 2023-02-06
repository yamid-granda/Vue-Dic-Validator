import { describe, expect, it } from 'vitest'
import { isEmail } from '..'

describe.concurrent('valid emails', () => {
  it('normal email', () => {
    expect(isEmail('john@gmail.com').isValid).toBe(true)
  })

  it('short email', () => {
    expect(isEmail('a@b.co').isValid).toBe(true)
  })

  it('long email', () => {
    expect(isEmail('thisisaverylongemail@thisisaverylongemail.thisisaverylongemail').isValid).toBe(true)
  })

  it('special chars', () => {
    expect(isEmail('john_doe|**@gmail.com').isValid).toBe(true)
  })

  it('japanese chars', () => {
    expect(isEmail('あいうえお@example.com').isValid).toBe(true)
    expect(isEmail('あいうえお@あいうえお.あいうえお').isValid).toBe(true)
  })

  it('valid emails from https://gist.github.com/cjaoude/fd9910626629b53c4d25', () => {
    expect(isEmail('email@example.com').isValid).toBe(true)
    expect(isEmail('firstname.lastname@example.com').isValid).toBe(true)
    expect(isEmail('email@subdomain.example.com').isValid).toBe(true)
    expect(isEmail('firstname+lastname@example.com').isValid).toBe(true)
    // expect(isEmail('email@123.123.123.123').isValid).toBe(true)
    // expect(isEmail('email@[123.123.123.123]').isValid).toBe(true)
    expect(isEmail('"email"@example.com').isValid).toBe(true)
    expect(isEmail('1234567890@example.com').isValid).toBe(true)
    expect(isEmail('email@example-one.com').isValid).toBe(true)
    expect(isEmail('_______@example.com').isValid).toBe(true)
    expect(isEmail('email@example.name').isValid).toBe(true)
    expect(isEmail('email@example.museum').isValid).toBe(true)
    expect(isEmail('email@example.co.jp').isValid).toBe(true)
    expect(isEmail('firstname-lastname@example.com').isValid).toBe(true)
    // expect(isEmail('much.”more\ unusual”@example.com').isValid).toBe(true)
    // expect(isEmail('very.unusual.”@”.unusual.com@example.com').isValid).toBe(true)
    // expect(isEmail('very.”(),:;<>[]”.VERY.”very@\\ "very”.unusual@strange.example.com').isValid).toBe(true)
  })
})

describe.concurrent('invalid emails', () => {
  it('empty', () => {
    expect(isEmail('').isValid).toBe(false)
  })

  it('without @', () => {
    expect(isEmail('johngmail.com').isValid).toBe(false)
  })

  it('double @', () => {
    expect(isEmail('john@@gmail.com').isValid).toBe(false)
  })

  it('double @ indifferent position', () => {
    expect(isEmail('joh@n@gmail.com').isValid).toBe(false)
  })

  it('without .', () => {
    expect(isEmail('john@gmailcom').isValid).toBe(false)
  })

  it('without top level domain', () => {
    expect(isEmail('john@gmail.').isValid).toBe(false)
  })

  it('without dot and top level domain', () => {
    expect(isEmail('john@gmail').isValid).toBe(false)
  })

  it('without address', () => {
    expect(isEmail('@gmail.com').isValid).toBe(false)
  })

  it('invalid short top level domain', () => {
    expect(isEmail('a@b.c').isValid).toBe(false)
  })

  it('with space', () => {
    expect(isEmail('john doe@gmail.com').isValid).toBe(false)
  })

  it('invalid emails from https://gist.github.com/cjaoude/fd9910626629b53c4d25', () => {
    expect(isEmail('plainaddress').isValid).toBe(false)
    expect(isEmail('#@%^%#$@#$@#.com').isValid).toBe(false)
    expect(isEmail('@example.com').isValid).toBe(false)
    expect(isEmail('Joe Smith <email@example.com>').isValid).toBe(false)
    expect(isEmail('email.example.com').isValid).toBe(false)
    expect(isEmail('email@example@example.com').isValid).toBe(false)
    expect(isEmail('.email@example.com').isValid).toBe(false)
    expect(isEmail('email.@example.com').isValid).toBe(false)
    expect(isEmail('email..email@example.com').isValid).toBe(false)
    expect(isEmail('email@example.com (Joe Smith)').isValid).toBe(false)
    expect(isEmail('email@example').isValid).toBe(false)
    expect(isEmail('email@-example.com').isValid).toBe(false)
    // expect(isEmail('email@example.web').isValid).toBe(false)
    expect(isEmail('email@111.222.333.44444').isValid).toBe(false)
    expect(isEmail('email@example..com').isValid).toBe(false)
    expect(isEmail('Abc..123@example.com').isValid).toBe(false)
    expect(isEmail('”(),:;<>[\]@example.com').isValid).toBe(false)
    // expect(isEmail('just”not”right@example.com').isValid).toBe(false)
    expect(isEmail('this\ is"really"not\allowed@example.com').isValid).toBe(false)
  })
})

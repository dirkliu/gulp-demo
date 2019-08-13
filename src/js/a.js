import B from './b'

console.log('B:', b)

class A {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  getName () {
    return this.name
  }
}

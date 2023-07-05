import { deepCopy } from '../src/deepCopy.js';

describe('deepCopy using structuredClone', () => {
  it('should deep copy', () => {
    const original = [
      { name: 'John', age: 25 },
      { name: 'Alice', age: 30 },
    ];
    expect(deepCopy(original)).toEqual(original);
  });

  it('should make sure the copy is a different object', () => {
    const original = [
      {
        name: 'John',
        age: 25,
        email: 'email@fake.com',
        tags: ['tag1', 'tag2'],
        hobbies: [
          { name: 'reading', style: 'mental' },
          { name: 'painting', style: 'artistic' },
        ],
        not_defined: undefined,
        address: {
          street: '123 Main St',
          city: 'New York',
        },
      },
      {
        name: 'Alice',
        age: 30,
        email: null,
        not_defined: undefined,
        tags: ['tag1', 'tag2'],
        hobbies: [
          { name: 'coding', style: 'mental' },
          { name: 'football', style: 'physical' },
        ],
        address: {
          street: '456 Park Ave',
          city: 'Los Angeles',
        },
      },
    ];

    const copy = deepCopy(original);
    copy[0].name = 'Michael';
    copy[0].hobbies[1].name = 'paintball';
    copy[0].address.city = 'San Francisco';
    expect(copy[0].name).not.toEqual(original[0].name);
    expect(copy[0].hobbies).not.toEqual(original[0].hobbies);
    expect(copy[0].address.city).not.toEqual(original[0].address.city);
  });
});

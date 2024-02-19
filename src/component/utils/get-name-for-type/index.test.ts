import getNameForType from '.';

it('gets name where title is defined', () => expect(getNameForType({ name: 'bar', title: 'Foo' })).toBe('Foo'));
it('gets name where title is undefined, and start cases it', () => expect(getNameForType({ name: 'bar' })).toBe('Bar'));

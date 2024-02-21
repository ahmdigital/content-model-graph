import { Field, Type } from '../../types';
import getNameForType from '.';

it('gets name where title is defined', () =>
  expect(getNameForType({ name: 'bar', title: 'Foo' } as unknown as Field)).toBe('Foo'));
it('gets name where title is undefined, and start cases it', () =>
  expect(getNameForType({ name: 'bar' } as Type)).toBe('Bar'));

import { FilterByUniqueNamePipe } from './filter-by-unique-name.pipe';

describe('FilterByUniqueNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByUniqueNamePipe();
    expect(pipe).toBeTruthy();
  });
});

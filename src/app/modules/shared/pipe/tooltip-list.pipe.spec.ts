import { TooltipListPipe } from './tooltip-list.pipe';

describe('TooltipListPipe', () => {
  it('create an instance', () => {
    const pipe = new TooltipListPipe();
    expect(pipe).toBeTruthy();
  });

  it('empty array parameter', () => {
    const pipe = new TooltipListPipe();
    expect(pipe.transform([])).toEqual('');
  });

  it('string array parameter', () => {
    const pipe = new TooltipListPipe();
    expect(pipe.transform(['aa','bb', 'cc'])).toEqual('aa\nbb\ncc');
  });
});

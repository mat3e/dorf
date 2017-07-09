import { NestedComplexPage } from './app.po';

describe('nested-complex App', () => {
  let page: NestedComplexPage;

  beforeEach(() => {
    page = new NestedComplexPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

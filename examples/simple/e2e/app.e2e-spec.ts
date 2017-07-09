import { SimplePage } from './app.po';

describe('simple App', () => {
  let page: SimplePage;

  beforeEach(() => {
    page = new SimplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

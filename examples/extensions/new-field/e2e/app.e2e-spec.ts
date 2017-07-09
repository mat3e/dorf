import { NewFieldPage } from './app.po';

describe('new-field App', () => {
  let page: NewFieldPage;

  beforeEach(() => {
    page = new NewFieldPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { DifferentDefinitionPage } from './app.po';

describe('different-definition App', () => {
  let page: DifferentDefinitionPage;

  beforeEach(() => {
    page = new DifferentDefinitionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

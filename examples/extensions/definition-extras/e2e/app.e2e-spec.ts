import { DefinitionExtrasPage } from './app.po';

describe('definition-extras App', () => {
  let page: DefinitionExtrasPage;

  beforeEach(() => {
    page = new DefinitionExtrasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

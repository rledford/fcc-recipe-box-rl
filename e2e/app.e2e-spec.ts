import { FccRecipeBoxPage } from './app.po';

describe('fcc-recipe-box App', function() {
  let page: FccRecipeBoxPage;

  beforeEach(() => {
    page = new FccRecipeBoxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

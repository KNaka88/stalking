import { StalkingPage } from './app.po';

describe('stalking App', () => {
  let page: StalkingPage;

  beforeEach(() => {
    page = new StalkingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

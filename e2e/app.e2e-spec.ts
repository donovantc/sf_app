import { SfAppPage } from './app.po';

describe('sf-app App', function() {
  let page: SfAppPage;

  beforeEach(() => {
    page = new SfAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

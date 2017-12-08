import { RaghuErpPage } from './app.po';

describe('raghu-erp App', () => {
  let page: RaghuErpPage;

  beforeEach(() => {
    page = new RaghuErpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

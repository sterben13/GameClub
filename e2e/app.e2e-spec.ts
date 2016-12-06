import { GameClub2Page } from './app.po';

describe('game-club2 App', function() {
  let page: GameClub2Page;

  beforeEach(() => {
    page = new GameClub2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

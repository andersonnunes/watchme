import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AxiosMock from 'axios-mock-adapter';

import { App } from '../App';
import { api } from '../services/api';
import genres from './fixtures/genres.json';
import actionMovies from './fixtures/actionMovies.json';
import comedyMovies from './fixtures/comedyMovies.json';

function configureApiMock() {
  const apiMock = new AxiosMock(api);

  apiMock.onGet('genres').reply(200, genres);
  apiMock.onGet('genres/1').reply(200, {});
  apiMock.onGet('movies/?Genre_id=1').reply(200, actionMovies);
  apiMock.onGet('genres/2').reply(200, {});
  apiMock.onGet('movies/?Genre_id=2').reply(200, comedyMovies);
}

describe('App', () => {
  it('should render component', async () => {
    configureApiMock();

    render(<App />);

    const sidebar = await screen.findByRole('navigation');
    const comedyOption = await within(sidebar).findByText("Comédia");
    userEvent.click(comedyOption);

    await waitFor(() => {
      expect(screen.queryByText(/Underdog/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Bruce Almighty/i)).toBeInTheDocument();
      expect(screen.queryByText(/Apollo 11/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/The Blue Lagoon/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mary/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/100% Wolf/i)).not.toBeInTheDocument();
    });
  });
});




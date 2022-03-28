import { create } from 'domain';
import { createServer, Model } from 'miragejs';
import { AnyResponse } from 'miragejs/-types';

import genresFixture from './fixtures/genres.json';
import moviesFixture from './fixtures/movies.json';

export function setupMiragejs() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/genres', () => {
        return genresFixture;
      });

      this.get('/genres/:id', (schema, request) => {
        return genresFixture.find(x => x.id === Number(request.params.id)) as AnyResponse;
      });

      this.get('/movies', (schema, request) => {
        const id = request.queryParams.Genre_id;

        return moviesFixture.filter(x => x.Genre_id === Number(id));
      });
    }
  })
}

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'detalhes/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [{id:'0'}]
    }
  },
  {
    path: 'timeDetalhes/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [{id:'0'}]
    }
  },
];

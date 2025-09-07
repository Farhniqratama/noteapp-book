const routes = {
  '': () => import('./views/HomeView.js'),
  '#/': () => import('./views/HomeView.js'),
  '#/add': () => import('./views/AddView.js'),
  '#/detail': () => import('./views/DetailView.js'),
  '#/favorites': () => import('./views/FavoritesView.js'),
  '#/auth': () => import('./views/AuthView.js'),
  '#/404': () => import('./views/NotFoundView.js'),
}

export async function navigate() {
  document.startViewTransition?.(() => {})
  const path = location.hash || '#/'
  const key = path.split('?')[0]
  const loader = routes[key] || routes['#/404']
  const module = await loader()
  return module.default
}

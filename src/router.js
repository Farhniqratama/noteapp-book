const routes = {
  '/': () => import('./views/HomeView.js').then(m => m.default),
  '/auth': () => import('./views/AuthView.js').then(m => m.default),
  '/add': () => import('./views/AddView.js').then(m => m.default),
  '/favorites': () => import('./views/FavoritesView.js').then(m => m.default),
  '*': () => import('./views/NotFoundView.js').then(m => m.default),
}

export async function navigate(){
  const path = (location.hash || '#/').slice(1) || '/'
  const loader = routes[path] || routes['*']
  return loader()
}
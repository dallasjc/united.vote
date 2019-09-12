module.exports = {
  'not-found': () => import('./views/not-found-page'),
  '/': () => import('./views/home-page'),
  '/join': () => import('./views/join-page'),
  '/candidate': () => import('./views/candidate'),
  '/get_involved': () => import('./views/get-involved'),
  '/candidate_confirmation': () => import('./views/candidate-confirmation'),
  '/sign_in': () => import('./views/sign-in-page'),
  '/sign_in/verify': () => import('./views/verify-otp-page'),
  '/sign_out': () => import('./views/sign-out-page'),
  '/activity': () => import('./views/activity-page'),
  '/edit_profile': () => import('./views/edit-profile-page'),
  '/settings': () => import('./views/settings-page'),
  '/settings/unsubscribe': () => import('./views/settings-unsubscribe-page'),
  '/legislation/create': () => import('./views/edit-legislation-page'),
  '/legislation/yours': () => import('./views/user-legislation-page'),
  '/petitions/create': () => import('./views/edit-petition-page'),
  '/legislation/:shortId': () => import('./views/measure-details-page'),
  '/nominations/:shortId': () => import('./views/measure-details-page'),
  '/legislation/:shortId/import': () => import('./views/import-vote-page'),
  '/nominations/:shortId/import': () => import('./views/import-vote-page'),
  '/legislation/:shortId/votes/:voteId': () => import('./views/measure-details-page'),
  '/nominations/:shortId/votes/:voteId': () => import('./views/measure-details-page'),
  '/proxies': () => import('./views/proxies-page'),
  '/get_started': () => import('./views/get-started-page'),
  '/get_started/basics': () => import('./views/get-started-basics-page'),
  '/get_started/verification': () => import('./views/get-started-verification-page'),
  '/get_started/profile': () => import('./views/get-started-profile-page'),
  '/twitter/:username': () => import('./views/profile-page'),
  '/policies': () => import('./views/policies-page'),
  '/metrics': () => import('./views/metrics-page'),
  '/:username': () => import('./views/profile-page'),
  '/:username/:shortId': () => import('./views/measure-details-page'),
  '/:username/:shortId/import': () => import('./views/import-vote-page'),
  '/:username/:shortId/edit': () => import('./views/edit-legislation-page'),
  '/:username/:shortId/votes/:voteId': () => import('./views/measure-details-page'),
}

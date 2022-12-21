export default function (context) {
  const token = localStorage.getItem('av_token')
  if (context.route.path == '/login') {
    return
  }
  if (token) return context.$axios.setToken(token, 'Bearer')
  context.redirect('/login')
}

export default function (context) {
  try {
    const token = localStorage.getItem('av_token')
    if (token && context.route.path !== '/login') {
      context.$axios.setToken(token, 'Bearer')
    }
    context.redirect('/login')
  } catch (error) {
    console.log(error)
  }
}

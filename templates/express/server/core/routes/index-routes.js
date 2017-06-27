

export default function routes ({ app }) {
  app.route('/').get((request, res) => {
    return res.render('index');
  });
}

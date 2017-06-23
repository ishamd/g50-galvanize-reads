

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/reads_dev'
  },
  production: {
    client: 'pg',
    connection: 'postgres://qogykodrjxqhls:2556d86d2dc4b66f1b2e9ca8ce686bfb51c55d52cca268743f18c038d73e5a2a@ec2-107-22-250-33.compute-1.amazonaws.com:5432/d97sbs337tn6d2'
  }
};

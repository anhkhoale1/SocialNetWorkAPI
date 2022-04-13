module.exports = {
  development: {
    express: {
      type: 'development',
      port: 3000,
    },
    mongodb: {
      host: 'mongodb://localhost:27017/users'
    }
  },
  production: {
    express: {
      type: 'production',
      port: 3000,
    },
    mongodb: {
      host: 'mongodb://localhost:27017/users'
    }
  }
}
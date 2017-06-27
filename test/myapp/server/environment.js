export default {
  development: {
    port: "8000",
    domain: "localhost",
    title: "Guru Dev",
    database: {
      mongodb: {
        uri: "mongodb://127.0.0.1:27017/test",
        opts: {
          server: {
            socketOptions: { keepAlive: 1 }
          }
        }
      }
      // redis: {
      //   uri : '127.0.0.1',
      //   port: 6379
      // },
      // rethinkdb: {
      //   port: 28015,
      //   host: 'localhost',
      //   db  : 'test'
      // }
    }
  },
  staging: {
    port: "8000",
    domain: "localhost",
    title: "Guru Staging",
    database: {
      redis: {
        uri: "127.0.0.1",
        port: "6379"
      }
    }
  },
  production: {
    port: "8000",
    domain: "localhost",
    title: "Guru Pro",
    database: {
      redis: {
        uri: "127.0.0.1",
        port: "6379"
      }
    }
  }
};

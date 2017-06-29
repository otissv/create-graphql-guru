# Create GraphQL Guru
 Easily Scaffold and generate graphql servers  

**Still under heavy development with frequent breaking changes**

## Quick overview  
```npm install -g create-graphql-guru-sever

create-graphql-guru my-server  
cd my-server  
npm run dev
```

### Get Started Immediately
You **don’t** need to install or configure tools like Webpack or Babel.
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Getting started

### Installation
Install once globally:

```npm install -g create-graphql-guru-sever```

You will need **Node >= 6 on your machine**. You can you [n](https://github.com/tj/n#installation) or [nvm](https://github.com/creationix/nvm#installation)

### Creating a server
To create a new server, run:  

```create-graphql-guru-server my-server

cd my-server
npm run dev  
```

It will create a directory called  `my-server` inside the current folder.  
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-server
├── bin
│   └── www
│       └── index.js
├── node_modules
├── public
├── server
│   ├── core
│   │   ├── database
│   │   ├── middleware
│   │   │   └── index-middleware.js
│   │   ├── routes
│   │   │   └── index-routes.js
│   │   └── database.js 
│   ├── modules
│   │   └── resolverQuery-hello.js 
│   │   └── schemaQuery-hello.graphql 
│   │   └── schemaType-hello.graphql 
│   │   └── access.js 
│   ├── queries
│   ├── views
│   │   └── layout 
│   │   └── index.hbs 
│   ├── environment.js
│   └── index.js
├── LICENSE
├── package.json
├── query-history.json
├── README.md
└── yarn.lock
```

No configuration or complicated folder structures, just the files you need to build your app.
Once the installation is done, you can run some commands inside the project folder:

`npm run dev` or `yarn run dev`


# Create GraphQL Guru
 Easily Scaffold and generate graphql servers  

## Features
- Scaffolding a full server
- Dynamic imports
- Structureless modules
- Multiple pluggable database clients
- Resolver caching
- Schema and query validation
- IDE and admin tools
- Do just enough and step out the way

## Databases
While any database can be used with GraphQL Guru, the following perbuilt resolvers have been created for convenience:

- [graphql-guru-mongodb](https://github.com/otissv/graphql-guru-mongodb)
- [graphql-guru-sequelize](https://github.com/otissv/graphql-guru-sequelize) - PostgreSQL, MySQL, SQLite and MSSQL 
- [graphql-guru-redis](https://github.com/otissv/graphql-guru-redis)
- [graphql-guru-rethinkdb](https://github.com/otissv/graphql-guru-rethinkdb)
- [graphql-guru-jsondb](https://github.com/otissv/graphql-guru-jsondb)

## Quick overview  
```npm install -g create-graphql-guru-sever

guru express my-server  
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

```npm install -g create-graphql-guru```

You will need **Node >= 6 on your machine**. You can you [n](https://github.com/tj/n#installation) or [nvm](https://github.com/creationix/nvm#installation)

### Creating a server
To create a new server, run:  

```
guru express my-server

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

## Generating files


### Types
`guru type` generate type definition.

Example
```
guru type  -m User -e "Enum USER GUEST" -o "User name:string lastName:String age:Int" 
```

```
 Usage: guru type [options]

Options:

  -m, --module <name>                 Module name
  -p, --path                          Path to where module will be created, relative to root.
  -e, --enum ["name value"]           creates Enum definition
  -f, --interface ["name key:value"]  interface definition
  -i, --input ["name key:value"]      input definition
  -o, --object ["name key:value"]     Object definition
  -s, --scalar ["name key:value"]     Scalar definition
  -u, --union ["name key:value"]      creates Union definition
  -h, --help                          output usage information
```

### Queries

`guru query` generates resolver and schema queries.

Example
```
guru query -m User -d 'mongodb' -rs 'User' findAll findById
```

Query options
```
Usage: guru query [options]

Options:

  -m, --module <name>    Modules name
  -d, --database <name>  Extends module with database client
  -r, --resolver [true]  Create mutation resolve
  -s, --schema [true]    Name of query module
  -p, --path             Path to where module will be created, relative to root.
  -h, --help             output usage information
```

### Mutations
`guru mutation` generates resolver and schema queries.

Example
```
guru mutation -m query -d 'mongodb' -rs 'User' create update remove
```

Mutation options
```
Usage: guru-mutation [options]

Options:

  -m, --module <name>    Modules name
  -d, --database <name>  Extends module with database client
  -r, --resolver [true]  Create mutation resolve
  -s, --schema [true]    Name of query module
  -p, --path             Path to where module will be created, relative to root.
  -h, --help             output usage information
```
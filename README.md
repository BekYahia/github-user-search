# Github User Search
Github user search app using Vue3 and leveraging Github public [Graphql API v4](https://docs.github.com/en/graphql/overview/about-the-graphql-api)

Why Graphql? Github REST API has some limitation, Plus, base on this app requirements, graph in the best fit

For better understanding, check [Github Search API](https://docs.github.com/en/rest/reference/search)

But Long Story Short:
- GitHub Search API provides up to 1,000 results for each search
- Up to 30 requests, For authenticated requests
- Up to 10 requests, For Unauthenticated requests

## Demo
[Live Demo](https://abubakeryahia.com/demos/github-user-search)

## Built with
- Vue3 and it's ecosystem

### also,
- **focus-visible**: To differentiate focus between keyboard and mouse users, and better focus managment. *FOR better accessibility :)* [view repo](https://github.com/WICG/focus-visible)
- **Card skeleton loader**, *FOR better User Experience* [a post on dev.to](https://dev.to/devggaurav/build-a-simple-card-skeleton-loader-component-using-html-and-css-3a20)

## NOTE
SET User Github token in your *.env* : **VUE_APP_GITHUB_TOKEN**


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

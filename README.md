# Post Interview Challenge

A small single page application built using the following technologies:

- [Node.js](https://nodejs.org/en/)
- [AngularJS](https://angularjs.org/)
- [Restangular](https://github.com/mgonto/restangular) - An alternative to using $resource
- [ng-grid](https://www.npmjs.com/package/ng-grid) - For displaying records in a lazy-loading table with sortable columns
- [MongoDB](https://api.mongolab.com/api/1/databases/challenge-db/collections/tools?apiKey=JiY3STffidCB_PDLbVoWiNotWTZpTTVQ) - to store the data (click link to see raw JSON output)

## Note: To run this app locally perform the following steps:

1.  Clone the repo
2.  Run `npm install`
3.  Run `http-server` from the terminal and point your browser to http://127.0.0.1:8080 or whatever resulting address is for your machine

## Requirements not met:

- Currently to edit a list item you must click on the item name. This may need to be reworked so that a user can select a single row and then click an edit button to be taken to the edit page.
- Currently using `put` instead of `patch` to create new list items, as well as for editing existing list items. This is due to a a resulting `Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response` error that I have yet to resolve when using `patch` to edit an existing entry (`patch` works for creating new entries).

## Issues:

- ng-grid height requires an inline style hack to get it working. Attempted to use `ng-grid-flexible-height.js` without success.

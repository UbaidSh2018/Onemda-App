## Node compatability issues. 

If you have issues with either `expect node version XX this was compiled with YY`, or expecting 11.x then: 

Use `nvm` to be running node 11.x

```
rm -rf dist
rm -rf node_modules
yarn install && yarn build && yarn start
```

Should solve it. 



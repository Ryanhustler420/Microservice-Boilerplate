# Steps to publish this on `NPM` registry

**Make sure you are login into `npm` in `npm cli`**

1.  Create an organisation in `NPM` registry for example `project-abcd`

2.  change the name in `package.json`

```json
{
  "name": "@project-abcd/common"
  // ... rest
}
```

3.  Everytime you publish new release

```bash
git add .
git commit -am "changed something"
npm run pub
```

4.  Everywhere else where you are using this package

```bash
npm update @project-abcd/common --save
```

# As Children Repository

1.  Go to parent repository
2.  Run `git add /common`
3.  Run `git commit -am "any message"`
4.  Run `git push origin branch`
5.  Back to this repository
6.  Run `npm run pub`

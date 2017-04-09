# git-chipper

An interactive CLI for batch deleting local branches.

<img alt="CLI demo" src="cli-demo.gif" width="998">


## Install

```
$ npm install --global git-chipper
```


## CLI

```
$ git-chipper --help

  An interactive CLI for batch deleting local branches.

  Usage
    $ git-chipper

  Options
    -f, --force
      Force delete selected branches.

    -n, --not
      Select all branches not named in this comma-separated list.

  Examples
    $ git-chipper
    # ...follow the terminal prompt instructions

    $ git-chipper --not=foo,bar,baz
    # ...follow the terminal prompt instructions
```


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)

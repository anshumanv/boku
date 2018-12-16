<p align="center">
  <img src="./icon.png" align="center" width="150">
</p>

<h1 align="center"> boku </h1>
<p align="center">
<img src="https://img.shields.io/npm/v/boku.svg?style=for-the-badge" align="center">

<img src="https://img.shields.io/npm/dt/boku.svg?style=for-the-badge" align="center">

<img src="https://img.shields.io/github/license/anshumanv/boku.svg?style=for-the-badge" align="center">

</p>

<p align="center">A scaffolding tool to generate personalised cli.</p>

## Demo

Soon!

## Usage

```sh
$ npx boku

//=> Fill your info as per the prompt

//=> Push the generated code somewhere

//=> Publish the module
$ npm publish


//=> Run anywhere!
$ npx username
```

OR

```sh
$ npm i -g boku
$ boku

//=> Push and publish
```


### Image

* Presently the image is fetched from the GitHub API of the provided username.

* To use a custom image from url, simply swap out the image url `avatar_url`.

* To use an image file, 

```sh
const path = require('path);
.
.
terminalImage.file(path.join(__dirname, 'image_name.xyz'))
.
.
termImg.file(path.join(__dirname, 'image_name.xyz'), { fallback })

```


## Uses

The handlebars template which is scaffolded out is [here](https://github.com/anshumanv/my-cli-template).


## Thanks

* Amazing [boku no hero academia](https://en.wikipedia.org/wiki/My_Hero_Academia) artwork by [Fazendaaa](https://github.com/Fazendaaa). 🆒
* Template heavily inspired from the [sindresorhus](https://github.com/sindresorhus/sindresorhus) cli. 🙏


## Author

[Anshuman Verma](https://github.com/anshumanv)

[<img src="https://image.flaticon.com/icons/svg/185/185961.svg" width="35" padding="10">](https://twitter.com/Anshumaniac12)
[<img src="https://image.flaticon.com/icons/svg/185/185964.svg" width="35" padding="10">](https://linkedin.com/in/anshumanv12)
[<img src="https://image.flaticon.com/icons/svg/185/185981.svg" width="35" padding="10">](https://www.facebook.com/anshumanv12)


## Contribute

Found a bug? please [create an issue](https://github.com/anshumanv/boku/issues/new)

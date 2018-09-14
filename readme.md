# Halko

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/halko)

Halko is content editor powered by React.js plugins.

**Join our community on [spectrum.chat/halko](https://spectrum.chat/halko).**

---

## How to use

### Setup

Install editor core and basic plugins:
```bash
npm i --save @halko/editor @halko/plugin-text @halko-plugin-image
```

### Usage

```jsx
import React from 'react'

import { Editor } from '@halko/editor'
import { Image } from '@halko/plugin-image'
import { Text } from '@halko/plugin-text'

const App = () => (
  <div>
    <h1>Using Halko in React</h1>
    <Editor plugins={[Text, Image]} />
  </div>
)
```

### Configuring plugins

To configure plugin, wrap it in array and pass config as second array element:

```jsx
<Editor plugins={[Text, [Image, config]]} />
```

### Initializing with content

```jsx
<Editor
  initialValue={[
    {plugin: 'text', data: '<p>Hello world</p>'},
    {plugin: 'text', data: '<p>Second line</p>'},
  ]}
 />
```

### Getting content

```jsx
<Editor onChange={api => {
  this.setState({editorContent: api.getContent()})
} />
```

### Rendering read only content

Content rendering is handled by plugins used to create that content. To render it, use `Renderer` component and pass the same plugins you passed to `Editor`.

```jsx
import React from 'react'

import { Renderer } from '@halko/editor'
import { Image } from '@halko/plugin-image'
import { Text } from '@halko/plugin-text'

const App = () => (
  <div>
    <h1>Using Halko in React</h1>
    <Renerer
      plugins={[Text, Image]}
      value={[
        {plugin: 'text', data: '<p>Hello world</p>'},
        {plugin: 'text', data: '<p>Second line</p>'},
      ]}
    />
  </div>
)
```

## Hooks

**onInit**

```jsx
<Editor onInit={api => /* handle init */} />
```

**onChange**

```jsx
<Editor onChange={api => /* handle change */} />
```
## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install project dependencies: `npm i`
3. Install packages dependencies: `npm run bootstrap`
4. Run packages build script in watch mode: `npm run watch`
5. Run playground server: `npm run dev`
6. Access playground at: [localhost:3000](http://localhost:3000/)

## Authors

- Kasper Mikiewicz ([@idered](https://twitter.com/idered)) – [Eyedea](https://github.com/eyedea-io)

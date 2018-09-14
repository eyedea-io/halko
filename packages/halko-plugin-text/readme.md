# Halko Text Plugin

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/halko)

Basic text plugin based on Draft.js

**Join our community on [spectrum.chat/halko](https://spectrum.chat/halko).**

---

## How to use

### Setup

Install editor core and basic plugins:

```bash
npm i --save @halko/plugin-text
```

### Usage

```jsx
import React from 'react'

import { Editor } from '@halko/editor'
import { Text } from '@halko/plugin-text'

const App = () => (
  <div>
    <h1>Using Halko in React</h1>
    <Editor plugins={[Text]} />
  </div>
)
```

## Contributing

Please see our main [readme.md](/readme.md)

## Authors

- Kasper Mikiewicz ([@idered](https://twitter.com/idered)) – [Eyedea](https://github.com/eyedea-io)

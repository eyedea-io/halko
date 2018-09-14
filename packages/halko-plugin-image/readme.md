# Halko Text Plugin

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/halko)

Basic plugin for adding images to Halko editor.

**Join our community on [spectrum.chat/halko](https://spectrum.chat/halko).**

---

## How to use

### Setup

Install editor core and basic plugins:

```bash
npm i --save @halko/plugin-image
```

### Usage

This plugin requires additional configuration to properly handle image uploads.

```jsx
import React from 'react'
import axios from 'axios'

import { Editor } from '@halko/editor'
import { Image } from '@halko/plugin-image'

const App = () => (
  <div>
    <Editor
      plugins={[
        [Image, {
          handleUpload: async (file: File, {onUploadProgress}: any) => {
            const formData = new FormData()

            formData.append('file', file)

            return axios.post('IMAGE_UPLOAD_URL', formData, {onUploadProgress})
          }
        }]
      ]} />
  </div>
)
```

## Contributing

Please see our main [readme.md](/readme.md)

## Authors

- Kasper Mikiewicz ([@idered](https://twitter.com/idered)) – [Eyedea](https://github.com/eyedea-io)

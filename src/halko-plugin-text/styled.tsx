import styled from 'styled-components'
import * as React from 'react'

export const TextArea = styled.textarea.attrs({})<React.TextareaHTMLAttributes<{}>>`
  display: block;
  width: 100%;
  border: none;
  font-size: inherit;
  font-family: inherit;
  resize: none;
  margin: 16px 0;
  padding: 0;

  &:focus {
    outline: none;
  }
`

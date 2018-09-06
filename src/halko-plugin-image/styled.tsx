import styled from 'styled-components'

export const ImageInput = styled.input.attrs({
  tabIndex: 0,
  type: 'file',
  autoFocus: true,
})`
  margin: 16px 0;
`

export const ImagePreview = styled.img.attrs({
  tabIndex: 0,
})`
  margin: 16px 0;
  width: 100%;
  display: block;
`
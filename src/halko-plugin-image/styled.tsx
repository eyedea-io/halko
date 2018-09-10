import styled from 'styled-components'

export const Image = styled.img`
  width: 100%;
`

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

export const ImageWrapper = styled.div`
  position: relative;
`

export const ProgressBar = styled.div.attrs({})<{
  progress: number
}>`
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: 0;
  left: 0;
  transition: opacity 400ms ease-in-out;
  opacity: ${_ => _.progress >= 0 && _.progress < 100 ? 1 : 0};

  background: rgba(0, 0, 0, 0.5);
`

export const ProgressBarFill = styled.div`
  position: absolute;
  height: 4px;
  left: 0;
  bottom: 0;
  transition: width 400ms ease-in-out;

  background: #3AA952;
  box-shadow: 0px 0px 4px #3DB057;
`

import styled from 'styled-components'

export const Image = styled.img`
  width: 100%;
`

export const ImagePreview = styled.img.attrs({
  tabIndex: 0,
})`
  margin: 16px 0;
  width: 100%;
  display: block;

  &:focus {
    outline: 4px solid #111;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  margin: 16px 0;
`

export const ImageInput = styled.input.attrs({
  tabIndex: 0,
  type: 'file',
  autoFocus: true,
})`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`

export const ImageDropArea = styled.label.attrs({})<{
  isActive: boolean
}>`
  display: block;
  max-width: 100%;
  transition: border-color .25s ease, color .25s ease;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px dashed ${_ => _.isActive ? '#000' : '#e5e5e5'};
  padding: 32px;
  text-align: center;
  color: #999;
  cursor: pointer;
  margin: 16px 0;

  &:hover {
    color: #333;
    border-color: #000;
  }
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

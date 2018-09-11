import styled from 'styled-components';
export const TooltipContainer = styled.div`
  position: relative;
`;
export const TooltipWrapper = styled.div`
  position: absolute;
  z-index: 10;
  visibility: hidden;
  height: 10px;
  width: 100%;
  margin-top: -8px;

  ${TooltipContainer}:hover & {
    visibility: visible;
  }
`;
export const TooltipInner = styled.div`
  display: flex;
  bottom: 100%;
  position: absolute;

  background: #FFFFFF;
  border: 1px solid rgba(0,0,0, .1);
  box-shadow: 0px 1px 3px rgba(51, 51, 51, 0.1);
  border-radius: 40px;
  padding: 0px 8px;
`;
export const TooltipItem = styled.a`
  display: block;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
  color: #444;
  transition: color .25s;
  white-space: nowrap;

  svg {
    vertical-align: top;
  }

  &:hover {
    color: #111;
  }
`;
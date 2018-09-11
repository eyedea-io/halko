import styled from 'styled-components'

export const ToolbarInner = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid #f5f5f5;

  > * + * {
    margin-left: 8px;
  }
`

export const ToolbarItem = styled.a`
  display: block;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: .025em;
  color: #444;
  transition: color .25s;

  &:hover {
    color: #111;
  }
`

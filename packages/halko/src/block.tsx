import * as React from 'react'
import {EditorApi} from './api'
import {Entity} from './entity'

export interface Block {
  id: string
  label: string
  title: string
  data: any
  config?: any
  isInline?: boolean
  isBlock?: boolean
  isLeaf?: boolean
  renderer?: React.ComponentType<{
    data: any
  }>
  component: React.ComponentType<{
    api: EditorApi
    entity: Entity
    config?: any
  }>
}

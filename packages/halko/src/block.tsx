import * as React from 'react'
import { Entity } from './entity'

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
    entity: Entity
    config?: any
  }>
}

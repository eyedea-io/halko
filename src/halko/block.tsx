import * as React from 'react'
import { Entity } from './entity'

export interface Block {
  id: string
  label: string
  title: string
  data: any
  isInline?: boolean
  isBlock?: boolean
  isLeaf?: boolean
  component: React.ComponentType<{
    entity: Entity
  }>
}
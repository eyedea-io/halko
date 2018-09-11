import { EditorApi } from './api'
import { Block } from './block'

export type EditorPlugin = (api?: EditorApi, config?: any) => Block

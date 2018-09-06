import * as React from 'react'
import { EditorPlugin } from './plugin'
import { Toolbar } from './toolbar'
import { Layout } from './styled'
import { EntityList } from './entity-list'
import { Entity } from './entity'
import { EditorApi } from './api'
import { Block } from './block'

export {Block, Entity, EditorApi}

interface Props {
  plugins: EditorPlugin[]
  initialValue?: {
    block: string
    data: any
  }[]
  onInit?: (api: EditorApi) => void
  onChange?: (api: EditorApi) => void
}

interface State {
  wasInitialised: boolean
  entities: Entity[]
}

export class Editor extends React.Component<Props, State> {
  state: State = {
    wasInitialised: false,
    entities: []
  }

  async componentDidMount() {
    if (this.props.initialValue) {
      await this.setInitialValue(this.props.initialValue)
    }

    this.setState({wasInitialised: true})
    
    if (this.props.onInit) {
      this.props.onInit(this.api)
    }
  }

  render() {
    return (
      <Layout>
        <EntityList entities={this.state.entities} />
        <Toolbar blocks={this.blocks} createEntity={this.createEntity} />
      </Layout>
    )
  }

  private setInitialValue = async (initialValue) => {
    initialValue.forEach(item => {
      const entity = this.createEntityByBlockName(item.block)

      entity.updateData(item.data)
    })
  }

  private triggerOnChange = () => {
    if (this.props.onChange && this.state.wasInitialised) {
      this.props.onChange(this.api)
    }
  }

  private createEntityByBlockName = (blockName: string, data?: any) => {
    const block = this.blocks.find(item => item.id === blockName)

    if (block) {
      return this.createEntity(block)
    } else {
      throw new Error(`Invalid block: ${blockName}`)
    }
  }

  private createEntity = (block: Block) => {
    const entity = new Entity(this.api, {block})
    
    const changeState = (state: State) => ({
      entities: state.entities.concat([entity])
    })

    this.setState(changeState, this.triggerOnChange)

    return entity
  }

  private updateEntity = (entity: Entity) => {
    const changeState = (state: State) => ({
      entities: state.entities.map(item => item.id === entity.id ? entity : item)
    })

    this.setState(changeState, this.triggerOnChange)

    return entity
  }

  private removeEntity = (entity: Entity) => {
    const changeState = (state: State) => ({
      entities: state.entities.filter(item => item.id !== entity.id)
    })

    this.setState(changeState, this.triggerOnChange)
  }

  private getEntities = () => {
    return this.state.entities
  }

  private getContent = () => {
    return this.state.entities.map(item => ({
      block: item.block.id,
      data: item.data
    }))
  }

  private get api(): EditorApi {
    return {
      getContent: this.getContent,
      getEntities: this.getEntities,
      createEntity: this.createEntity,
      removeEntity: this.removeEntity,
      updateEntity: this.updateEntity
    }
  }

  private get blocks() {
    return this.props.plugins.map(plugin => plugin(this.api))
  }
}

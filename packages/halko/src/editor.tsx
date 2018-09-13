import * as React from 'react'
import {EditorApi} from './api'
import {Block} from './block'
import {Entity} from './entity'
import {EntityList} from './entity-list'
import {EditorPlugin} from './plugin'
import {Layout} from './styled'
import {Toolbar} from './toolbar'

interface Props {
  plugins: Array<[EditorPlugin, any] | EditorPlugin>
  initialValue?: {
    block: string
    data: any
  }[]
  onInit?: (api: EditorApi) => void
  onChange?: (api: EditorApi) => void
}

interface State {
  showTooltip: boolean
  wasInitialised: boolean
  entities: Entity[]
}

export class Editor extends React.Component<Props, State> {
  state: State = {
    showTooltip: true,
    wasInitialised: false,
    entities: [],
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
        <EntityList entities={this.state.entities} showTooltip={this.state.showTooltip} api={this.api} />
        <Toolbar blocks={this.blocks} createEntity={this.createEntity} />
      </Layout>
    )
  }

  private setInitialValue = async (initialValue: any) => {
    initialValue.forEach((item: any) => {
      const entity = this.createEntityByBlockName(item.block)

      entity.updateData(item.data)
    })
  }

  private setTooltipVisibility = async (visible: boolean) => {
    this.setState({
      showTooltip: visible,
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
      entities: state.entities.concat([entity]),
    })

    this.setState(changeState, this.triggerOnChange)

    return entity
  }

  private updateEntity = (entity: Entity) => {
    const changeState = (state: State) => ({
      entities: state.entities.map(item => item.id === entity.id ? entity : item),
    })

    this.setState(changeState, this.triggerOnChange)

    return entity
  }

  private removeEntity = (entity: Entity) => {
    const changeState = (state: State) => ({
      entities: state.entities.filter(item => item.id !== entity.id),
    })

    this.setState(changeState, this.triggerOnChange)
  }

  private getEntities = () => {
    return this.state.entities
  }

  private moveEntity = (entity: Entity, newIndex: number) => {
    if (newIndex > this.state.entities.length) {
      return
    }

    this.setState((state: State) => {
      const currentIndex = state.entities.findIndex(item => item.id === entity.id)
      const {entities} = state

      entities.splice(currentIndex, 1)
      entities.splice(newIndex, 0, entity)

      return {entities}
    }, this.triggerOnChange)
  }

  private getContent = () => {
    return this.state.entities.map(item => ({
      block: item.block.id,
      data: item.data,
    }))
  }

  private get api(): EditorApi {
    return {
      getContent: this.getContent,
      getEntities: this.getEntities,
      createEntity: this.createEntity,
      removeEntity: this.removeEntity,
      updateEntity: this.updateEntity,
      setTooltipVisibility: this.setTooltipVisibility,
      moveEntity: this.moveEntity,
    }
  }

  private get blocks() {
    return this.props.plugins.map(plugin => {
      if (Array.isArray(plugin)) {
        return plugin[0](this.api, plugin[1])
      }

      return plugin(this.api)
    })
  }
}

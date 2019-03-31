import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

import initialData from './initial-data'
import Column from './column'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 180px);
  width: ${props =>
    props.columns.length * 400 + (props.columns.length - 1) * 24}px;
`

class InnerList extends PureComponent {
  render() {
    const { column, tasks, index } = this.props

    return <Column column={column} tasks={tasks} index={index} />
  }
}

class Board extends Component {
  state = {
    columns: this.props.columns,
  }

  onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    )
  }

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`

    provided.announce(message)
  }

  onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
        ${result.source.index + 1}`

    provided.announce(message)

    const { destination, source, draggableId, type } = result

    /**
     * Handle cases where updation isn't necessary
     */
    if (!destination) {
      return false
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return false
    }

    /**
     * Handle cases for re-ordering columns
     */
    if (type === 'column') {
      const columns = this.state.columns
      const splicedColumn = this.state.columns[source.index]

      columns.splice(source.index, 1)
      columns.splice(destination.index, 0, splicedColumn)

      this.setState({ columns })
    }

    /**
     * Handle cases for re-ordering tasks within the same list
     */
    if (type === 'task') {
      const home = find(this.state.columns, c => c.id === source.droppableId)
      const foreign = find(
        this.state.columns,
        c => c.id === destination.droppableId
      )

      if (home.id === foreign.id) {
        const tasks = find(this.state.columns, c => c.id === source.droppableId)
          .tasks
        const splicedTasks = tasks[source.index]

        tasks.splice(source.index, 1)
        tasks.splice(destination.index, 0, splicedTasks)

        home.tasks = tasks

        const columns = this.state.columns
        const index = findIndex(this.state.columns, c => c.id === home.id)
        columns[index] = home

        this.setState({ columns })
      }

      /**
       * Handle cases for re-ordering tasks within different lists
       */
      let tasks = find(this.state.columns, c => c.id === source.droppableId)
        .tasks
      let splicedTasks = tasks[source.index]

      tasks.splice(source.index, 1)

      home.tasks = tasks

      tasks = find(this.state.columns, c => c.id === destination.droppableId)
        .tasks
      tasks.splice(destination.index, 0, splicedTasks)

      foreign.tasks = tasks

      let columns = this.state.columns
      let index = findIndex(this.state.columns, c => c.id === home.id)
      columns[index] = home

      index = findIndex(this.state.columns, c => c.id === foreign.id)
      columns[index] = foreign

      this.setState({ columns })
    }
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
              columns={this.state.columns}
            >
              {this.state.columns.map((column, index) => {
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    tasks={column.tasks}
                    index={index}
                  />
                )
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default Board

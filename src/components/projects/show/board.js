import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Column from './column'
import { SourceNode } from 'source-map'

const UPDATE_TASKS = gql`
  mutation UPDATE_TASKS(
    $id: uuid!
    $content: String
    $sequence: Int
    $column_id: uuid
  ) {
    update_tasks(
      where: { id: { _eq: $id } }
      _set: { content: $content, sequence: $sequence, column_id: $column_id }
    ) {
      affected_rows
      returning {
        id
        content
        sequence
      }
    }
  }
`
const UPDATE_COLUMNS = gql`
  mutation update_columns($id: uuid, $title: String, $sequence: Int) {
    update_columns(
      where: { id: { _eq: $id } }
      _set: { title: $title, sequence: $sequence }
    ) {
      affected_rows
      returning {
        id
        title
        sequence
      }
    }
  }
`
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

  onDragEnd = (result, provided, update_columns, update_tasks) => {
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
      /**
       * Find the sourceColumn and destinationColumn and exchange their sequence
       */
      const sourceColumn = this.props.columns[source.index]
      const sequenceOfSourceColumn = sourceColumn.sequence
      const destinationColumn = this.props.columns[destination.index]
      const sequenceOfDestinationColumn = destinationColumn.sequence

      sourceColumn.sequence = sequenceOfDestinationColumn
      destinationColumn.sequence = sequenceOfSourceColumn

      /**
       * Save both the updated columns
       */
      update_columns({
        variables: {
          id: sourceColumn.id,
          title: sourceColumn.title,
          sequence: sourceColumn.sequence,
        },
      })

      update_columns({
        variables: {
          id: destinationColumn.id,
          title: destinationColumn.title,
          sequence: destinationColumn.sequence,
        },
      })
    }

    /**
     * Handle cases for re-ordering tasks
     */
    if (type === 'task') {
      /**
       * Find the source and destination column
       */
      const sourceColumn = find(
        this.props.columns,
        c => c.id === source.droppableId
      )
      const destinationColumn = find(
        this.props.columns,
        c => c.id === destination.droppableId
      )

      if (sourceColumn.id === destinationColumn.id) {
        /**
         * Handle cases for re-ordering tasks within the same list
         */
      } else {
        /**
         * Handle cases for re-ordering tasks within different lists
         */
      }
    }
  }

  render() {
    return (
      <Mutation mutation={UPDATE_TASKS}>
        {(update_tasks, { tasks }) => (
          <Mutation mutation={UPDATE_COLUMNS}>
            {(update_columns, { columns }) => (
              <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={(result, provided) =>
                  this.onDragEnd(result, provided, update_columns, update_tasks)
                }
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
                      columns={this.props.columns}
                    >
                      {this.props.columns.map((column, index) => {
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
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Board

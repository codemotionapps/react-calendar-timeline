import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import GroupRow from './GroupRow'

export default class GroupRows extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowDoubleClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    onRowContextClick: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.groups === this.props.groups
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance,
      groups,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
      droppable
    } = this.props
    let lines = []

    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <GroupRow
          droppable={droppable}
          clickTolerance={clickTolerance}
          onContextMenu={evt => onRowContextClick(evt, i)}
          onClick={evt => onRowClick(evt, i)}
          onDoubleClick={evt => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          group={groups[i]}
          horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
          style={{
            width: `${canvasWidth}px`,
            height: `${groupHeights[i] - 1}px`
          }}
        />
      )
    }

    return <div className="rct-horizontal-lines">
      {lines}

      {droppable && <Droppable droppableId="empty-row">
          {(provided) => (<PreventClickOnDrag clickTolerance={clickTolerance} onClick={evt => onRowClick(evt,'empty-row')}>
            <div style={{width:canvasWidth}} ref={provided.innerRef} className="empty-row grow" />
          </PreventClickOnDrag>)}
        </Droppable>}

    </div>
  }
}

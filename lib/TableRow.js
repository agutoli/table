'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _ExpandIcon = require('./ExpandIcon');

var _ExpandIcon2 = _interopRequireDefault(_ExpandIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TableRow = _react2["default"].createClass({
  displayName: 'TableRow',

  propTypes: {
    onDestroy: _react.PropTypes.func,
    onRowClick: _react.PropTypes.func,
    onRowMouseOver: _react.PropTypes.func,
    onRowMouseOut: _react.PropTypes.func,
    onRowMouseUp: _react.PropTypes.func,
    onRowDoubleClick: _react.PropTypes.func,
    record: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    expandIconColumnIndex: _react.PropTypes.number,
    onHover: _react.PropTypes.func,
    columns: _react.PropTypes.array,
    height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    visible: _react.PropTypes.bool,
    index: _react.PropTypes.number,
    hoverKey: _react.PropTypes.any,
    expanded: _react.PropTypes.bool,
    expandable: _react.PropTypes.any,
    onExpand: _react.PropTypes.func,
    needIndentSpaced: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    indent: _react.PropTypes.number,
    indentSize: _react.PropTypes.number,
    expandIconAsCell: _react.PropTypes.bool,
    expandRowByClick: _react.PropTypes.bool,
    store: _react.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onRowClick: function onRowClick() {},
      onRowMouseOver: function onRowMouseOver() {},
      onRowMouseOut: function onRowMouseOut() {},
      onRowMouseUp: function onRowMouseUp() {},
      onRowDoubleClick: function onRowDoubleClick() {},
      onDestroy: function onDestroy() {},

      expandIconColumnIndex: 0,
      expandRowByClick: false,
      onHover: function onHover() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var _props = this.props,
        store = _props.store,
        hoverKey = _props.hoverKey;

    this.unsubscribe = store.subscribe(function () {
      if (store.getState().currentHoverKey === hoverKey) {
        _this.setState({ hovered: true });
      } else if (_this.state.hovered === true) {
        _this.setState({ hovered: false });
      }
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    var _props2 = this.props,
        record = _props2.record,
        onDestroy = _props2.onDestroy,
        index = _props2.index;

    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  onRowClick: function onRowClick(event) {
    var _props3 = this.props,
        record = _props3.record,
        index = _props3.index,
        onRowClick = _props3.onRowClick,
        expandable = _props3.expandable,
        expandRowByClick = _props3.expandRowByClick,
        expanded = _props3.expanded,
        onExpand = _props3.onExpand;

    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, index);
    }
    onRowClick(record, index, event);
  },
  onRowMouseOver: function onRowMouseOver(event) {
    var _props4 = this.props,
        record = _props4.record,
        index = _props4.index,
        onRowMouseOver = _props4.onRowMouseOver;

    onRowMouseOver(record, index, event);
  },
  onRowMouseOut: function onRowMouseOut(event) {
    var _props5 = this.props,
        record = _props5.record,
        index = _props5.index,
        onRowMouseOut = _props5.onRowMouseOut;

    onRowMouseOut(record, index, event);
  },
  onRowMouseUp: function onRowMouseUp(event) {
    var _props6 = this.props,
        record = _props6.record,
        index = _props6.index,
        onRowMouseUp = _props6.onRowMouseUp;

    onRowMouseUp(record, index, event);
  },
  onRowDoubleClick: function onRowDoubleClick(event) {
    var _props7 = this.props,
        record = _props7.record,
        index = _props7.index,
        onRowDoubleClick = _props7.onRowDoubleClick;

    onRowDoubleClick(record, index, event);
  },
  onMouseEnter: function onMouseEnter() {
    var _props8 = this.props,
        onHover = _props8.onHover,
        hoverKey = _props8.hoverKey;

    onHover(true, hoverKey);
  },
  onMouseLeave: function onMouseLeave() {
    var _props9 = this.props,
        onHover = _props9.onHover,
        hoverKey = _props9.hoverKey;

    onHover(false, hoverKey);
  },
  render: function render() {
    var _props10 = this.props,
        prefixCls = _props10.prefixCls,
        columns = _props10.columns,
        record = _props10.record,
        height = _props10.height,
        visible = _props10.visible,
        index = _props10.index,
        expandIconColumnIndex = _props10.expandIconColumnIndex,
        expandIconAsCell = _props10.expandIconAsCell,
        expanded = _props10.expanded,
        expandRowByClick = _props10.expandRowByClick,
        expandable = _props10.expandable,
        onExpand = _props10.onExpand,
        needIndentSpaced = _props10.needIndentSpaced,
        indent = _props10.indent,
        indentSize = _props10.indentSize;
    var className = this.props.className;


    if (this.state.hovered) {
      className += ' ' + prefixCls + '-hover';
    }

    var cells = [];

    var expandIcon = _react2["default"].createElement(_ExpandIcon2["default"], {
      expandable: expandable,
      prefixCls: prefixCls,
      onExpand: onExpand,
      needIndentSpaced: needIndentSpaced,
      expanded: expanded,
      record: record
    });

    for (var i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0) {
        cells.push(_react2["default"].createElement(
          'td',
          {
            className: prefixCls + '-expand-icon-cell',
            key: 'rc-table-expand-icon-cell'
          },
          expandIcon
        ));
      }
      var isColumnHaveExpandIcon = expandIconAsCell || expandRowByClick ? false : i === expandIconColumnIndex;
      cells.push(_react2["default"].createElement(_TableCell2["default"], {
        prefixCls: prefixCls,
        record: record,
        indentSize: indentSize,
        indent: indent,
        index: index,
        column: columns[i],
        key: columns[i].key,
        expandIcon: isColumnHaveExpandIcon ? expandIcon : null
      }));
    }
    var style = { height: height };
    if (!visible) {
      style.display = 'none';
    }

    return _react2["default"].createElement(
      'tr',
      {
        onClick: this.onRowClick,
        onMouseOver: this.onRowMouseOver,
        onMouseOut: this.onRowMouseOut,
        onMouseUp: this.onRowMouseUp,
        onDoubleClick: this.onRowDoubleClick,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        className: prefixCls + ' ' + className + ' ' + prefixCls + '-level-' + indent,
        style: style
      },
      cells
    );
  }
});

exports["default"] = TableRow;
module.exports = exports['default'];
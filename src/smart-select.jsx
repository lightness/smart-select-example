import React from 'react';
import PropTypes from 'prop-types';

export default class SmartSelect extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ).isRequired,
    invisibleValues: PropTypes.arrayOf(
      PropTypes.string
    ),
    onSelect: PropTypes.func
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const availableItems = nextProps.items.filter(({ value }) => !(nextProps.invisibleValues || []).includes(value));
    const firstAvailableItem = availableItems[0];
    const isValueAvailable = value => availableItems.map(({ value }) => value).includes(value);

    if (!firstAvailableItem) {
      if (prevState.selectedValue) {
        nextProps.onSelect && (nextProps.onSelect(undefined));

        return {
          selectedValue: undefined
        }
      } else {
        return prevState;
      }
    }

    if (prevState.selectedValue && isValueAvailable(prevState.selectedValue)) {
      return prevState;
    }

    nextProps.onSelect && (nextProps.onSelect(firstAvailableItem.value));

    return {
      selectedValue: firstAvailableItem.value
    };
  }

  state = {
    selectedValue: undefined,
  };

  get itemsToRender() {
    return this.props.items
      .filter(({ value }) => !(this.props.invisibleValues || []).includes(value));
  }

  onChange = (event) => {
    this.props.onSelect && (this.props.onSelect(event.target.value));

    this.setState({
      selectedValue: event.target.value
    });
  }

  render() {
    return (
      <select value={this.state.selectedValue} onChange={this.onChange}>
        {
          this.itemsToRender.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))
        }
      </select>
    )
  }
}
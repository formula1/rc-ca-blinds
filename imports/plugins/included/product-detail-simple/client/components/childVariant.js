import React, { Component, PropTypes} from "react";
import classnames from "classnames";
import { Translation } from "/imports/plugins/core/ui/client/components";
import { MediaItem } from "/imports/plugins/core/ui/client/components";
import MenuItem from 'material-ui/MenuItem';

class ChildVariant extends Component {
  handleClick = (event, index) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.variant);
    }
  }

  get hasMedia() {
    return Array.isArray(this.props.media) && this.props.media.length > 0;
  }

  get primaryMediaItem() {
    if (this.hasMedia) {
      return this.props.media[0];
    }

    return null;
  }

  renderDeletionStatus() {
    if (this.props.variant.isDeleted) {
      return (
        <span className="badge badge-danger">
          <Translation defaultValue="Archived" i18nKey="app.archived" />
        </span>
      );
    }

    return null;
  }

  renderMedia() {
    if (this.hasMedia) {
      const media = this.primaryMediaItem;

      return (
        <MediaItem source={media.url()} />
      );
    }

    return null;
  }
  
  // http://stackoverflow.com/questions/26176519/reactjs-call-parent-function
  // http://stackoverflow.com/questions/30580638/pass-parent-prop-to-children-reactjs?rq=1

  render() {
    const variant = this.props.variant;
    const classes = classnames({
      "btn": true,
      "btn-default": true,
      "variant-detail-selected": this.props.isSelected,
      "variant-deleted": this.props.variant.isDeleted
    });
    
    if ( this.props.isHeightWidth ) {
      return (
        <MenuItem onClick={this.handleClick} value={variant.height} primaryText={variant.height + "\""} />
      );  
    }
    
    return (
      <div className="variant-select-option">
        <button
          className={classes}
          onClick={this.handleClick}
          type="button"
        >
          {this.renderMedia()}
          <span className="title">{variant.optionTitle}</span>
        </button>
        <div className="variant-controls">
          {this.renderDeletionStatus()}
          {this.props.visibilityButton}
          {this.props.editButton}
        </div>
      </div>
    );
  }
};

ChildVariant.propTypes = {
  editButton: PropTypes.node,
  isSelected: PropTypes.bool,
  media: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  variant: PropTypes.object,
  visibilityButton: PropTypes.node
};

export default ChildVariant;

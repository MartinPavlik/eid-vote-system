
import * as React from 'react';
import PropTypes from 'prop-types';
import fFind from 'lodash/fp/find';
import fGet from 'lodash/fp/get';
import fFlow from 'lodash/fp/flow';
import fMap from 'lodash/fp/map';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const getItemId = fGet('id');
export const getItemData = fGet('data');
export const getItemLabel = fGet('label');

export const entityToSourceItem = entity =>
  ({
    id: entity._id,
    label: entity.name,
    data: entity,
  });

export const entitiesToSource = fMap(entityToSourceItem);

const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
  },
});


const AutoComplete = ({
  classes, value, source, onChange, inputProps = {}, label,
}) => {

  const onChangeValue = (itemId) => {
    const itemData = fFlow(
      fFind(
        (i) => getItemId(i) === itemId,
      ),
      getItemData,
    )(source);

    console.info('autocomplete: ', itemId, itemData, source);
    onChange(itemId, itemData);
  };

  console.info('source::', source);

  return (
    <FormControl style={{ display: 'flex' }}>
      <InputLabel htmlFor="autocomplete">{label}</InputLabel>
      <Select
        className={classes.root}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        input={<Input name="autocomplete" {...inputProps} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          fMap(
            i => (
              <MenuItem
                value={getItemId(i)}
                key={getItemId(i)}
              >
                {getItemLabel(i)}
              </MenuItem>
            ),
          )(source)
        }
      </Select>
    </FormControl>
  );
};

AutoComplete.propTypes = {
  value: PropTypes.any,
  source: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      id: PropTypes.any.isRequired,
      data: PropTypes.any,
    }).isRequired,
  ),
};

AutoComplete.defaultProps = {
  value: '',
  source: [],
};

export default withStyles(styles)(AutoComplete);

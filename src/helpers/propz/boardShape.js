import PropTypes from 'prop-types';

const boardShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export default { boardShape };

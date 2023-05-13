import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ handleClick }) => {
  return (
    <button className={css.button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;

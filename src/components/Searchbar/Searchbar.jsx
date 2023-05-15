import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const normalizedValue = this.state.value.trim();

    if (normalizedValue === '') {
      toast.info('Please enter keywords to find images.');
      return;
    }

    onSubmit(normalizedValue);
  };

  render() {
    const { value } = this.state;
    const { isLoading } = this.props;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button disabled={isLoading} type="submit" className={css.button}>
            <FiSearch size={24} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;

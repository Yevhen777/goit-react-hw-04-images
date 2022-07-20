import style from './Gallery.module.css';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ handleSubmit }) => {
  return (
    <>
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={handleSubmit}>
          <button className={style.searchFormButton} type="submit">
            <span className={style.buttonLabel}>
              <BiSearch size="20px" />
            </span>
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            placeholder="Search images and photos"
            name="query"
          />
        </form>
      </header>
    </>
  );
};

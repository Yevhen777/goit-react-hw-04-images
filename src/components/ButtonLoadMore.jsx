import style from './Gallery.module.css';

export const ButtonLoadMore = ({ loadMore }) => {
  return (
    <>
      <button className={style.button} onClick={() => loadMore()} type="button">
        Load More
      </button>
    </>
  );
};

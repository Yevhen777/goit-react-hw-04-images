import style from './Gallery.module.css';

export const ImageGalleryItem = ({ img, tags, largeImageURL, setBigImg }) => {
  return (
    <li className={style.galleryItem}>
      <img
        className={style.imageGalleryItemImage}
        src={img}
        alt={tags}
        onClick={() => setBigImg(largeImageURL)}
      />
    </li>
  );
};

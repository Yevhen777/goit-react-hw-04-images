import { ImageGalleryItem } from '../components/ImageGalleryItem';
import style from './Gallery.module.css';

export const ImageGallery = ({ imgCard, setBigImg }) => {
  console.log('object');
  return (
    <ul className={style.imageGallery}>
      {imgCard.map(img => {
        return (
          <ImageGalleryItem
            key={img.id}
            img={img.webformatURL}
            tags={img.tags}
            largeImageURL={img.largeImageURL}
            setBigImg={setBigImg}
          />
        );
      })}
    </ul>
  );
};

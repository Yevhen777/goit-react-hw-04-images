import { ImageGalleryItem } from '../components/ImageGalleryItem';

export const ImageGallery = ({ imgCard }) => {
  return (
    <ul>
      {imgCard.map(img => {
        return (
          <ImageGalleryItem
            key={img.id}
            img={img.webformatURL}
            tags={img.tags}
          />
        );
      })}
    </ul>
  );
};

// {friends.map(friend => {
//     return (
//       <FriendListItem
//         key={friend.id}
//         avatar={friend.avatar}
//         name={friend.name}
//         isOnline={friend.isOnline}

// id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение для модального окна

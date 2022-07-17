export const ImageGalleryItem = ({ img, tags }) => {
  return (
    <li className="gallery-item">
      <img src={img} alt={tags} />
    </li>
  );
};

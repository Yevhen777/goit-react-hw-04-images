export const Searchbar = ({ handleSubmit }) => {
  return (
    <>
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button className="submit" type="submit">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            name="query"
          />
        </form>
      </header>
    </>
  );
};

const Filter = (props) => {
  const { search, searchTerm, handleCharChange } = props;
  return (
    <form onSubmit={search}>
      filter: <input value={searchTerm} onChange={handleCharChange} />
    </form>
  );
};

export default Filter;

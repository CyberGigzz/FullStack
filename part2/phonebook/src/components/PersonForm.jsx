const PersonForm = ({ newPerson, handleInputChange, addName }) => {
  return (
    <>
      <h2>Add a new</h2>

      <form onSubmit={addName}>
        <div>
          name:{' '}
          <input
            type="text"
            name="name"
            value={newPerson.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          number:{' '}
          <input
            type="number"
            name="number"
            value={newPerson.number}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;

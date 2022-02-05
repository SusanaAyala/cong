export const Search = ({ handleSearch }) => {
    const handleChange = (event) => {
        const { value } = event.target;
        handleSearch(value);
    };

    return (
        <div>
            <div>What would you like to search for?</div>
            <input type="text" placeholder="Search..." onChange={handleChange} />
        </div>
    );
};


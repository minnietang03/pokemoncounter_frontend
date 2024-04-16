import React, { useState, useEffect } from 'react';

const YourComponent = () => {
    const [gameData, setGameData] = useState({});
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedGymLeader, setSelectedGymLeader] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [pokemonImage, setPokemonImage] = useState(null); // State to store Pokemon image

    useEffect(() => {
        // Fetch data from the backend serverless API endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('https://dzekcrmoei.execute-api.us-east-1.amazonaws.com/users/pokemoncounters/alldata');
                const data = await response.json();
                // Assuming your API response structure matches the provided dictionary
                setGameData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Event handler for game selection
    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
        setSelectedCity(''); // Reset city when game changes
        setSelectedGymLeader(''); // Reset gym leader when game changes
        setSelectedPokemon(''); // Reset Pokémon when game changes
        setPokemonInfo(null); // Reset Pokémon info when game changes
        setPokemonImage(null); // Reset Pokémon image when game changes
    };

    // Event handler for city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedGymLeader(''); // Reset gym leader when city changes
        setSelectedPokemon(''); // Reset Pokémon when city changes
        setPokemonInfo(null); // Reset Pokémon info when city changes
        setPokemonImage(null); // Reset Pokémon image when city changes
    };

    // Event handler for gym leader selection
    const handleGymLeaderChange = (event) => {
        setSelectedGymLeader(event.target.value);
        setSelectedPokemon(''); // Reset Pokémon when gym leader changes
        setPokemonInfo(null); // Reset Pokémon info when gym leader changes
        setPokemonImage(null); // Reset Pokémon image when gym leader changes
    };

    // Event handler for Pokémon selection
    const handlePokemonChange = (event) => {
        setSelectedPokemon(event.target.value);
        // Set Pokémon info based on the selection
        setPokemonInfo(gameData.Game[selectedGame][selectedCity][selectedGymLeader]['Pokemon Name'][event.target.value]);
        // Set Pokémon image based on the selected Pokemon's name matching with the image name
        setPokemonImage(require(`/users/minnietang/Documents/udacity-git-course/PokemonCounters/pokemon_counters/src/Assets/${event.target.value.toLowerCase()}.png`)); // Adjust the path as per your folder structure
    };

    // Render game options for the first dropdown
    const gameOptions = Object.keys(gameData.Game || {}).map(game => (
        <option key={game} value={game}>{game}</option>
    ));

    // Render city options for the second dropdown based on the selected game
    const cityOptions = selectedGame ? Object.keys(gameData.Game[selectedGame] || {}).map(city => (
        <option key={city} value={city}>{city}</option>
    )) : null;

    // Render gym leader options for the third dropdown based on the selected game
    const gymLeaderOptions = selectedCity ? Object.keys(gameData.Game[selectedGame][selectedCity] || {}).map(gymLeader => (
        <option key={gymLeader} value={gymLeader}>{gymLeader}</option>
    )) : null;

    // Render Pokémon options for the fourth dropdown based on the selected gym leader
    const pokemonOptions = selectedGymLeader ? Object.keys(gameData.Game[selectedGame][selectedCity][selectedGymLeader]['Pokemon Name'] || {}).map(pokemon => (
        <option key={pokemon} value={pokemon}>{pokemon}</option>
    )) : null;

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Select Game:</label>
                    <select value={selectedGame} onChange={handleGameChange}>
                        <option value="">Select a game</option>
                        {gameOptions}
                    </select>
                </div>
                {selectedGame && (
                    <div style={{ marginRight: '20px' }}>
                        <label style={{ marginRight: '10px' }}>Select City:</label>
                        <select value={selectedCity} onChange={handleCityChange}>
                            <option value="">Select a city</option>
                            {cityOptions}
                        </select>
                    </div>
                )}
                {selectedCity && (
                    <div style={{ marginRight: '20px' }}>
                        <label style={{ marginRight: '10px' }}>Select Gym Leader:</label>
                        <select value={selectedGymLeader} onChange={handleGymLeaderChange}>
                            <option value="">Select a gym leader</option>
                            {gymLeaderOptions}
                        </select>
                    </div>
                )}
                {selectedGymLeader && (
                    <div>
                        <label style={{ marginRight: '10px' }}>Select Pokemon:</label>
                        <select value={selectedPokemon} onChange={handlePokemonChange}>
                            <option value="">Select a Pokémon</option>
                            {pokemonOptions}
                        </select>
                    </div>
                )}
            </div>

            {pokemonInfo && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <h3>Selected Pokemon Information</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'inline-block', marginRight: '20px' }}>
                            <img src={pokemonImage} alt="Selected Pokemon" style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px', marginTop: '20px' }} />
                        </div>
                    </div>
                    <table style={{ margin: '0 auto' }}>
                        <tbody>
                        <tr>
                            <td><strong>Selected Pokemon</strong></td>
                            <td><strong>{selectedPokemon}</strong></td>
                        </tr>
                        <tr>
                            <td>Gym Badge</td>
                            <td>{pokemonInfo['Gym Badge']}</td>
                        </tr>
                        <tr>
                            <td>Gym Entry Requirement</td>
                            <td>{pokemonInfo['Gym Entry Requirement']}</td>
                        </tr>
                        <tr>
                            <td>Pokemon Level</td>
                            <td>{pokemonInfo['Pokemon Level']}</td>
                        </tr>

                        <tr>
                            <td>Pokemon Type</td>
                            <td>{pokemonInfo['Pokemon Type']}</td>
                        </tr>

                        <tr>
                            <td>Pokemon Counters</td>
                            <td>{pokemonInfo['Pokemon Counters']}</td>
                        </tr>
                        <tr>
                            <td>Pokemon Countered by</td>
                            <td>{pokemonInfo['Pokemon Countered by']}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default YourComponent;

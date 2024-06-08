import React, { useState, useEffect } from 'react';
import { Container, TextField, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';

function App() {
  // State variables to manage repository data, search input, and search query
  const [repoData, setRepoData] = useState([]); // Holds fetched repository data
  const [search, setSearch] = useState(''); // Holds the current value of the search input
  const [query, setQuery] = useState('react'); // Holds the current search query, default is 'react'

  // useEffect hook to fetch repositories when the query changes
  useEffect(() => {
    // Function to fetch repositories based on the current search query
    const fetchRepos = async () => {
      try {
        console.log(`Fetching repositories for ${query}`);
        // Make a GET request to the GitHub API to search for repositories based on the query
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
        console.log('API Response:', response.data); // Log the API response to the console
        // Update the repoData state with the fetched repository items
        setRepoData(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors that occur during fetching
      }
    };

    fetchRepos(); // Call the fetchRepos function when the query changes
  }, [query]); // useEffect runs whenever the 'query' state changes

  // Event handler to update the 'search' state when the search input changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update the 'search' state with the current input value
  };

  // Event handler to handle form submission when the user searches for repositories
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setQuery(search); // Update the 'query' state with the current search value
  };

  // Render the UI components
  return (
    <div>
      {/* AppBar component to display the application title */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            GitHub Repository Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        {/* Paper component to wrap the search input form */}
        <Paper style={{ padding: '20px' }}>
          {/* Form element for searching repositories */}
          <form onSubmit={handleSearchSubmit}>
            {/* TextField component for entering search queries */}
            <TextField
              label="Search Repositories"
              variant="outlined"
              fullWidth
              margin="normal"
              value={search}
              onChange={handleSearchChange}
            />
          </form>
        </Paper>
        {/* Box component to add spacing between elements */}
        <Box mt={2}>
          {/* List component to display the fetched repositories */}
          <List>
            {/* Mapping through the 'repoData' state to render each repository */}
            {repoData.map((repo, index) => (
              <Paper key={index} style={{ margin: '10px 0', padding: '10px' }}>
                {/* ListItem component to represent each repository */}
                <ListItem>
                  {/* ListItemText component to display repository information */}
                  <ListItemText
                    primary={repo.full_name} // Displaying the full name of the repository
                    secondary={`Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count} | Open Issues: ${repo.open_issues_count}`} // Displaying additional information about the repository
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
}

export default App;

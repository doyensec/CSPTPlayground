import config from './config';

export const client = {
  // Function to get the token
  getToken: () => {
    return localStorage.getItem('token'); // Adjust this as per your token storage method
  },

  // ENFORCE folllow of redirection with fetch
  fetchWithAuth: (url, options = { redirect: "follow" }) => {
    const headers = {
      'x-access-token': `${client.getToken()
        }`,
      ...options.headers,
    }

    return fetch(url, { ...options, headers })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message || 'Something went wrong');
          });
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });
  },

  // Fetch all files
  login: (creds) => {
    return fetch(`${config.apiBaseUrl}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Something went wrong');
        });
      }
      return response.json();
    })
      .catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });
  },

  // Fetch all files
  fetchFiles: () => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files`);
  },

  // Create a new file
  createFile: (newFile) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFile),
    });
  },

  // Get a file by ID
  fetchFileById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files/${id} `);
  },

  // Get a file by ID
  fetchRawFileById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files/${id}/raw`);
  },

  // Update a file by ID
  updateFileById: (id, updatedFile) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFile),
    });
  },

  // Delete a file by ID
  deleteFileById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/gadget/files/${id}`, {
      method: 'DELETE',
    });
  },

  // Fetch all notes
  fetchNotes: () => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes`);
  },

  fetchOneNote: () => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/first_note`);
  },

  // Create a new note
  createNote: (newNote) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });
  },

  // Note was seen
  seenNote: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes/${id}/seen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "seenOn": new Date().toISOString() }),
    });
  },

  // Get a note by ID
  fetchNoteById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes/${id}`);
  },

  // Update a note by ID
  updateNoteById: (id, updatedNote) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    });
  },

  // Delete a note by ID
  deleteNoteById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/notes/${id}`, {
      method: 'DELETE',
    });

  },


  // Fetch all users
  fetchUsers: () => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/users`);
  },

  // Create a new user
  createUser: (newUser) => {
    if (!newUser.role) {
      newUser.role = "member";
    }
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  },

  // Get a user by ID
  fetchUserById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/users/${id}`);
  },

  // Update a user by ID
  updateUserById: (id, updatedUser) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
  },

  // Delete a user by ID
  deleteUserById: (id) => {
    return client.fetchWithAuth(`${config.apiBaseUrl}/api/v1/users/${id}`, {
      method: 'DELETE',
    });
  },
};


import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepos(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: document.getElementById('repoTitle').value,
      owner: 'Guilherme Luvielmo'
    })

    document.getElementById("repoTitle").value = "";

    const repo = res.data

    setRepos([...repos, repo])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${ id }`)

    setRepos(repos.filter(repo => repo.id !== id))
  }

  return (
    <div className="app">
      <div className="content">
        <div className="list">
          <p>Repositórios</p>
          <ul data-testid="repository-list">
            {repos.map(repo =>
              <li className="repo" key={repo.id}>
                {repo.title}
                <button className="btn-del" onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>)}
          </ul>
        </div>

        <div className="addRepo">
          <label htmlFor="repoTitle">Repositoty Title</label>
          <input type="text" id="repoTitle" name="repoTitle"></input>
          <button className="btn-add" onClick={handleAddRepository}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default App;

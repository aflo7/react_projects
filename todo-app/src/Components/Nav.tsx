import React, { useState } from 'react';
import { AiOutlineFolderAdd, AiOutlineFolder } from 'react-icons/ai';
import '../Styles/nav.css';

interface Task {
  content: string;
  id: string;
}

interface Folder {
  name: string;
  tasks: Record<string, Task[]>;
  count: number;
}



function Nav({ store, setSelectedFolder, selectedFolder }) {

  return (
    <nav>
      {store
        ? store.map((folder: Folder, i: number) => {
          return (
            <div
              className="nav-btn"
              key={i}
              style={
                folder.name === selectedFolder
                  ? { backgroundColor: 'var(--orange)' }
                  : {}
              }
              onClick={() => setSelectedFolder(folder.name)}
            >
              <AiOutlineFolder className="nav-icon" />
              <div className="nav-inner-text">{folder.name}</div>
            </div>
          );
        })
        : null}

      <div style={
        selectedFolder === "New Folder"
          ? { backgroundColor: 'var(--orange)' }
          : {}
      } className="nav-btn" onClick={() => setSelectedFolder("New Folder")}>
        <AiOutlineFolderAdd className="nav-icon" />
        <div className="nav-inner-text">New Folder</div>
      </div>





    </nav>
  );
}

export default Nav;

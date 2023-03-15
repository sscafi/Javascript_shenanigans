import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h1>Welcome to My Website</h1>
          <p>This is a sample website created using React.</p>
          <button>Learn More</button>
        </section>
        <section className="features">
          <div className="feature">
            <h2>Feature 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <h2>Feature 2</h2>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="feature">
            <h2>Feature 3</h2>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </section>
        <section className="cta">
          <h2>Ready to get started?</h2>
          <button>Sign Up</button>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 My Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

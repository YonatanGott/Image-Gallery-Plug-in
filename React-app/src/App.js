import './App.css';
import MyGallery from './components/MyGallery';
import feed from './feed.json'


function App() {
  return (
    <div className="App">
      <MyGallery feed={feed} search={true} pagination={true} results={10} sorting={true} interval={4} />
    </div>
  );
}

export default App;

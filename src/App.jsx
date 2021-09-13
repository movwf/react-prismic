import React from "react";

import { getAllDocsByTypePaginated } from './services/prismicUtils'
import "./App.css";

function App() {
  const [doc, setDocData] = React.useState(null);

  React.useEffect(()=>{
    getAllDocsByTypePaginated("test_type", 1, 2).then(response=>{
      console.log(response)
      setDocData(response.results)
    })

  },[])

  return (
    <div className="App">
      {
        doc && doc.map((post,index) => (
          <div key={index} style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <span>{post.data.blog_title[0].text}</span>
            <img src={post.data.think[1].url} alt="Test" style={{height: "250px", width:"250px"}} />
          </div>
        ))
      }
    </div>
  );
}

export default App;

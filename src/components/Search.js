import React from 'react';
import { Card, FormControl, CardContent } from '@mui/material';
import { useState } from 'react';
import { SearchRounded } from '@mui/icons-material';
import Axios from 'axios';
import {Link} from '@mui/material';

const Search = () => {
  const [search, setSearch] = useState('');
  const [blog, setBlog] = useState([]);
  const [filteredBlog, setFilteredBlog] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    Axios.get('http://localhost:5000/api/get/').then((response) => {
      setBlog(response.data);
    });
    setFilteredBlog(
      blog.filter((blog) => {
        return blog.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  return (
    <div>
      <Card style={{ height: '490px', padding: '20px', borderRadius: '15px',marginTop:"30px" }}>
        <h2 className="text-center mb-4">Search</h2>
        <form>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
            <input type="text" style={{width:"90%", height:"40px", borderRadius:"12px"}} placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <SearchRounded onClick={handleSearch} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </div>
        </form>
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredBlog &&
            filteredBlog.map((val) => (
              <Card key={val.id} style={{ marginBottom: '20px', maxWidth: '350px', flex: '1 1 300px' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Link to={`/blog/${val.id}`}>
                  <h3 style={{ color: 'blueviolet',textDecoration:"none", cursor:"pointer" }}>{val.title}</h3>
                </Link>
                  <div dangerouslySetInnerHTML={{ __html: val.body.length > 100 ? `${val.body.substring(0, 100)}....` : val.body }}></div>
                  <p>Likes: {val.like}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Search;

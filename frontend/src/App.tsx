import { useState, useEffect } from 'react'
import './App.css'
import api from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create new post
  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/posts', formData);
      setPosts([...posts, response.data]);
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create post');
    }
  };

  // Update existing post
  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/posts/${editingPost.id}`, formData);
      setPosts(posts.map(post => 
        post.id === editingPost.id ? response.data : post
      ));
      resetForm();
      setEditingPost(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update post');
    }
  };

  // Delete post
  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  // Edit post (populate form)
  const editPost = (post) => {
    setFormData({
      title: post.title,
      content: post.content || '',
      author: post.author || ''
    });
    setEditingPost(post);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: '', content: '', author: '' });
    setEditingPost(null);
    setError(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Posts Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Create, read, update, and delete posts
          </p>
          
          {/* Add New Post Button */}
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Post
          </button>
        </header>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              
              <form onSubmit={editingPost ? updatePost : createPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Enter post content"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter author name"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                      Post #{post.id}
                    </span>
                    <div className="flex gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => editPost(post)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="Edit post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title="Delete post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {post.content && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {post.content}
                    </p>
                  )}
                  
                  {post.author && (
                    <p className="text-xs text-gray-500 mb-3">
                      By {post.author}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-gray-400 text-xs">
                      ID: {post.id}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => editPost(post)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">•</span>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
              <p className="text-gray-600 mb-4">Create your first post to get started!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create First Post
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} total
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
import CreateBlog from './TogglableBlog'
import BlogList from './BlogList'

const Home = () => {
  return (
    <>
      <h1>Blogs</h1>
      <CreateBlog />
      <BlogList />
    </>
  )
}

export default Home
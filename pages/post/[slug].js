import SanityService from "../../services/SanityService";
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import BlogMainPost from '../../components/BlogMainPost'
import Footer from '../../components/Footer'
import BlogPostDetail from '../../components/BlogPostDetail'

export default function PostAll({slug, post}){
  console.log(post)
  return (
    <div className={styles.container}>
    <Header/>
    <BlogMainPost {...post}/>
    <BlogPostDetail blocks={post.content} />
    <Footer />
  </div>
  )
}
export async function getStaticPaths(){
  // paths 만큼의 정적인 페이지를 만들어 준다
  // 주의할 점
  // 다이나믹 라우팅으로 [slug]를 받아오고 있기 때문에 꼭
  // 넘겨주는 데이터인 params에는 slug값만 보내야 함
  const posts = await new SanityService().getPosts();
  const paths = posts.map(post => ({
    params: {
      slug: post.slug
    }
  }))
  return {
    paths,
    fallback: true,
  }
}
export async function getStaticProps({params}){
  // 위에서 만들어진 정적페이지에서 데이터를 받아 컴포넌트에 넣어 준다.
  // getStaticPaths로 페이지가 만들어진 경우 getStaticPorps의 porps로 데이터(위의 params에 해당하는 부분이)가 들어온다.
  const {slug} = params;
  const posts = await new SanityService().getPosts();
  const post = posts.find(p => p,slug === slug);
  return {
    props: {
      slug,
      post
    },
  }
}
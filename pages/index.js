import styles from '../styles/Home.module.css';
import SanityService from '../services/SanityService'
export default function Home({home, posts}) {
  console.log('home', home)
  console.log('posts', posts)
  return (
    <div className={styles.container}>
        <h1>블로그 홈 입니다.</h1>
        <h2>props : </h2>
    </div>
  )
}
export async function getStaticProps(){
  const sanityService = new SanityService();
  const home = await sanityService.getHome();
  const posts = await sanityService.getPosts();
  return{
    props: {
      home,
      posts,
    },
  }
}

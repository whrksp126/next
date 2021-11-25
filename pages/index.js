import styles from '../styles/Home.module.css';
import SanityService from '../services/SanityService'
import Header from '../components/Header';
import BlogHeadline from '../components/BlogHeadline';
import BlogMainPost from '../components/BlogMainPost';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';

export default function Home({home, posts}) {
  const mainPost = posts.find(p => p.slug === home.mainPostUrl);
  const otherPosts = posts.filter(p => p.slug !== home.mainPostUrl);
  console.log('mainPost', mainPost)
  console.log('otherPosts', otherPosts)

  return (
    <div className={styles.container}>
      <Header/>
      <BlogHeadline/>
      <BlogMainPost {...mainPost}/>
      <BlogList posts={otherPosts}/>
      <Footer />
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

// import styles from '../styles/Home.module.css'
// import sanityClient from '@sanity/client';

// export default function Home({home, posts}) {
//   console.log(home)
//   console.log(posts)
//   return (
//     <div className={styles.container}>
//       <h1>Home </h1>
//     </div>
//   )
// }

// export async function getStaticProps(){
//   // sanity 로 부터 데이터를 가져온다.
//   const client = sanityClient({
//     dataset:'production', 
//     projectId: 'oheiyaq3', 
//     useCdn: process.env.NODE_ENV !== 'production',
//   })

//   const home = await client.fetch(`*[_type == 'home'][0]{'mainPostUrl' : mainPost -> slug.current}`)

//   const posts = await client.fetch(`
//     *[_type == 'post']{
//       title,
//       subtitle,
//       createdAt,
//       'content': content[]{
//         ... ,
//         ...select(_type == 'imageGallery' => {'images': images[]{..., 'url': asset -> url}})
//       },
//       'slug': slug.current,
//       'thumbnail': {
//         'alt': thumbnail.alt,
//         'imageUrl': thumbnail.asset -> url 
//       },
//       'author': author -> {
//         name,
//         role,
//         'image': image.asset -> url
//       },
//       'tag': tag -> {
//         title,
//         'slug': slug.current
//       }
//     }
//   `);

// return {
//     props: {
//       home,
//       posts,
//     }
//   }
// }
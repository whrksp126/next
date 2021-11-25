// import sanityClient from '@sanity/client';

// export default function PostAll({slug}){
//   return (
//     <div>
//       <h1>Post : {slug}</h1>
//     </div>
//   )
// }

// export async function getStaticPaths(){
//    // sanity 로 부터 데이터를 가져온다.
//    const client = sanityClient({
//     dataset:'production', 
//     projectId: 'oheiyaq3', 
//     useCdn: process.env.NODE_ENV !== 'production',
//   })

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

//   const paths = posts.map((post) => ({
//     params: {
//       slug: post.slug,
//     },
//   }))

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export function getStaticProps({params}){
//   const {slug} = params;
//   return {
//     props: {
//       slug,
//       post,
//     },
//   };
// }

import SanityService from "../../services/SanityService";
export default function PostAll({slug, post}){
  console.log(post)
  return (
    <div><h1>Post : {slug}</h1></div>
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
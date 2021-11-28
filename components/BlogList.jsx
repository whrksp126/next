import { Card, Col, Row } from "antd"
import Link from 'next/link';
import dayjs from 'dayjs';

export default function BlogList({posts}){
  return (
  <>
    <Row align="middle" style={{height: 100}}>
      <Col span={24}>
        <h1 style={{
          fontSize:30, 
          fontWeight:'bold'
        }}>Latest Posts
        </h1>
      </Col>
    </Row>
    <Row gutter={16} align="top" style={{height: 'auto'}}>
      {posts.map((post) => {
        return (
          <Col span={6} key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <a>
                <Card 
                  style={{
                    widht:'100%', 
                    border: 'none', 
                    marginBottom: '30'
                  }} 
                  cover={
                    <img 
                      alt={post.thumbnail.alt} 
                      src={post.thumbnail.imageUrl}
                    />
                    //Img 메소드를 사용해야함
                  }
                >
                  <h3>{post.title}</h3>
                  <h4>{post.author.name} ο {dayjs(post.createdAt).format('MMMM D')}</h4>
                </Card>
              </a>
            </Link>
          </Col>
        )
      })}
    </Row>
  </>
  )
}
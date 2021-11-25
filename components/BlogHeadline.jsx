import { Col, Row } from "antd";

export default function BlogHeadline(){
  return (
    <Row 
      align="middle"
      style={{
        height: 400,
        textAlign: 'center',
      }}
    >
      <Col span={24}>
        <h1 style={{
          fontSize: 70,
          fontWeight: 'bold',
        }}
        >GH Bolg
        </h1>
        <p style={{
          fontSize:24
        }}>
          Next.js 공부용으로 만든 블로그 입니다.
          해당 내용은 FastCampus 강의를 바탕으로 만들었습니다.
        </p>
      </Col>

    </Row>
  );
}
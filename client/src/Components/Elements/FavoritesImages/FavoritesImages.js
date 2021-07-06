import { Row, Col } from "react-bootstrap";
import FavoriteImage from "./FavoriteImage";
import { Link } from "react-router-dom";
const count = Array(50).fill(50);

export default function FavoritesImages() {
  return (
    <div className="trending mt-3">
      <Row className="w-100 mx-0">
        {count.map((imgFavorite, index) => {
          return (
            <Col sm={4} md={4} lg={3} className="px-1 mb-1" key={index}>
              <Link to="/post/id?=">
                <FavoriteImage
                  url_image="https://picsum.photos/300"
                  title="Testing title"
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

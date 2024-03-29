import { Button, Card, Col, Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="mx-auto">
      <Card.Img
        className="mx-auto"
        variant="top"
        src={movie.ImagePath}
        style={{ width: "40%" }}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          <h2>{movie.Title}</h2>
        </Card.Title>

        <Row>
          <Col md={3}>
            <h5>Description: </h5>
          </Col>
          <Col md={8}>
            <p>{movie.Description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <h5>Director:</h5>
          </Col>
          <Col md={8}>
            <p>{movie.Director.Name}</p>
          </Col>
        </Row>

        <Button
          onClick={onBackClick}
          variant="primary"
          size="lg"
          style={{ width: "100%" }}
        >
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};

//     <div>
//       <div>
//         <img
//           src={movie.ImagePath}
//           className="w-10"
//           // style={{ width: "100%" }}
//         />
//       </div>
//       <div>
//         <span>Title: </span>
//         <span>{movie.Title}</span>
//       </div>
//       <div>
//         <span>Director: </span>
//         <span>{movie.Director.Name}</span>
//       </div>
//       <button
//         onClick={onBackClick}
//         className="back-button"
//         style={{ cursor: "pointer" }}
//       >
//         Back
//       </button>
//     </div>
//   );
// };

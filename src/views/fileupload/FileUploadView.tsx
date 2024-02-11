import { styled } from "styled-components";

import FileUpload from "./FileUpload";
import breakpoints from "../../components/styles/breakpoints";

const Container = styled.div`
  grid-column: auto;

  @media (min-width: ${breakpoints.mobile.px}) {
    grid-column: auto;
  }

  @media (min-width: ${breakpoints.tablet.px}) {
    grid-column: 1 / span 12;
  }
`;

export default function FileUploadView() {
  return (
    <Container>
      <FileUpload />
    </Container>
  );
}

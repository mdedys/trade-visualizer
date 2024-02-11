import { styled } from "styled-components";

import Button from "../../components/button/Button";
import Icons from "../../components/icons/Icons";
import border from "../../components/styles/border";
import shadows from "../../components/styles/shadows";
import { cssvar, vars } from "../../components/theme/vars";
import Typography from "../../components/typography/Typography";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.625rem;

  border-radius: ${border.xl};
  border: 1px solid ${cssvar(vars.colors.border.secondary)};

  padding: 1rem 24px;
`;

const TextGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;

  color: ${cssvar(vars.colors.text.tertiary.main)};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const UploadButton = styled(Button)`
  box-shadow: ${shadows.xs};
  pointer-events: none;
`;

export default function FileUpload() {
  return (
    <Container>
      <UploadButton variant="secondary">
        <Icons.UploadCloud />
      </UploadButton>
      <TextGroup>
        <Row>
          <Button variant="link" size="md">
            Click to upload
          </Button>
          <Typography variant="text" size="sm">
            or drag and drop
          </Typography>
        </Row>
        <Typography variant="text" size="xs">
          Only CSV is currently supported
        </Typography>
      </TextGroup>
    </Container>
  );
}

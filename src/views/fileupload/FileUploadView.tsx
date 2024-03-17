import { styled } from "styled-components";

import FileUpload from "./FileUpload";
import Grid from "../../components/layout/Grid";
import widths from "../../components/styles/widths";
import Typography from "../../components/typography/Typography";

const View = styled(Grid)`
  place-content: center;

  margin: 0 auto;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  flex-direction: column;

  grid-column: 1 / -1;
`;

interface FileUploadViewProps {
  onFileUploaded(file: File): void;
}

export default function FileUploadView(props: FileUploadViewProps) {
  return (
    <View>
      <Container>
        <Typography
          variant="text"
          size="lg"
          style={{ maxWidth: widths.md.px, textAlign: "center" }}
        >
          Upload your Trade history. Non of the data is stored anywhere and is
          computed on the the fly from the uploaded document.
        </Typography>
        <FileUpload
          accept=".csv"
          info="Only CSV is currently supported"
          multiple={false}
          onFileUploaded={props.onFileUploaded}
        />
      </Container>
    </View>
  );
}

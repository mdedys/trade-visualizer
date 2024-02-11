import { DragEvent, useRef, useState } from "react";
import { styled } from "styled-components";

import Button from "../../components/button/Button";
import IconButton from "../../components/button/IconButton";
import border from "../../components/styles/border";
import shadows from "../../components/styles/shadows";
import widths from "../../components/styles/widths";
import { cssvar, vars } from "../../components/theme/vars";
import Typography from "../../components/typography/Typography";

const Container = styled.div<StyledProps<{ dragging: boolean }>>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.625rem;

  background-color: ${props =>
    props.$dragging ? cssvar(vars.colors.background.secondary.hover) : "none"};
  border-radius: ${border.xl};
  border: 1px solid ${cssvar(vars.colors.border.secondary)};
  cursor: pointer;

  position: relative;
  width: 100%;
  max-width: ${widths.md.px};
  padding: 1rem 24px;
`;

const DragOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const HiddenFileInput = styled.input.attrs({ type: "file" })`
  display: none;
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

const UploadButton = styled(IconButton)`
  background-color: transparent;
  box-shadow: ${shadows.xs};
  pointer-events: none;
`;

const ErrTooManyFiles = "Please upload only one file";
const ErrSomethingWentWrong = "Something went wrong retrieving the file.";
const ErrFileTypeNotSupported = "File type is not supported";

interface FileUploadProps {
  accept: string;
  info: string;
  multiple?: boolean;
  onFileUploaded(file: File): void;
}

export default function FileUpload(props: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onFileUploaded(files: FileList) {
    if (files.length > 1) {
      setError(ErrTooManyFiles);
      return;
    }

    const file = files.item(0);
    if (!file) {
      setError(ErrSomethingWentWrong);
      return;
    }

    if (file.type.toLowerCase() !== "text/csv") {
      setError(ErrFileTypeNotSupported);
      return;
    }

    props.onFileUploaded(file);
  }

  function onDragEnter(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setDragging(true);
  }

  function onDrop(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    onFileUploaded(evt.dataTransfer.files);
  }

  function onDragLeave(evt: DragEvent<HTMLDivElement>) {
    setDragging(false);
    evt.preventDefault();
  }

  function onDragOver(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault();
  }

  function onClickUpload() {
    inputRef.current?.click();
  }

  return (
    <Container $dragging={dragging} onClick={onClickUpload}>
      <DragOverlay
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
      />
      <HiddenFileInput
        ref={inputRef}
        multiple={props.multiple}
        onChange={() => {
          if (inputRef.current?.files) {
            onFileUploaded(inputRef.current.files);
          }
        }}
      />
      <UploadButton variant="secondary" size="md" icon="UploadCloud" />
      <TextGroup>
        <Row>
          <Button variant="link" size="md" style={{ pointerEvents: "none" }}>
            Click to upload
          </Button>
          <Typography variant="text" size="sm">
            or drag and drop
          </Typography>
        </Row>
        <Typography variant="text" size="xs">
          {props.info}
        </Typography>
      </TextGroup>
    </Container>
  );
}

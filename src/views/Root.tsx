import Dashboard from "./dashboard/Dashboard";
import FileUpload from "./fileupload/FileUploadView";
import { read } from "../data/parser";
import Source from "../data/source";
import useTradeState from "../state/useTradeState";

export default function Root() {
  const [trades, setTrades] = useTradeState();

  if (trades) return <Dashboard />;

  return (
    <FileUpload
      onFileUploaded={file => {
        read(file, Source.Questrade).then(data => {
          setTrades(data);
        });
      }}
    />
  );
}

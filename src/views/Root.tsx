import { useState } from "react";

import Dashboard from "./dashboard/Dashboard";
import FileUpload from "./fileupload/FileUploadView";

export default function Root() {
  // @ts-ignore
  const [data, setData] = useState(null);
  if (data) return <Dashboard />;
  return <FileUpload />;
}

import { FiDownload, FiEye } from "react-icons/fi";
import { Modal } from "antd";
import { useState } from "react";
import moment from "moment";
import { formatBytes, splitNameWithLastDot } from "@/helpers/utils";
import { Document, pdfjs, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface propTypes {
  data?: any;
}

const MediaActionView = ({ data }: propTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal} type="button">
        <FiEye />
      </button>

      <Modal
        centered
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"70%"}
        style={{ maxWidth: "unset" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-center">
            {data.type === "image" && (
              <img
                crossOrigin="anonymous"
                src={data.path}
                alt={data.title}
                className="max-h-[90vh]"
              />
            )}
            {data.type === "application" && (
              <Document file={data.path} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            )}
          </div>
          <div className="mt-3 flex justify-center items-center text-xs">
            <ul className="flex items-center gap-[50px]">
              <li>
                <div className="text-[#767676]">Name</div>
                <div>{data.title}</div>
              </li>
              <li>
                <div className="text-[#767676]">Alt</div>
                <div>{data.alt}</div>
              </li>
              <li>
                <div className="text-[#767676]">Size</div>
                <div>{formatBytes(data?.fileSize)}</div>
              </li>
              <li>
                <div className="text-[#767676]">Type</div>
                <div>{data?.type}</div>
              </li>
              <li>
                <div className="text-[#767676]">Last Updated</div>
                <div>{moment(data?.updatedAt).format("LL")}</div>
              </li>
              <li>
                <a
                  href={data.path}
                  download
                  className="flex items-center gap-2 p-1"
                >
                  <FiDownload />
                  <span>Download</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MediaActionView;

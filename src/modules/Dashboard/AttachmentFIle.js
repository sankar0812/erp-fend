import React, { useEffect, useState } from "react";
import { base } from "../../utils/request";
import styled from "styled-components";
import { Spin } from "antd";
import { GrAttachment } from "react-icons/gr";

const StyledPdf = styled.div`
  img {
    width: 100%;
  }
`;

const AttachmentFile = ({ fileAttachment }) => {
  
  const [pdf, setpdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfurl, setpdfUrl] = useState("");

  const pdfUrl = `${base}${fileAttachment}`;
  useEffect(() => {
    // Fetch the PDF file with the appropriate headers
    setLoading(true);
    fetch(pdfUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob
        // Extract the file extension
        const urlParts = blob?.type.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const extension = fileName.split(".").pop().toLowerCase();

        const blobUrl = URL.createObjectURL(blob);

        // Set the blob URL as the source for the iframe
        // const pdfIframe = document.getElementById("pdfIframe");
        if (extension == "pdf") {
          setpdf(true);
          setpdfUrl(blobUrl);
          // if (pdfIframe) {
          //   // pdfIframe.src = blobUrl;
          // } else {
          //   console.error("Element with id 'pdfIframe' not found.");
          // }
        } else {
          setpdf(false);
          setpdfUrl(blobUrl);

          // if (pdfIframe) {
          //   pdfIframe.src = '';
          // } else {
          //   console.error("Element with id 'pdfIframe' not found.");
          // }
        }
        setLoading(false);
      });
  }, [fileAttachment]);

  return (
    <div>
      {/* <img style={{width:"100%"}} src={`${base}${fileAttachment?.attachment}`}/> */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin />
        </div>
      ) : pdf ? (
        <StyledPdf>
          <iframe
            id="pdfIframe"
            width="100%"
            height="500"
            src={pdfUrl}
          ></iframe>
        </StyledPdf>
      ) : (
        <>
          {/* <video controls width="500">
            <source src={pdfUrl} type="video/mp4" />
          </video> */}
          <img
            src={pdfUrl}
            alt="fff"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </>
      )}
    </div>
  );
};

export default AttachmentFile;

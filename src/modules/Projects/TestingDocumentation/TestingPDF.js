import React, { useEffect, useState } from 'react'
import { base } from '../../../utils/request';



const TestingPDF = ({ testrec, trigger }) => {

    // const [pdfUrl, setPdfUrl] = useState([])

    const pdfUrl = `${base}${testrec?.url}`

    useEffect(() => {
        // Fetch the PDF file with the appropriate headers
        fetch(pdfUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create a URL for the blob
                const blobUrl = URL.createObjectURL(blob);

                // Set the blob URL as the source for the iframe
                document.getElementById('pdfIframe').src = blobUrl;
            });
            
    }, [testrec, trigger]);

    return (
        <div>
            <iframe id="pdfIframe" width="100%" height="500"></iframe>
        </div>
    )
}

export default TestingPDF
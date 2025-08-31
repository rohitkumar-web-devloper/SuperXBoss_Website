"use client";

import { useNoAuthDocumentsQuery } from "@/services/apis/publicApis/hooks";

const PrivacyPolicy = () => {
    const { data, isLoading, isError } = useNoAuthDocumentsQuery();

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Loading...
            </div>
        );
    if (isError || !data?._payload?.privacyPolicy?.url)
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Failed to load document.
            </div>
        );

    const doc = data._payload.privacyPolicy;

    return (
        <div className="px-4 sm:px-6 md:px-16 py-6 bg-white min-h-screen">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 bg-white rounded-lg shadow py-4">
                Privacy Policy
            </h1>
            <div className="w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/9] border rounded-lg overflow-hidden shadow">
                <iframe
                    src={`${doc.url}#toolbar=0`}
                    title={doc.fileName}
                    className="w-full h-full"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;

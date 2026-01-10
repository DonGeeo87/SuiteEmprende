import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, url, image }) => {
    const siteTitle = 'SuiteEmprende';
    const fullTitle = `${title} | ${siteTitle}`;
    const siteUrl = 'https://dongeeo87.github.io/SuiteEmprende';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.png?v=1`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
};

export default SEO;

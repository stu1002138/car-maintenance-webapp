import { Helmet } from 'react-helmet';
import { FC } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: FC<SEOProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || 'Default Title'}</title>
      <meta name="description" content={description || 'Default Description'} />
    </Helmet>
  );
};

export default SEO;
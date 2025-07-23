import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function SEO({ title, description }) {
    const formattedTitle = title ? `${title} - Tienda Red` : 'Tienda Red';
    const formattedDescription = description || 'Tienda de productos variados';

    return (
        <Helmet>
            <title>{formattedTitle}</title>
            <meta name="description" content={formattedDescription} />
        </Helmet>
    );
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

export default SEO;
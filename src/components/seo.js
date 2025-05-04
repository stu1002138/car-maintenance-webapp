import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet';
const SEO = ({ title, description }) => {
    return (_jsxs(Helmet, { children: [_jsx("title", { children: title || 'Default Title' }), _jsx("meta", { name: "description", content: description || 'Default Description' })] }));
};
export default SEO;

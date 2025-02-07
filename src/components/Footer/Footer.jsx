import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-300 text-center py-6">
                <div className="container mx-auto text-sm text-gray-700">
                    <p>&copy; 2025 Your E-Commerce Name. All rights reserved.</p>
                    <div className="mt-3">
                        <a href="/privacy-policy" className="hover:text-gray-500">Privacy Policy</a>
                        <span className="mx-2">|</span>
                        <a href="/terms-of-service" className="hover:text-gray-500">Terms of Service</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;
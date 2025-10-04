
import React, { useState } from 'react';

export const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log(`Newsletter signup for: ${email}`);
            setSubmitted(true);
        }
    };

    return (
        <div className="bg-transparent border border-brand-border p-8 text-center">
            {submitted ? (
                <div>
                    <h3 className="font-serif text-2xl font-medium mb-2">Thank You</h3>
                    <p className="text-brand-gray">You're on the list. Expect fashion insights in your inbox.</p>
                </div>
            ) : (
                <>
                    <h3 className="font-serif text-2xl font-medium mb-2">Join the Inner Circle</h3>
                    <p className="text-brand-gray mb-6 max-w-md mx-auto">Get the latest from ENNUI, from trend reports to industry analysis, delivered straight to your inbox.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center max-w-sm mx-auto">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-brand-border bg-transparent focus:outline-none focus:ring-1 focus:ring-brand-dark transition mb-2 sm:mb-0 sm:mr-2"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-medium bg-transparent border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-colors duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};
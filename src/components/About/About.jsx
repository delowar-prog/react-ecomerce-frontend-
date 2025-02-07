import React from 'react';

const About = () => {
    return (
        <div className='px-4 container mx-auto'>
            <div className='my-5'>
                <h1 className='text-3xl text-center '><span className='text-gray-400'>About </span>Us</h1>
            </div>
            <div className='flex gap-10 px-6'>
                <div className='my-10'>
                    <img src='/public/paralax.jpg' alt=''/>
                </div>
                <div>
                  <div className='flex flex-col gap-5 my-10 text-lg text-[#4B5563]'>
                  <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                  <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                  </div>
                    <div className='flex flex-col gap-5 text-lg text-[#4B5563]'>
                        <h3 className='text-xl'><strong>Our Mission</strong></h3>
                        <div>
                            <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
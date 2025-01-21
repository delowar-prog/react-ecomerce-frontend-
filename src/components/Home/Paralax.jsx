import React from 'react';

const Paralax = () => {
    return (
        <div>
        <div className="mx-auto text-white bg-fixed  bg-[url('/public/paralax.jpg')] ">
           <div className="parallax mx-auto bg-purple-800/30 w-full py-10">
        <h2 className=" text-center mb-2 font-bold text-3xl">Why Choose Us</h2> <br />
        <p className="block-parallax__item-details text-sm  font-semibold text-center mx-2 mx-md-0">
            We have been distributing an outstanding QUALITY of products in the outomotive market - specializing in the
            remanufacture, supply and <br className="d-none d-md-block"/> servicing of diesel fuel injections and automotive
            vehicle parts and
            accessories.
        </p>
        <div className="flex justify-center mt-5 m-5 flex-wrap py-5">
            <div className="block-parallax-card py-3 px-2 px-md-5 border-white border-2 rounded-md flex justify-around items-center mx-4 mb-3 w-96 lg:mb-0">
                <div>
                </div>
                <div className="  p-2 mx-3">
                    <p className="text-base text-purple-50 font-bold">
                        Guarantee Service
                    </p>
                    <p className="">
                        We assure best quality customer <br/> services after sales.
                    </p>
                </div>
                <div>

                </div>
            </div>
            <div className="block-parallax-card py-3 px-2 px-md-5  mx-4">
                <div>

                </div>
                <div className="block-parallax-card-text mx-3 text-center py-3 px-2 w-96 border-2 rounded-md">
                    <p className="text-base font-sans font-bold py-1">
                        Request Call Back
                    </p>
                    <input className="email-in w-100 rounded-sm p-1" placeholder="message us" type="text"/> <br />
                    <button type="submit" className="btn btn-secondary w-3/4 bg-[#b437ea] mt-2 p-3 rounded-md ">send</button>
                </div>
                <div>

                </div>
            </div>


        </div>
    </div> 
   
        </div>
        <div style={{height:'52px'}}></div>
        </div>
    );
};

export default Paralax;
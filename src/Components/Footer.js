import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container foter">
                    <div className="row">
                        <div className="col-md">
                            <h4>Developers</h4>
                            <ul>
                                <li>Kshitij Sonawane</li>
                                <li>Shubham More</li>
                                <li>Milind Sunkari</li>
                                <li>Sanket Singh</li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <h4>Socials</h4>
                            <ul>
                                <li>
                                    <Link to="https://www.linkedin.com/in/kshitij-sonawane?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9uWKziceRb%2BV1SZ5rnKj5Q%3D%3D" target="_blank" className="ico"><i className='fab fa-linkedin-in'></i></Link>
                                    <Link to="/" className="ico"><i className="fab fa-instagram"></i></Link>
                                </li>
                                <li>
                                    <Link to="https://www.linkedin.com/in/shubham-more-b49a43215?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHPCrrmTyScOLfiljFsPjnw%3D%3D" target="_blank" className="ico"><i className='fab fa-linkedin-in'></i></Link>
                                    <Link to="/" className="ico"><i className="fab fa-instagram"></i></Link>
                                </li>
                                <li>
                                    <Link to="https://www.linkedin.com/in/milind-narsingrao-sunkari-3b7b0521b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BWnKYAEP5SOuKvARZrf1ogg%3D%3D" target="_blank" className="ico"><i className='fab fa-linkedin-in'></i></Link>
                                    <Link to="/" className="ico"><i className="fab fa-instagram"></i></Link>
                                </li>
                                <li>
                                    <Link to="https://www.linkedin.com/in/sanket-singh-4a545221b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BNthLUtIKQd%2BBAl%2Bnjhjx9Q%3D%3D" target="_blank" className="ico"><i className='fab fa-linkedin-in'></i></Link>
                                    <Link to="/" className="ico"><i className="fab fa-instagram"></i></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <h4>Links & Credits</h4>
                            <ul>
                                <li><Link to="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</Link></li>
                                <li><Link to='https://www.pngwing.com/en/free-png-nbyly' target="_blank">PNGWING</Link></li>
                                <li><Link to='https://www.freepik.com/free-psd/3d-nft-icon-chain_25469859.htm#query=blockchain&position=0&from_view=keyword&track=sph' target="_blank">Image by Graphue on Freepik</Link></li>
                                <li><Link to='https://pngtree.com/' target="_blank">PngTree</Link></li>
                                <li style={{ display: "inline" }}><Link to="https://iconscout.com/icons/box" target="_blank">Cube Icon -</Link><Link to="https://iconscout.com/contributors/unicons" target="_blank">by Unicons Font</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

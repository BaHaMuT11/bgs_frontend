import React from 'react'
import FooterLogo from "../../assets/img/footer_logo.png"
import "./footer.scss"

const Footer = () => {
    return (
        <div className="footer-wrapper pt-3">
            <div className="footer-logo">
                <img src={FooterLogo} alt="Baha Games ORG"/>
            </div>
            <div className="social-bar">
                <a  href="https://www.facebook.com/DesafioLatam/"
                    className="social-bar-fb fa-2x"
                    rel="noreferrer"
                    target="_blank">
                    <i className="fa-brands fa-facebook-f"></i>
                </a> &nbsp; &nbsp;
                <a  href="https://www.instagram.com/desafiolatam/"
                    className="social-bar-ig fa-2x"
                    rel="noreferrer"
                    target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                </a> &nbsp; &nbsp;
                <a href="https://twitter.com/desafiolatam"
                   className="social-bar-tt fa-2x"
                   rel="noreferrer"
                   target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                </a> &nbsp; &nbsp;
                <a href="https://www.youtube.com/channel/UCz0ekVt3TQ65voddo9xVOQw"
                   rel="noreferrer"
                   className="social-bar-yt fa-2x"
                   target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                </a>
            </div>
            <div className="copyright text-white">
                <h4>&#169; Todos los derechos reservados</h4>
            </div>
        </div>
    )
}

export default Footer
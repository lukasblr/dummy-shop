import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './modals/ContactModal';
import InfoModal from './modals/InfoModal';
import RessourcenModal from './modals/RessourcenModal'

class Footer extends Component {
  state = {
    infoModalOpen: false,
    ressourcenModalOpen: false,
    contactModalOpen: false,
  };

  openInfoModal = () => {
    this.setState({ infoModalOpen: true });
  };

  closeInfoModal = () => {
    this.setState({ infoModalOpen: false });
  };

  openContactModal = () => {
    this.setState({ contactModalOpen: true });
  };

  closeContactModal = () => {
    this.setState({ contactModalOpen: false });
  };

  openRessourcenModal = () => {
    this.setState({ ressourcenModalOpen: true });
  };

  closeRessourcenModal = () => {
    this.setState({ ressourcenModalOpen: false });
  };

  render() {
    return (
      <footer className="bg-base-100 shadow dark:bg-gray-900 m-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
              <img src="/assets/logo.svg" alt="ProTec Icon" width="42" height="38" className="mr-4" />
              <span className="self-center text-3xl font-semibold whitespace-nowrap text-white dark:text-white">ProTec</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 text-white hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openInfoModal(); }}>Info</a>
              </li>
              <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 text-white hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openRessourcenModal(); }}>Ressources</a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 text-white hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openContactModal(); }}>Contact</a>
              </li>
            </ul>
          </div>
          <hr className="my-0 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center dark:text-white">© 2023 ProTec. All Rights Reserved.</span>
        </div>

        <InfoModal isOpen={this.state.infoModalOpen} closeModal={this.closeInfoModal} />
        <RessourcenModal isOpen={this.state.ressourcenModalOpen} closeModal={this.closeRessourcenModal} />
        <ContactModal isOpen={this.state.contactModalOpen} closeModal={this.closeContactModal} />
      </footer>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './modals/ContactModal';
import InfoModal from './modals/InfoModal';
import RessourcenModal from './modals/RessourcenModal';
import FaqModal from './modals/FaqModal';

class Footer extends Component {
  state = {
    infoModalOpen: false,
    ressourcenModalOpen: false,
    contactModalOpen: false,
    faqModalOpen: false,
  };

  openModal = (modalName) => {
    this.setState({ [modalName]: true });
  };

  closeModal = (modalName) => {
    this.setState({ [modalName]: false });
  };

  render() {
    return (
      <div className="footer-container">
        <footer className="bg-base-100 shadow dark:bg-gray-900 m-0">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
                <img src="/assets/final_logo.svg" id="footer_logo" alt="Nexus Icon" />
              </Link>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-white">
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 text-black hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openModal('infoModalOpen'); }}>Info</a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 text-black hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openModal('ressourcenModalOpen'); }}>Ressources</a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 text-black hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openModal('contactModalOpen'); }}>Contact</a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 text-black hover:text-blue-700" onClick={(e) => { e.preventDefault(); this.openModal('faqModalOpen'); }}>FAQ</a>
                </li>
              </ul>
            </div>
            <hr className="my-0 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-grey sm:text-center dark:text-grey">© 2023 NexusTech Solutions. All Rights Reserved.</span>
          </div>
          <InfoModal isOpen={this.state.infoModalOpen} closeModal={() => this.closeModal('infoModalOpen')} />
          <RessourcenModal isOpen={this.state.ressourcenModalOpen} closeModal={() => this.closeModal('ressourcenModalOpen')} />
          <ContactModal isOpen={this.state.contactModalOpen} closeModal={() => this.closeModal('contactModalOpen')} />
          <FaqModal isOpen={this.state.faqModalOpen} closeModal={() => this.closeModal('faqModalOpen')} />
        </footer>
      </div>
    );
  }
}

export default Footer;

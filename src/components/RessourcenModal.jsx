import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RessourcenModal extends Component {
  render() {
    const { isOpen, closeModal } = this.props;

    return (
      <div>
        {isOpen && (
          <div id="contact-modal" className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex flex-col p-5 dark:border-gray-600">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white" style={{ fontWeight: 'bold' }}>
                    Frameworks
                  </h2>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className='din-pro'>
                    <ul>React (JavaScript)</ul>
                    <ul>Bootstrap</ul>
                    <ul>Tailwind CSS
                        <ul>Daisy UI</ul>
                        <ul>Flowbite</ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RessourcenModal;

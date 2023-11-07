import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ContactModal({ isOpen, closeModal }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex flex-col p-5 dark:border-gray-600">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white" id="modal_title">
                  Contact
                </h2>
                {/* Kontaktinformationen */}
                <div className="modal_text">
                  Lukas Blarr<br />
                  Dual Student Business Informatics <br />
                  DHBW Karlsruhe<br />
                  <a href="mailto:blarr.lukas.a22@student.dhbw-karlsruhe.de">blarr.lukas.a22@student.dhbw-karlsruhe.de</a>
                </div>
                {/* Schließen-Button */}
                <button type="button" className="mt-4 inline-flex justify-center 
                  rounded-md border border-transparent bg-black text-white px-1 py-1 text-sm 
                  font-medium hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-black-500 focus-visible:ring-offset-2" id="modal_button" 
                  onClick={closeModal}>Okay
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

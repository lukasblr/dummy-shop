import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function FaqModal({ isOpen, closeModal }) {
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
                  FAQ
                </h2>
                {/* FAQ-Inhalte */}
                <div className="modal_text" id="modal_text">
                  <h3>Payment methods</h3>
                  <p>We accept common payment methods such as credit cards (Visa, MasterCard, American Express), 
                  debit cards and PayPal to make your purchase as convenient as possible. </p>
                  
                  <h3>Customer support</h3>
                  <p>Our dedicated customer service team is always ready to answer your questions and concerns. 
                  You can email us at <b>support@protec.com</b> We are available Monday to Friday from 9am to 5pm. </p>

                  <h3>Shipping information</h3>
                  <p>The shipping information for our products can be found in the shopping cart during the ordering process. 
                  Delivery time varies by destination. </p>
                </div>
                {/* Schließen-Button */}
                <button type="button" className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-black 
      text-white px-1 py-1 text-sm font-medium hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 
      focus-visible:ring-black-500 focus-visible:ring-offset-2" id="modal_button" onClick={closeModal}>Okay</button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

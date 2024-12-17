import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200">
      <button
        className="w-full text-left py-4 px-6 bg-white flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span>{isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}</span>
      </button>
      {isOpen && <div className="px-6 py-4">{content}</div>}
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg text-sm text-gray-500">
      <AccordionItem
        title="Cara Pembayaran via ATM"
        content={
          <ul className="list-disc pl-5 text-start">
            <li>Masukkan kartu ATM dan PIN Anda.</li>
            <li>Pilih menu "Transaksi Lainnya" atau "Transfer".</li>
            <li>Masukkan nomor Virtual Account dan jumlah pembayaran.</li>
            <li>Konfirmasi pembayaran dan simpan bukti transaksi.</li>
          </ul>
        }
      />
      <AccordionItem
        title="Cara Pembayaran via Mobile Banking"
        content={
          <ul className="list-disc pl-5 text-start">
            <li>Masuk ke aplikasi mobile banking Anda.</li>
            <li>Pilih menu "Pembayaran" atau "Transfer".</li>
            <li>Masukkan nomor Virtual Account dan jumlah pembayaran.</li>
            <li>Konfirmasi pembayaran dan simpan bukti transaksi.</li>
          </ul>
        }
      />
      <AccordionItem
        title="Cara Pembayaran via Internet Banking"
        content={
          <ul className="list-disc pl-5 text-start">
            <li>Masuk ke situs internet banking bank Anda.</li>
            <li>Pilih menu "Pembayaran" atau "Transfer".</li>
            <li>Masukkan nomor Virtual Account dan jumlah pembayaran.</li>
            <li>Konfirmasi pembayaran dan simpan bukti transaksi.</li>
          </ul>
        }
      />
    </div>
  );
};

export default Accordion;

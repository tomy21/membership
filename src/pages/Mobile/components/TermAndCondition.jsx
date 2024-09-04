import React from "react";
import { motion } from "framer-motion";

const TermsAndCondition = ({ isVisible, onClose }) => {
  return (
    isVisible && (
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-white py-5 px-10 shadow-2xl rounded-t-3xl border border-slate-200 z-20 overflow-auto h-[80vh]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-start items-start text-start">
          <h2 className="text-2xl text-center font-semibold mb-4 mt-20">
            Terms and Conditions PT SKY PARKING UTAMA
          </h2>
          <p className="mb-4">
            Dengan menggunakan layanan parkir yang disediakan oleh PT Sky
            PARKING UTAMA, Anda setuju untuk mematuhi dan terikat oleh syarat
            dan ketentuan yang ditetapkan di bawah ini. Jika Anda tidak setuju
            dengan syarat dan ketentuan ini, Anda tidak diperbolehkan
            menggunakan layanan kami.
          </p>
          <h3 className="text-lg font-semibold">
            1. Penerimaan Syarat dan Ketentuan
          </h3>
          <p className="mb-4">
            Dengan menggunakan layanan parkir yang disediakan oleh PT Sky
            PARKING UTAMA, Anda setuju untuk mematuhi dan terikat oleh syarat
            dan ketentuan yang ditetapkan di bawah ini. Jika Anda tidak setuju
            dengan syarat dan ketentuan ini, Anda tidak diperbolehkan
            menggunakan layanan kami.
          </p>
          <h3 className="text-lg font-semibold">2. Layanan</h3>
          <p className="mb-4">
            PT Sky PARKING UTAMA menyediakan layanan perparkiran di berbagai
            lokasi. Layanan kami mencakup pengaturan parkir kendaraan di tempat
            parkir yang kami kelola serta sistem pembayaran parkir. Semua
            kendaraan yang diparkir harus mematuhi peraturan dan petunjuk yang
            ada di lokasi parkir.
          </p>
          <h3 className="text-lg font-semibold">3. Biaya dan Pembayaran</h3>
          <p className="mb-4">
            Pengguna layanan parkir kami wajib membayar biaya parkir sesuai
            dengan tarif yang berlaku di setiap lokasi. Pembayaran dapat
            dilakukan secara tunai atau melalui metode pembayaran non-tunai yang
            kami sediakan. Keterlambatan dalam melakukan pembayaran parkir dapat
            dikenakan biaya tambahan sesuai dengan ketentuan yang berlaku.
          </p>
          <h3 className="text-lg font-semibold">4. Tanggung Jawab Pengguna</h3>
          <p className="mb-4">
            Anda bertanggung jawab penuh atas kendaraan Anda selama menggunakan
            layanan parkir kami. PT Sky PARKING UTAMA tidak bertanggung jawab
            atas kehilangan atau kerusakan kendaraan, barang, atau properti
            pribadi di dalam kendaraan selama diparkir di tempat kami. Pengguna
            diharapkan untuk mematuhi peraturan parkir yang berlaku, termasuk
            tidak memarkir di area yang tidak diperbolehkan.
          </p>
          <h3 className="text-lg font-semibold">
            5. Pembatasan Tanggung Jawab
          </h3>
          <p className="mb-4">
            PT Sky PARKING UTAMA tidak bertanggung jawab atas kerusakan,
            kehilangan, atau pencurian kendaraan yang disebabkan oleh kejadian
            di luar kendali kami, termasuk tetapi tidak terbatas pada bencana
            alam, kerusuhan, atau tindakan pihak ketiga.
          </p>
          <h3 className="text-lg font-semibold">6. Penolakan Layanan</h3>
          <p className="mb-4">
            PT Sky PARKING UTAMA berhak untuk menolak menyediakan layanan parkir
            jika dianggap perlu, termasuk tetapi tidak terbatas pada pelanggaran
            peraturan parkir atau masalah keamanan.
          </p>
          <h3 className="text-lg font-semibold">
            7. Perubahan pada Syarat dan Ketentuan
          </h3>
          <p className="mb-4">
            Kami dapat mengubah syarat dan ketentuan ini dari waktu ke waktu.
            Setiap perubahan akan diumumkan melalui media yang sesuai, dan
            pengguna layanan dianggap telah menerima perubahan tersebut jika
            tetap menggunakan layanan parkir kami setelah perubahan berlaku.
          </p>
          <h3 className="text-lg font-semibold">8. Hukum yang Berlaku</h3>
          <p className="mb-4">
            Syarat dan ketentuan ini diatur oleh hukum yang berlaku di
            Indonesia. Sengketa yang timbul akan diselesaikan melalui pengadilan
            yang berwenang di Indonesia.
          </p>
        </div>

        <div className="flex flex-col justify-start items-start text-start">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Privacy Policy PT Sky PARKING UTAMA
          </h2>
          <h3 className="text-lg font-semibold">
            1. Pengumpulan Informasi Pribadi
          </h3>
          <p className="mb-4">
            PT Sky PARKING UTAMA mengumpulkan informasi pribadi pengguna yang
            berkaitan dengan penggunaan layanan parkir, seperti:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Nama</li>
            <li>Nomor kendaraan</li>
            <li>Informasi kontak (email, nomor telepon)</li>
            <li>Data pembayaran</li>
          </ul>
          <h3 className="text-lg font-semibold">
            2. Penggunaan Informasi Pribadi
          </h3>
          <p className="mb-4">
            Informasi pribadi yang kami kumpulkan digunakan untuk memproses
            transaksi parkir dan pembayaran, mengirimkan pemberitahuan terkait
            layanan, serta menangani pertanyaan atau masalah yang timbul
            sehubungan dengan layanan parkir.
          </p>
          <h3 className="text-lg font-semibold">3. Perlindungan Data</h3>
          <p className="mb-4">
            Kami menjaga keamanan data pribadi Anda dengan menerapkan
            langkah-langkah keamanan yang wajar untuk mencegah akses, perubahan,
            atau pengungkapan yang tidak sah. Namun, kami tidak dapat menjamin
            keamanan absolut dari data Anda.
          </p>
          <h3 className="text-lg font-semibold">
            4. Pembagian Informasi kepada Pihak Ketiga
          </h3>
          <p className="mb-4">
            Kami tidak akan menjual atau menyewakan informasi pribadi Anda
            kepada pihak ketiga, kecuali kepada penyedia layanan pihak ketiga
            atau otoritas hukum sesuai hukum yang berlaku.
          </p>
          <h3 className="text-lg font-semibold">5. Hak Pengguna</h3>
          <p className="mb-4">
            Anda memiliki hak untuk mengakses, memperbarui, atau menghapus
            informasi pribadi Anda yang ada di sistem kami. Jika Anda ingin
            menggunakan hak ini, silakan hubungi kami melalui kontak yang
            tersedia.
          </p>
          <h3 className="text-lg font-semibold">6. Penggunaan Cookie</h3>
          <p className="mb-4">
            Situs web dan aplikasi kami dapat menggunakan cookie untuk
            meningkatkan pengalaman pengguna.
          </p>
          <h3 className="text-lg font-semibold">
            7. Perubahan Kebijakan Privasi
          </h3>
          <p className="mb-4">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
            Setiap perubahan akan diumumkan melalui situs web kami.
          </p>
          <h3 className="text-lg font-semibold">8. Kontak Kami</h3>
          <p className="mb-4">
            Jika Anda memiliki pertanyaan terkait kebijakan privasi ini, Anda
            dapat menghubungi kami di email atau nomor telepon yang disediakan.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Setuju
        </button>
      </motion.div>
    )
  );
};

export default TermsAndCondition;

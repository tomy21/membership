import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import * as IconMd from "react-icons/md";
import * as IconIo from "react-icons/io5";
import * as IconBs from "react-icons/bs";
import * as IconTi from "react-icons/ti";
import * as IconFa6 from "react-icons/fa6";
import * as IconGo from "react-icons/go";
import * as IconLu from "react-icons/lu";
import * as IconRi from "react-icons/ri";
import * as IconFa from "react-icons/fa";
import { format } from "date-fns";
import { userCMS } from "../../../../../api/apiMembershipV2";
import { TiWarning } from "react-icons/ti";
import { BsPatchCheck } from "react-icons/bs";
import Loading from "../../../components/Loading";
import AddMenus from "./modal/AddMenus";

export default function TableMenus() {
  const [listMenu, setListMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [modalAddMenu, setModalAddMenu] = useState(false);

  const [isEditRoles, setIsEditRoles] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleSubmenu = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeModalAddMenu = () => {
    setModalAddMenu(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, LimitData]);

  const fetchData = async () => {
    try {
      const response = await userCMS.getMenu(currentPage, LimitData);
      console.log(response);
      setListMenu(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleConfirmation = (data) => {
    setModalConfirmation(true);
    setSelectedData(data);
  };

  const handleEdit = (id) => {
    setSelectedRoleId(id);
    setIsEditRoles(true);
  };

  const handleSuccess = (success, message) => {
    if (success === true) {
      setIsSuccessModalOpen(true);

      fetchData();
    } else {
      console.log(message);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Hentikan ketika mencapai 100%
          setIsSuccessModalOpen(false); // Tutup modal setelah selesai
        }
        return prev + 10; // Tambahkan progress
      });
    }, 300);
    setModalAddMenu(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setIsSuccessModalOpen(true); // Tampilkan modal
    setProgress(0); // Reset progress bar
    setModalConfirmation(false);
    // Mulai progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Hentikan ketika mencapai 100%
          setIsSuccessModalOpen(false); // Tutup modal setelah selesai
        }
        return prev + 10; // Tambahkan progress
      });
    }, 300); // 10% setiap 300ms untuk durasi total 3 detik

    try {
      const response = await userCMS.deleteUsers(id);

      if (response.statusCode === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalConfirmation(false);
    setSelectedData(null);
  };

  const handleCloseEdit = () => {
    setIsEditRoles(false);
  };

  const renderIcon = (iconName) => {
    const IconComponent =
      IconBs[iconName] ||
      IconIo[iconName] ||
      IconMd[iconName] ||
      IconTi[iconName] ||
      IconFa6[iconName] ||
      IconGo[iconName] ||
      IconRi[iconName] ||
      IconFa[iconName] ||
      IconLu[iconName];
    if (IconComponent) {
      return <IconComponent className="mr-2" />;
    }
    return null;
  };

  const handleAddMenus = () => {
    setModalAddMenu(true);
  };

  return (
    <div className="w-full px-3 py-4">
      <div className="flex justify-between items-center w-full mb-4">
        <input
          type="search"
          className="w-64 rounded-lg border border-gray-300 p-3 focus:outline-none focus:border-amber-500"
          placeholder="Search...."
        />
        <button
          className="flex flex-row items-center space-x-2 p-3 rounded-lg bg-amber-500 text-white hover:bg-amber-400 shadow-md"
          onClick={handleAddMenus}
        >
          <IconBs.BsPlus size={20} />
          <span>Add Menu</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg w-[2%]">
                #
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 w-[20%]">
                Name
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 w-[20%]">
                Link
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 w-[20%]">
                Icon
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 w-[10%]">
                Slug
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 w-[10%]">
                Created By
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {listMenu.length > 0 ? (
              listMenu.map((menu, index) => (
                <>
                  <tr key={menu.id} className="text-base">
                    <td className="px-5 py-3 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      <div className="flex flex-row justify-start items-center space-x-2">
                        <p>{renderIcon(menu.icon)}</p>
                        <span>{menu.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      {menu.link ? (
                        <a
                          href={menu.link}
                          className="text-blue-500 hover:underline"
                        >
                          {menu.link}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      {menu.icon}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      {menu.slug}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      {menu.created_by}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200">
                      <div className="flex justify-between items-center gap-x-3">
                        <IconMd.MdEditDocument
                          size={25}
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => handleEdit(menu.id)}
                        />

                        <div className="border-l border-slate-300 h-5"></div>

                        <IconIo.IoTrashOutline
                          size={25}
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleConfirmation(menu)}
                        />

                        <div className="border-l border-slate-300 h-5"></div>

                        {menu.subMenus && menu.subMenus.length > 0 ? (
                          <>
                            {expanded[menu.id] ? (
                              <IconFa6.FaEyeSlash
                                size={25}
                                onClick={() => toggleSubmenu(menu.id)}
                              />
                            ) : (
                              <IconFa6.FaRegEye
                                size={25}
                                onClick={() => toggleSubmenu(menu.id)}
                              />
                            )}
                          </>
                        ) : (
                          <IconFa6.FaEyeSlash
                            className="text-gray-400"
                            size={25}
                            onClick={() => toggleSubmenu(menu.id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>

                  {expanded[menu.id] &&
                    menu.subMenus.map((submenu) => (
                      <tr key={submenu.id} className="text-sm bg-gray-100">
                        <td className="px-5 py-3 border-b border-gray-200">
                          —
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                          <div className="flex flex-row justify-start items-center space-x-2">
                            <p>{renderIcon(submenu.icon)}</p>
                            <span>{submenu.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                          {submenu.link || "-"}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                          {submenu.icon}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                          {submenu.slug}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                          {submenu.created_by}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200"></td>
                      </tr>
                    ))}
                </>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={7}>
                    <div className="flex justify-center p-5">
                      Data Not Found
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-slate-300 py-1 px-4 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItem={totalItems}
          limit={LimitData}
          onLimitChange={setLimitData}
          setPageCurrent={setCurrentPage}
          setLimitData={setLimitData}
        />
      </div>

      {modalConfirmation && (
        <div className="fixed bg-black bg-opacity-50 w-full inset-0 z-50 flex items-center justify-center p-5">
          {/* Modal Container */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fade-in flex flex-col justify-center items-center">
            {/* Header */}
            <div className="flex justify-center">
              <div className={`p-3 rounded-full bg-yellow-100 text-yellow-600`}>
                <TiWarning size={50} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Perhatian</h2>
            </div>

            {/* Body */}
            <div className="mt-4 text-base text-gray-600 text-center">
              {`Are you sure you want to delete the data for `}
              <strong>{selectedData?.email}</strong>
              {` ?`}
            </div>

            <div className="flex flex-row justify-center items-center space-x-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 mt-7 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(selectedData?.id)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 mt-7 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div
          className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
          style={{ animationDuration: "0.5s" }} // Durasi animasi
        >
          <div className="relative bg-white border border-green-50 shadow-inner rounded-lg p-4 w-72">
            <div className="flex flex-row justify-start items-center space-x-2">
              <BsPatchCheck size={30} className="text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Success ... !
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="bg-green-500 h-1 rounded-full transition-all duration-300" // Animasi progress bar
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Loading />
        </div>
      )}

      {modalAddMenu && (
        <AddMenus onClose={closeModalAddMenu} onSuccess={handleSuccess} />
      )}
    </div>
  );
}

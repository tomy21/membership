import React, { useEffect, useState } from "react";
import { userCMS } from "../../../../../../api/apiMembershipV2";

export default function EditRolePermission({ idData, closeModal }) {
  const [menuPermission, setMenuPermission] = useState([]);

  useEffect(() => {
    fetchRoleMenus();
  }, []);

  const fetchRoleMenus = async () => {
    try {
      const response = await userCMS.getPermissionsById(idData);
      setMenuPermission(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (menuId, submenuId, permissionKey, checked) => {
    setMenuPermission((prevMenuPermission) => {
      return prevMenuPermission.map((menu) => {
        if (menu.id === menuId) {
          if (submenuId) {
            // Update submenu permissions
            menu.subMenus = menu.subMenus.map((submenu) => {
              if (submenu.id === submenuId) {
                submenu.permissions[0][permissionKey] = checked;
              }
              return submenu;
            });
          } else {
            // Update menu permissions
            menu.permissions[0][permissionKey] = checked;
          }
        }
        return menu;
      });
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="fixed top-0 right-0 z-50 animate-slide-in p-4 m-auto"
        style={{ animationDuration: "0.5s" }}
      >
        <div className="relative p-2 bg-white rounded-lg w-[40vw] max-h-screen">
          <div className="text-black py-4 px-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Assign Permissions</h2>
            <button
              className="text-black hover:bg-red-700 px-3 py-1 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <div className="border-b border-slate-300 w-full"></div>

          <div className="p-2">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-100 border-b-4 border-slate-200">
                <tr className="bg-gray-200 border-b-4 border-gray-500">
                  <th className="p-3 text-gray-600 font-semibold text-base w-[40%]">
                    Menu
                  </th>
                  <th className="p-3 text-gray-600 font-semibold text-base text-center">
                    View
                  </th>
                  <th className="p-3 text-gray-600 font-semibold text-base text-center">
                    Create
                  </th>
                  <th className="p-3 text-gray-600 font-semibold text-base text-center">
                    Update
                  </th>
                  <th className="p-3 text-gray-600 font-semibold text-base text-center">
                    Delete
                  </th>
                  <th className="p-3 text-gray-600 font-semibold text-base text-center">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuPermission.map((menu) => (
                  <React.Fragment key={menu.id}>
                    <tr className="border-b">
                      <td className="p-3 bg-gray-100">{menu.name}</td>
                      {[
                        "can_view",
                        "can_create",
                        "can_update",
                        "can_delete",
                        "can_report",
                      ].map((key) => (
                        <td key={key} className="p-3 bg-gray-100 text-center">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-amber-600 rounded focus:ring focus:ring-amber-300"
                            checked={menu.permissions[0]?.[key] || false}
                            onChange={(e) =>
                              handleCheckboxChange(
                                menu.id,
                                null,
                                key,
                                e.target.checked
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                    {menu.subMenus.map((submenu) => (
                      <tr key={submenu.id} className="border-b">
                        <td className="p-3 pl-6">- {submenu.name}</td>
                        {[
                          "can_view",
                          "can_create",
                          "can_update",
                          "can_delete",
                          "can_report",
                        ].map((key) => (
                          <td key={key} className="p-3 text-center">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-amber-600 rounded focus:ring focus:ring-amber-300"
                              checked={submenu.permissions[0]?.[key] || false}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  menu.id,
                                  submenu.id,
                                  key,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

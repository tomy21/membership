import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import IconDropdown from "../../components/ListIcons";
import Loading from "../../../../components/Loading";

export default function AddMenus({ onClose, onSuccess, message }) {
  const [loading, setLoading] = useState(false);
  const [menuType, setMenuType] = useState("menu");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [parentSlug, setParentSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const [position, setPosition] = useState(null);
  const [isParentSlug, setIsParentSlug] = useState(false); // State untuk checkbox
  const [isRoot, setIsRoot] = useState(false); // Add isRoot state

  const handleClose = () => {
    onClose();
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setSlug(generateSlug(value)); // Generate slug otomatis
  };

  useEffect(() => {
    if (slug) {
      if (isRoot) {
        setLink(`/${slug}`); // If isRoot is true, slug is used directly
      } else {
        setLink(`/dashboard/${slug}`); // If isRoot is false, add /dashboard
      }
    }
  }, [slug, isRoot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      link: isParentSlug ? null : link, // Jika isParentSlug true, link akan null
      parent_slug: isParentSlug
        ? null
        : menuType === "submenu"
        ? parentSlug
        : null,
      icon,
      position,
      slug,
      created_by: "Admin", // Ganti sesuai kebutuhan
    };

    try {
      const response = await fetch(
        "http://localhost:3008/v01/cms/api/auth/menu",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.statusCode === 200) {
        onSuccess(true);
        message(result.message);
      } else {
        console.error(result.message);
      }
      setLoading(false);
      onClose();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Add New Menu</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-red-200 rounded-full p-2"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="menuType"
              className="block text-sm font-medium text-gray-700"
            >
              Menu Type
            </label>
            <select
              id="menuType"
              value={menuType}
              onChange={(e) => setMenuType(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="menu">Menu</option>
              <option value="submenu">Submenu</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="isRoot" className="inline-flex items-center">
              <input
                type="checkbox"
                id="isRoot"
                checked={isRoot}
                onChange={() => setIsRoot(!isRoot)} // Toggle isRoot saat checkbox dicentang
                className="mr-2"
              />
              Mark as Root Menu (No /dashboard in Link)
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {menuType === "submenu" && (
            <div className="mb-4">
              <label
                htmlFor="parentSlug"
                className="block text-sm font-medium text-gray-700"
              >
                Parent Slug
              </label>
              <input
                type="text"
                id="parentSlug"
                value={parentSlug}
                onChange={(e) => setParentSlug(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-1 p-2 border border-gray-300 bg-gray-100 rounded-md w-full"
                required
                readOnly={isParentSlug} // Jika parentSlug dicentang, input link akan readonly
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="isParentSlug" className="inline-flex items-center">
              <input
                type="checkbox"
                id="isParentSlug"
                checked={isParentSlug}
                onChange={() => setIsParentSlug(!isParentSlug)}
                className="mr-2"
              />
              Mark as Parent Slug (Link will be null)
            </label>
          </div>

          <div className="mb-4">
            <IconDropdown icon={icon} setIcon={setIcon} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              readOnly
              className="mt-1 p-2 border border-gray-300 bg-gray-100 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              type="number"
              id="position"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="0"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Menu"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
    </div>
  );
}
